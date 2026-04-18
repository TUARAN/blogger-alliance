import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const DEFAULT_PROFILE_DIR = path.resolve(".playwright-metrics-profile");
const DEFAULT_OUTPUT_DIR = path.resolve("tmp", "metrics");

const PLATFORM_HEADER_MAP = new Map([
  ["掘金", "juejin"],
  ["csdn", "csdn"],
  ["CSDN", "csdn"],
  ["头条", "toutiao"],
  ["今日头条", "toutiao"],
  ["知乎", "zhihu"],
  ["公众号", "wechat"],
  ["微信", "wechat"],
  ["博客园", "cnblogs"],
  ["微博", "weibo"],
  ["51cto", "51cto"],
  ["51CTO", "51cto"],
]);

const LOGIN_URLS = {
  juejin: "https://juejin.cn/",
  csdn: "https://www.csdn.net/",
  toutiao: "https://www.toutiao.com/",
  zhihu: "https://www.zhihu.com/",
  wechat: "https://mp.weixin.qq.com/",
  cnblogs: "https://www.cnblogs.com/",
  weibo: "https://weibo.com/",
  "51cto": "https://blog.51cto.com/",
};

function parseArgs(argv) {
  const [mode = "help", ...rest] = argv;
  const options = { _: [] };

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) {
      options._.push(token);
      continue;
    }

    const [rawKey, rawValue] = token.slice(2).split("=", 2);
    const key = rawKey.trim();
    if (rawValue !== undefined) {
      options[key] = rawValue;
      continue;
    }

    const next = rest[index + 1];
    if (next && !next.startsWith("--")) {
      options[key] = next;
      index += 1;
    } else {
      options[key] = true;
    }
  }

  return { mode, options };
}

function usage() {
  return [
    "Usage:",
    "  npm run metrics:login -- --site juejin,csdn,weibo",
    "  npm run metrics:collect -- --input ./links.tsv",
    "  npm run metrics:collect -- --input ./links.tsv --output ./tmp/metrics/run-01",
    "",
    "Input:",
    "  - plain text: one URL per line",
    "  - TSV/CSV: supports columns like 文章草稿 / 作者 / 掘金 / CSDN / 头条 / 知乎 / 公众号 / 博客园 / 微博 / 51CTO",
    "",
    "Notes:",
    "  - login mode opens a persistent browser profile and waits until Ctrl+C.",
    "  - collect mode only reads numbers already visible on the page after a normal login.",
    "  - unsupported or blocked pages are recorded with status and note instead of forcing a bypass.",
  ].join("\n");
}

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function platformFromUrl(url) {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname.includes("juejin.cn")) return "juejin";
    if (hostname.includes("csdn.net")) return "csdn";
    if (hostname.includes("toutiao.com")) return "toutiao";
    if (hostname.includes("zhihu.com")) return "zhihu";
    if (hostname.includes("mp.weixin.qq.com")) return "wechat";
    if (hostname.includes("cnblogs.com")) return "cnblogs";
    if (hostname.includes("weibo.com") && pathname.includes("/ttarticle/")) return "weibo";
    if (hostname.includes("51cto.com")) return "51cto";
    return "unknown";
  } catch {
    return "unknown";
  }
}

function parseDelimitedLine(line, delimiter) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

