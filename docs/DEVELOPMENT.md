# 开发与数据底座说明（技术架构）

> 本文从 `README.md` 拆出，集中放技术架构、开发命令、数据底座、部署与字段约定。
> `README.md` 只做产品介绍，技术细节看这里。

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
| 台账 | `npm run ledger:device` / `npm run ledger:encrypt` | owner 登记设备公钥并把结算金额加密成 v2 密文信封 |
| 台账 | `npm run ledger:sync` | 校验后同步台账到 Supabase |
| 台账 | `npm run ledger:migrate-excel` | 一次性把 Excel 落成 `data/ledger` 文件 |
| Supabase | `npm run supabase:auth-urls` | 配置 Auth URL，并开启“未验证邮箱可登录、24 小时验证链接” |
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

### 1.1) 邮箱、GitHub 与 Google 登录

登录、注册页共用 Supabase Auth；`src/components/OAuthButtons.vue` 调用 `signInWithOAuth`，登录后回到 `/workspace`。`profiles` 保存昵称、头像和业务角色；角色不能从用户可修改的 `user_metadata` 直接推断。

当前生产配置（2026-10-14）：

- Supabase 项目 `tuaran`，ref 为 `pmgpykadirszazskjdhr`；邮箱和 GitHub 提供商已启用。
- Google Cloud 独立项目 `blogger-alliance` 已创建 Web OAuth 客户端；Supabase Google 提供商已启用。Google 应用已切换为**正式版**；从线上登录页点击 Google 登录、选择站长账号后已回到 `/workspace`，账号中心显示同一邮箱和管理员角色，刷新后会话仍有效。
- Supabase Site URL 为 `https://blogger-alliance.cn`，生产 Redirect URLs 包含 `https://blogger-alliance.cn/workspace`。Google 客户端的 Authorized JavaScript origin 为 `https://blogger-alliance.cn`，Authorized redirect URI 为 `https://pmgpykadirszazskjdhr.supabase.co/auth/v1/callback`。
- Google OAuth 品牌首页和隐私说明链接分别为 `https://blogger-alliance.cn` 与 `https://blogger-alliance.cn/privacy`。客户端密钥只保存在平台控制台，不能提交到仓库。

新站点按以下顺序接入：

1. 创建独立 Supabase 项目，配置 Site URL、明确的 Redirect URLs、邮箱确认与自定义 SMTP；用真实邮箱验证收信和登录。
2. GitHub OAuth App 的 Authorization callback URL 填该项目的 `https://<project-ref>.supabase.co/auth/v1/callback`，把 Client ID 和 Secret 填入 Supabase GitHub 提供商。
3. Google Cloud 创建项目与外部 OAuth 应用，先准备可访问的首页和隐私说明。Web 客户端的 Authorized JavaScript origin 填站点源地址，Authorized redirect URI 填同一项目的 Supabase 回调，再将凭据写入 Supabase Google 提供商。核对 Google 应用的发布状态。
4. 在 Supabase Redirect URLs 中逐项允许代码传给 `redirectTo` 的站内地址。本地开发环境单独加入其实际端口与回跳 URL；不要假定 `npm run supabase:auth-urls` 会覆盖 Google 客户端配置。
5. 确认 `005_oauth_profiles.sql` 已在新项目执行，依次实测邮箱确认、GitHub 和 Google 登录、回跳、资料查询、角色与退出。用同一邮箱测试多提供商时，检查最终的 Supabase 用户 ID 和 `profiles` 记录，不能仅凭邮箱相同推断身份已合并。

### 1.2) 配置邮箱确认模板

邮箱密码账号采用 24 小时宽限期：注册后可先登录，必须在注册后 24 小时内完成邮箱验证。运行
`npm run supabase:auth-urls` 会保持邮箱确认开启、允许未验证邮箱登录，并把验证链接有效期设为
24 小时。Worker 会在访问内部接口时拦截已过期账号，并通过每小时 Cron 删除超时未验证的邮箱账号。
GitHub / Google OAuth 账号不受此清理规则影响。

部分邮箱服务会预取邮件中的一次性验证链接，导致用户点击时 Supabase 返回 `One-time token not found`。项目使用两步确认避免令牌被预取消耗：邮件先打开站内 `/auth/confirm`，用户主动点击按钮后才调用 `verifyOtp`。

在 Supabase Dashboard → Authentication → Email Templates → Confirm signup 中，将模板内容设置为 [`supabase/templates/confirmation.html`](../supabase/templates/confirmation.html)。模板中的链接必须保留 `token_hash={{ .TokenHash }}` 和 `type=email`；不要改回直接使用 `{{ .ConfirmationURL }}`。

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

合作台账的**唯一权威源**是 Git 跟踪的 `data/ledger/deals/<id>.json`（每合作一文件），**不再通过网页或数据库手改**。完整录入规范见 [`data/ledger/README.md`](../data/ledger/README.md)。

- 公开/内部字段（明文，团队可见）：进度、品牌、服务、备注、推荐人、承接人等。
- 敏感结算字段 `settlement`：只能是 `null` 或 `ledger:encrypt` 产出的**密文信封**，明文金额绝不入库、不入 git。

日常流程：

```bash
# 首次使用：站长在页面启用设备并导出公钥，然后登记公钥
npm run ledger:device -- add --file=<浏览器导出的公钥文件>
# 改 / 加 data/ledger/deals/*.json（公开字段），settlement 先填 null
# （仅 owner）用设备公钥加密结算金额
npm run ledger:encrypt -- --deal=<id>
# 校验 → 提交 PR（CI 也会跑 ledger:validate）
npm run ledger:validate
# 合并后同步到 Supabase
npm run ledger:sync
```

页面 `/tob/internal` 现为**只读展示**：

- `internal` / `manager` 看进度等公开字段；
- 只有 `admin`(owner) 能从 Worker 取得结算密文；浏览器使用 IndexedDB 中不可导出的设备私钥自动在本地解密。
- 新设备先导出公钥，再由旧受信任设备生成轮换包；`npm run ledger:device -- apply-rewrap --file=<包>` 只追加包装密钥，不触碰结算正文密文。

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
npm run ledger:encrypt -- --batch=tmp/ledger-settlement-plain.json
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
- `settlement_cipher`：结算敏感信息密文信封（AES-256-GCM + 设备 RSA-OAEP 包装密钥），仅 admin 查询时下发、仅持有已登记设备私钥的 owner 浏览器本地解密

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
