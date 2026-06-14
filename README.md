# 🧭 Blogger Alliance - 技术影响力平台

🌐 **网站地址：** https://blogger-alliance.cn/

<img src="./src/img/info4.png" alt="网站预览" width="600">

## 开发命令

命名约定：`{范围}:{动作}`，动作为 kebab-case。前端三件套不加前缀。

| 范围 | 命令 | 说明 |
| --- | --- | --- |
| 前端 | `npm run dev` | 本地 Vite 开发 |
| 前端 | `npm run build` | 构建静态资源到 `dist/` |
| 前端 | `npm run preview` | 预览构建结果 |
| Cloudflare | `npm run cf:dev` | 本地 Worker（需先 `build`） |
| Cloudflare | `npm run cf:deploy` | 构建并部署 Worker + 静态资源 |
| Supabase | `npm run supabase:migrate` | 执行 `supabase/migrations/` SQL |
| Supabase | `npm run supabase:export-seed` | 从 `private/*.json` 导出 `tmp/supabase-seed.sql` |
| 台账 | `npm run ledger:validate` | 校验 `data/ledger/deals/*.json` |
| 台账 | `npm run ledger:encrypt` | owner 把结算金额加密成密文信封 |
| 台账 | `npm run ledger:sync` | 校验后同步台账到 Supabase |
| 台账 | `npm run ledger:migrate-excel` | 一次性把 Excel 落成 `data/ledger` 文件 |
| Supabase | `npm run supabase:auth-urls` | 配置 Auth Site URL / Redirect URLs |
| 采集 | `npm run metrics:login` | Playwright 登录各平台并保存会话 |
| 采集 | `npm run metrics:collect` | 批量采集页面可见互动数据 |

## Visible Metrics Collector

这个仓库现在包含一个本地 `Playwright` 采集脚本，用来读取你在正常登录态下页面里已经显示出来的互动数据。

先登录并保存本地浏览器资料：

```bash
npm run metrics:login -- --site juejin,csdn,weibo,zhihu,toutiao,wechat
```

再对表格导出的 `TSV/CSV` 批量采集：

```bash
npm run metrics:collect -- --input ./links.tsv
```

支持的表头包括：`文章草稿`、`作者`、`掘金`、`CSDN`、`头条`、`知乎`、`公众号`、`博客园`、`微博`、`51CTO`。


> **项目介绍：Blogger Alliance 网站构建说明（对内版）**

## 🔍 这是个什么项目？

我们正在搭建一个网站，代号 **Blogger Alliance（博主联盟）**，这是一个面向一线程序员博主的"影响力平台"。

简单来说，我们有一批做内容的技术博主，未来会越来越多，我们希望通过这个平台，把"人"作为核心资源，用技术人的方式影响技术人，从而：

- **帮助程序员相关产品进行精准推广**（对 B 端）
- **搭建 C 端博主的成长入口**（加入联盟、有内容、有收入）
- **给普通开发者提供好用、有用、真实推荐的工具与应用**（资源库）

## 📊 数据分析

![数据分析](./src/img/info3.png)

## 🤝 加入博主联盟

### 🎯 如何加入？

如果你想加入我们的开发者联盟，请按照以下规范流程操作：

#### 1️⃣ Fork 项目
首先 Fork 这个项目到你的 GitHub 账号下

#### 2️⃣ 创建功能分支
```bash
# 克隆你的 Fork 仓库
git clone https://github.com/你的用户名/blogger-alliance.git
cd blogger-alliance

# 创建新的功能分支（请使用有意义的分支名）
git checkout -b feature/add-blogger-你的名字
```

#### 3️⃣ 修改数据文件
编辑 `src/data/bloggerInfo.js` 文件，在 `bloggersData` 数组中添加你的信息：