async function readInputRows(inputPath) {
  const raw = await fs.readFile(inputPath, "utf8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];

  const looksLikeUrlList = lines.every((line) => /^https?:\/\//i.test(line.trim()));
  if (looksLikeUrlList) {
    return lines.map((url, index) => ({
      rowId: index + 1,
      title: `line-${index + 1}`,
      author: "",
      platform: platformFromUrl(url),
      url: url.trim(),
    }));
  }

  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const headers = parseDelimitedLine(lines[0], delimiter);
  const tasks = [];

  for (let lineIndex = 1; lineIndex < lines.length; lineIndex += 1) {
    const cells = parseDelimitedLine(lines[lineIndex], delimiter);
    const row = Object.fromEntries(headers.map((header, idx) => [header, cells[idx] ?? ""]));
    const title = normalizeWhitespace(row["文章草稿"] || row["标题"] || row["文章"] || `row-${lineIndex}`);
    const author = normalizeWhitespace(row["作者"] || "");

    for (const [header, value] of Object.entries(row)) {
      if (header === "植入链接") continue;
      const url = normalizeWhitespace(value);
      if (!/^https?:\/\//i.test(url)) continue;

      const platform = PLATFORM_HEADER_MAP.get(header) || platformFromUrl(url);
      if (platform === "unknown") continue;

      tasks.push({
        rowId: lineIndex,
        title,
        author,
        platform,
        url,
      });
    }
  }

  return tasks;
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(rows) {
  const headers = [
    "row_id",
    "title",
    "author",
    "platform",
    "url",
    "status",
    "views",
    "likes",
    "collects",
    "comments",
    "reposts",
    "watching",
    "note",
    "checked_at",
  ];

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      headers
        .map((header) => {
          const key = header.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
          return csvEscape(row[key] ?? "");
        })
        .join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function launchPersistentBrowser(profileDir, headless) {
  return chromium.launchPersistentContext(profileDir, {
    headless,
    viewport: { width: 1440, height: 960 },
    locale: "zh-CN",
  });
}

async function loginMode(options) {
  const profileDir = path.resolve(options["profile-dir"] || DEFAULT_PROFILE_DIR);
  const sites = String(options.site || "juejin,csdn,zhihu,toutiao,weibo,wechat")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const context = await launchPersistentBrowser(profileDir, false);
  const firstPage = context.pages()[0] ?? (await context.newPage());

  for (let index = 0; index < sites.length; index += 1) {
    const site = sites[index];
    const target = LOGIN_URLS[site];
    if (!target) continue;

    const page = index === 0 ? firstPage : await context.newPage();
    await page.goto(target, { waitUntil: "domcontentloaded" });
  }

  console.log(`Persistent profile: ${profileDir}`);
  console.log("Log in manually in the opened browser windows.");
  console.log("Press Ctrl+C when you want to exit login mode.");

  await new Promise(() => {});
}

async function extractVisibleMetrics(page, platform) {
  return page.evaluate((currentPlatform) => {
    const bodyText = (document.body?.innerText || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    function parseCompactNumber(raw) {
      if (!raw) return null;
      const cleaned = String(raw)
        .replace(/,/g, "")
        .replace(/阅读数[:：]/g, "")
        .replace(/[()]/g, "")
        .trim();

      const match = cleaned.match(/(\d+(?:\.\d+)?)([kKmMwW万]?)/);
      if (!match) return null;

      const value = Number(match[1]);
      const unit = match[2];
      if (Number.isNaN(value)) return null;
      if (unit === "万" || unit === "w" || unit === "W") return Math.round(value * 10000);
      if (unit === "k" || unit === "K") return Math.round(value * 1000);
      if (unit === "m" || unit === "M") return Math.round(value * 1000000);
      return Math.round(value);
    }

    function fromSelector(selector) {
      const text = document.querySelector(selector)?.textContent?.trim();
      return parseCompactNumber(text);
    }

    function fromRegex(regex) {
      const match = bodyText.match(regex);
      return match ? parseCompactNumber(match[1]) : null;
    }

    function countNearLabel(label) {
      const candidates = Array.from(document.querySelectorAll("button, a, div, span"))
        .map((el) => el.innerText?.replace(/\s+/g, " ").trim())
        .filter((text) => text && text.length <= 80 && text.includes(label));

      for (const text of candidates) {
        const before = text.match(new RegExp(`(\\d+(?:\\.\\d+)?[kKmMwW万]?)\\s*${label}`));
        if (before) return parseCompactNumber(before[1]);

        const after = text.match(new RegExp(`${label}\\s*(\\d+(?:\\.\\d+)?[kKmMwW万]?)`));
        if (after) return parseCompactNumber(after[1]);
      }

      return null;
    }

    const result = {
      pageTitle:
        document.querySelector("h1")?.textContent?.trim() ||
        document.title ||
        "",
      views: null,
      likes: null,
      collects: null,
      comments: null,
      reposts: null,
      watching: null,
    };

    if (currentPlatform === "juejin") {
      result.views = fromSelector(".views-count") || fromRegex(/(\d+(?:\.\d+)?[kKmMwW万]?)\s*阅读\d+分钟/);
      result.likes = countNearLabel("点赞");
      result.collects = countNearLabel("收藏");
      result.comments = countNearLabel("评论");
    } else if (currentPlatform === "csdn") {
      // CSDN page contains many sidebar/profile counters; keep conservative fields only.
      result.views = fromSelector(".read-count") || fromRegex(/(\d+(?:\.\d+)?[kKmMwW万]?)\s*阅读/);
      result.likes = null;
      result.collects = null;
      result.comments = null;
    } else if (currentPlatform === "cnblogs") {
      result.views = fromSelector("#post_view_count") || fromRegex(/阅读\((\d+(?:\.\d+)?)\)/);
      result.comments = fromSelector("#post_comment_count") || fromRegex(/评论\((\d+(?:\.\d+)?)\)/);
      result.likes = fromSelector("#digg_count") || fromRegex(/推荐\((\d+(?:\.\d+)?)\)/);
    } else if (currentPlatform === "weibo") {
      result.views = fromRegex(/阅读数[:：]\s*(\d+(?:\.\d+)?[kKmMwW万]?)/);
      result.likes = countNearLabel("赞");
      result.comments = countNearLabel("评论");
      result.reposts = countNearLabel("转发");
    } else if (currentPlatform === "zhihu") {
      result.likes = countNearLabel("赞同");
      result.collects = countNearLabel("收藏");
      result.comments = countNearLabel("评论");
    } else if (currentPlatform === "toutiao") {
      result.views = fromRegex(/阅读[量数]?[：:\s]*(\d+(?:\.\d+)?[kKmMwW万]?)/);
      result.likes = countNearLabel("点赞");
      result.collects = countNearLabel("收藏");
      result.comments = countNearLabel("评论");
      result.reposts = countNearLabel("转发");
    } else if (currentPlatform === "51cto") {
      // 51CTO interaction selectors are unstable; keep views only for conservative reporting.
      result.views = fromRegex(/阅读[量数]?[：:\s]*(\d+(?:\.\d+)?[kKmMwW万]?)/);
      result.likes = null;
      result.collects = null;
      result.comments = null;
    } else if (currentPlatform === "wechat") {
      result.views = fromRegex(/阅读[量数]?[：:\s]*(\d+(?:\.\d+)?[kKmMwW万]?)/);
      result.likes = countNearLabel("赞");
      result.watching = countNearLabel("在看");
      result.comments = countNearLabel("留言");
    }

    return result;
  }, platform);
}

function hasMeaningfulMetrics(metrics) {
  return [
    metrics.views,
    metrics.likes,
    metrics.collects,
    metrics.comments,
    metrics.reposts,
    metrics.watching,
  ].some((value) => value != null);
}

async function collectOne(page, task) {
  const checkedAt = new Date().toISOString();

  try {
    await page.goto(task.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3000);

    const finalUrl = page.url();
    const content = normalizeWhitespace(await page.locator("body").innerText().catch(() => ""));
    const pageTitle = normalizeWhitespace(await page.title().catch(() => ""));
    const loginUrlIndicators = [
      "/login",
      "/signin",
      "passport",
      "account/login",
      "safe-center",
      "captcha",
      "verify",
    ];
    const pageLooksLikeLogin =
      loginUrlIndicators.some((text) => finalUrl.includes(text)) ||
      /登录|注册|安全验证|验证码/.test(pageTitle);

    if (pageLooksLikeLogin) {
      return {
        ...task,
        status: "needs_login",
        note: "page redirected to login or verification",
        checkedAt,
      };
    }

    const metrics = await extractVisibleMetrics(page, task.platform);
    const noteParts = [];
    if (finalUrl !== task.url) noteParts.push(`redirected to ${finalUrl}`);
    if (!hasMeaningfulMetrics(metrics)) noteParts.push("no visible metrics matched current selectors");

    return {
      ...task,
      status: hasMeaningfulMetrics(metrics) ? "ok" : "partial",
      views: metrics.views,
      likes: metrics.likes,
      collects: metrics.collects,
      comments: metrics.comments,
      reposts: metrics.reposts,
      watching: metrics.watching,
      note: noteParts.join("; "),
      checkedAt,
    };
  } catch (error) {
    return {
      ...task,
      status: "error",
      note: normalizeWhitespace(error.message),
      checkedAt,
    };
  }
}

async function collectMode(options) {
  const inputPath = options.input;
  if (!inputPath) {
    throw new Error("--input is required in collect mode");
  }

  const headless = String(options.headless || "false") === "true";
  const profileDir = path.resolve(options["profile-dir"] || DEFAULT_PROFILE_DIR);
  const outputDir = path.resolve(options.output || DEFAULT_OUTPUT_DIR);
  const tasks = await readInputRows(path.resolve(inputPath));

  if (!tasks.length) {
    throw new Error("No supported URLs found in input");
  }

  await ensureDir(outputDir);
  const context = await launchPersistentBrowser(profileDir, headless);
  const page = context.pages()[0] ?? (await context.newPage());
  const results = [];

  for (let index = 0; index < tasks.length; index += 1) {
    const task = tasks[index];
    console.log(`[${index + 1}/${tasks.length}] ${task.platform} ${task.url}`);
    results.push(await collectOne(page, task));
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(outputDir, `metrics-${timestamp}.json`);
  const csvPath = path.join(outputDir, `metrics-${timestamp}.csv`);

  await fs.writeFile(jsonPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");
  await fs.writeFile(csvPath, toCsv(results), "utf8");
  await context.close();

  console.log(`Saved JSON: ${jsonPath}`);
  console.log(`Saved CSV:  ${csvPath}`);
}

async function main() {
  const { mode, options } = parseArgs(process.argv.slice(2));

  if (mode === "help" || options.help) {
    console.log(usage());
    return;
  }

  if (mode === "login") {
    await loginMode(options);
    return;
  }

  if (mode === "collect") {
    await collectMode(options);
    return;
  }

  throw new Error(`Unknown mode: ${mode}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