```javascript
{
  id: 下一个可用ID, // 请查看现有数据的最大ID，然后+1
  name: '你的名字',
  avatar: '你的头像URL', // 建议使用 DiceBear API 生成
  introduction: '简短的个人介绍（50字以内）',
  followers: '粉丝数量+K',
  socialAccounts: [
    { platform: '掘金', url: '你的掘金链接', icon: '📝' },
    { platform: 'GitHub', url: '你的GitHub链接', icon: '🐙' },
    { platform: 'CSDN', url: '你的CSDN链接', icon: '💻' }
    // 可以添加更多平台
  ],
  expandedContent: {
    specialties: ['你的专长领域1', '专长领域2', '专长领域3'],
    achievements: ['你的成就1', '成就2', '成就3'],
    recentPosts: ['最近文章1', '最近文章2', '最近文章3']
  }
}
```

#### 4️⃣ 提交你的更改
```bash
# 添加修改的文件
git add src/data/bloggerInfo.js

# 提交更改（请使用规范的提交信息）
git commit -m "feat: add new blogger - 你的名字"

# 推送到你的 Fork 仓库
git push origin feature/add-blogger-你的名字
```

#### 5️⃣ 创建 Pull Request
1. 访问你的 GitHub Fork 仓库
2. 点击 "Compare & pull request" 按钮
3. 填写 PR 标题：`feat: add new blogger - 你的名字`
4. 在描述中说明：
   - 你的技术背景
   - 主要创作平台和粉丝数
   - 加入联盟的动机
   - 你能为联盟带来什么价值

#### 6️⃣ 等待审核
我们会审核你的申请，通常会在 3-5 个工作日内回复。

### 📋 加入要求

- ✅ 有稳定的技术内容创作（建议 50+ 篇技术文章）
- ✅ 在主流技术平台有活跃账号（掘金、CSDN、GitHub 等）
- ✅ 有一定的粉丝基础（建议 3k+ 左右粉丝）
- ✅ 愿意分享真实的技术经验和产品使用心得
- ✅ 认同我们的价值观：真实、专业、有温度

## 🤝 我们和其他 IT KOL 的区别？

| 传统 IT KOL | Blogger Alliance |
|-------------|------------------|
| 多为"泛测评"内容 | 以"真实使用 + 开发者视角"为基础 |
| 多靠平台流量支持 | 我们建设自己的产品入口与平台 |
| 和开发距离远 | 本质上是"写代码的人做内容" |
| 重视粉丝数 | 我们更重视"转化率"与"推荐真实感" |

我们强调的是「创作力」+「信任力」+「转化力」。


## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ☁️ Supabase 数据维护（内部协作）

内部数据已改为 `Supabase Postgres + Worker API` 方案：

- 前端页面不再直接导入密文数据
- 账号、角色、商单、报告和年度总览统一存放在 Supabase
- Worker 校验 Supabase JWT 和角色后，使用服务端 `SUPABASE_SERVICE_ROLE_KEY` 读写业务表
- 浏览器只持有 Supabase anon key，不持有 service role key

相关文件：

- Supabase 表结构：`supabase/migrations/`
- Worker API：`cloudflare/worker.js`
- Wrangler 配置：`wrangler.jsonc`
- 本地开发变量示例：`.dev.vars.example`
- JSON 导出 Supabase SQL：`scripts/export-supabase-seed.mjs`
- 台账权威源与录入规范：`data/ledger/`（详见 `data/ledger/README.md`）
- 台账同步 / 校验 / 加密脚本：`scripts/ledger-sync.mjs`、`scripts/ledger-validate.mjs`、`scripts/ledger-encrypt.mjs`
- 台账只读展示页：`src/pages/tob/internal.vue`

### 1) 初始化 Supabase 表结构

```bash
npm run supabase:migrate
```

该命令会按文件名顺序执行 `supabase/migrations/` 下的 SQL，包含：

- `profiles`：Supabase Auth 用户资料与角色
- `commercial_deals`：合作进度台账
- `promotion_reports`：推广数据报告
- `annual_reports`：年度总览
- `replace_*` RPC：后台整表替换写入，保持事务一致性

### 1.1) 开启 GitHub / Google OAuth 登录

登录、注册页已内置「GitHub 登录 / Google 登录」按钮（`src/components/OAuthButtons.vue`），走 Supabase 内置 OAuth（`signInWithOAuth`），与邮箱注册共用 `profiles` 触发器和角色体系。启用步骤：

1. **GitHub**：GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Authorization callback URL 填 `https://<project-ref>.supabase.co/auth/v1/callback`
   - 把 Client ID / Client Secret 填到 Supabase Dashboard → Authentication → Providers → GitHub
2. **Google**：Google Cloud Console → APIs & Services → Credentials → OAuth client ID（Web application）
   - Authorized redirect URI 同样填 `https://<project-ref>.supabase.co/auth/v1/callback`
   - 把 Client ID / Client Secret 填到 Supabase Dashboard → Authentication → Providers → Google
3. **Redirect URLs**：Supabase Dashboard → Authentication → URL Configuration，把
   `https://blogger-alliance.cn/workspace`（以及本地 `http://localhost:5173/workspace`）加入 Redirect URLs，
   或运行 `npm run supabase:auth-urls` 同步
4. 执行 `npm run supabase:migrate` 应用 `005_oauth_profiles.sql`（OAuth 注册时自动取昵称、头像）

> 注意：同一邮箱在 Supabase 默认会自动合并身份（GitHub / Google / 邮箱密码视为同一账号），管理员邮箱用 OAuth 登录同样会被 `003/005` 迁移引导为 admin。

### 2) 配置 Worker Secrets

复制示例文件：

```bash
cp .dev.vars.example .dev.vars
```

然后填写：

- `SUPABASE_URL`：Supabase 项目 URL
- `SUPABASE_ANON_KEY`：Supabase anon / publishable key
- `SUPABASE_SERVICE_ROLE_KEY`：Supabase service role key，仅 Worker 服务端使用

部署前还需要把它们写入 Cloudflare：

```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

### 3) 一次性初始化 / 灾备导入

生产数据以 Supabase 为唯一真实来源。`private/*.json` 只用于新环境初始化或灾备恢复，不作为日常维护入口，也不要把私密业务数据提交到仓库。

如需从本地灾备文件重建 Supabase 业务表，可使用：

- `private/commercialDeals.source.json`
- `private/promotionReports.source.json`
- `private/annualReports.source.json`

生成 SQL：

```bash
npm run supabase:export-seed
```

默认会产出：

- `tmp/supabase-seed.sql`

执行导入可通过 Supabase SQL Editor，或使用 `psql` 连接项目数据库执行该 SQL。

### 4) 本地联调与部署

本地跑 Cloudflare Worker：

```bash
npm run build
npm run cf:dev
```

手动部署（应急用）：

```bash
npm run cf:deploy
```

> **生产部署默认走 Cloudflare Workers Builds（Git → 自动部署）**：
> - 仓库：`TUARAN/blogger-alliance`
> - 构建命令：`npm install && npm run build`（必须设置，否则 `dist/` 不会生成）
> - 部署命令：`npx wrangler deploy`
> - 生产分支：`main`
> - Secrets 仍通过 `npx wrangler secret put` 一次性写入，无需在 Builds 面板再配

### 5) 台账权威源：`data/ledger`（Git 协作）

合作台账的**唯一权威源**是 Git 跟踪的 `data/ledger/deals/<id>.json`（每合作一文件），**不再通过网页或数据库手改**。完整录入规范见 [`data/ledger/README.md`](data/ledger/README.md)。

- 公开/内部字段（明文，团队可见）：进度、品牌、服务、备注、推荐人、承接人等。
- 敏感结算字段 `settlement`：只能是 `null` 或 `ledger:encrypt` 产出的**密文信封**，明文金额绝不入库、不入 git。

日常流程：

```bash
# 1. 改 / 加 data/ledger/deals/*.json（公开字段），settlement 先填 null
# 2. （仅 owner）加密结算金额
npm run ledger:encrypt -- --deal=<id>
# 3. 校验 → 提交 PR（CI 也会跑 ledger:validate）
npm run ledger:validate
# 4. 合并后同步到 Supabase
npm run ledger:sync
```

页面 `/tob/internal` 现为**只读展示**：

- `internal` / `manager` 看进度等公开字段；
- 只有 `admin`(owner) 点「解锁结算」输入密码短语后，于浏览器**本地解密**查看结算金额，密文经 Worker 仅对 admin 下发。

用户角色管理（仅管理员）：

- 路径：`/workspace/users`（工作台 → 内部板块 → 用户管理）
- 角色：`member`（公开站点）/ `internal`（只读台账）/ `manager`（普通管理员，维护台账但看不到金额）/ `admin`（owner，可解密金额并管理全部）
- 实现：`GET /api/internal/admin/users`、`PUT /api/internal/admin/users/:id/role`（Worker 校验 admin 后用 service role 写 `profiles`）

> 报告（`promotion_reports`）与年度总览（`annual_reports`）暂仍由 `private/*.source.json` + `supabase:export-seed` 维护。

### 6) 一次性把旧 Excel 落成 `data/ledger`

从运营支撑台账 Excel + 现有 `private/commercialDeals.source.json` 生成每合作一文件：

```bash
npm run ledger:migrate-excel -- --excel="/path/to/运营支撑台账26.xlsx"
```

脚本会：

- 在 `data/ledger/deals/` 生成 17 个合作文件（公开字段，`settlement` 置 `null`）；
- 把 Excel 的结算金额按 品牌+服务+期数 匹配到 deal id，写入 `tmp/ledger-settlement-plain.json`（**明文工作表，已 gitignore，加密后即删**）。

随后 owner 批量加密结算并删除明文工作表：

```bash
LEDGER_PASSPHRASE='***' npm run ledger:encrypt -- --batch=tmp/ledger-settlement-plain.json
rm tmp/ledger-settlement-plain.json
npm run ledger:validate && npm run ledger:sync
```

### 7) 字段约定

商单表 `commercial_deals` 主要字段：

- `id`：合作编码，唯一主键
- `brand`：品牌 / 项目
- `service`：合作内容
- `progress`：当前进度
- `remark`：备注
- `category`：兼容旧数据的分类字段
- `referrer`：推荐人
- `owner`：承接人
- `updated_at`：最近沟通时间，保持 `YYYY.MM.DD`
- `muted`：是否置灰
- `report_cooperation_id`：跳转报告时使用的关联合作编码
- `settlement_cipher`：结算敏感信息密文信封（AES-256-GCM），仅 admin 查询时下发、仅 owner 凭密码短语本地解密

年度总览表 `annual_reports` 主要字段：

- `year`：年份，主键
- `partners`：合作品牌名数组 JSON
- `summary_cards`：核心指标卡片数组 JSON（label / value / accent）
- `highlights`：年度重点字符串数组 JSON
- `intro`：介绍语（接在「我们与 …… 等品牌完成合作，」之后）
- `updated_at`：维护时间

页面 `/annual-report-2025` 在 Supabase 内部成员登录态有效时读取年度总览。
年度总览仍通过 `private/annualReports.source.json` + `supabase:export-seed` 维护（`/tob/internal` 已改为只读，不再内嵌编辑器）。

报告表 `promotion_reports` 主要字段：

- `id`：报告唯一业务 ID
- `title`：报告标题，通常固定为 `数据报告`
- `article_title`：推广图文标题
- `project`：合作项目名
- `author`：执行人
- `period`：统计周期文案
- `published_at`：ISO 时间
- `cooperation_id`：与合作进度表关联的合作编码
- `platforms`：平台数组 JSON
- `stats`：统计对象 JSON
- `platform_stats`：按平台统计 JSON
- `author_sections`：按博主拆分的分项 JSON
- `content`：报告正文

当前仓库已经移除前端加解密资产，内部数据统一走 `Worker + Supabase`。

---

**Blogger Alliance** - 技术人影响力平台 🚀
