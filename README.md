# 🧭 Blogger Alliance - 技术影响力平台

🌐 **网站地址：** https://blogger-alliance.cn/

<img src="./src/img/info4.png" alt="网站预览" width="600">

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

## ☁️ Cloudflare D1 数据维护（内部协作）

内部数据已改为 `Cloudflare D1 + Worker API` 方案：

- 前端页面不再直接导入密文数据
- 访问凭证只用于向 Worker 换取 30 分钟有效的会话 token
- Worker 鉴权成功后才会从 D1 读取商单和报告数据

相关文件：

- D1 表结构：`cloudflare/schema.sql`
- Worker API：`cloudflare/worker.js`
- Wrangler 配置：`wrangler.jsonc`
- 本地开发变量示例：`.dev.vars.example`
- JSON 导出 D1 SQL：`scripts/export-d1-seed.mjs`
- 后台录入页：`src/pages/workspace/internal-data-admin.vue`

### 1) 先创建 D1 数据库

```bash
npx wrangler d1 create blogger-alliance
```

创建完成后，把返回的 `database_id` 填到 `wrangler.jsonc` 里的 `d1_databases[0].database_id`。

### 2) 初始化表结构

```bash
npx wrangler d1 execute blogger-alliance --file=cloudflare/schema.sql
```

### 3) 配置 Worker Secrets

复制示例文件：

```bash
cp .dev.vars.example .dev.vars
```

然后填写：

- `INTERNAL_ACCESS_CREDENTIAL`：前端输入的访问凭证
- `INTERNAL_SESSION_SECRET`：用于签发会话 token 的随机长串

部署前还需要把它们写入 Cloudflare：

```bash
npx wrangler secret put INTERNAL_ACCESS_CREDENTIAL
npx wrangler secret put INTERNAL_SESSION_SECRET
```

### 4) 把现有 JSON 导入 D1

本地源文件仍然使用：

- `private/commercialDeals.source.json`
- `private/promotionReports.source.json`
- `private/annualReports.source.json`（年度总览，新增）

生成 SQL：

```bash
npm run d1:seed:export
```

默认会产出：

- `tmp/d1-seed.sql`

执行导入：

```bash
npx wrangler d1 execute blogger-alliance --file=tmp/d1-seed.sql
```

### 5) 本地联调与部署

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
> - D1 绑定由 `wrangler.jsonc` 控制，自动生效

### 6) 直接写 D1 的后台录入页

新增内部管理页：

- 路径：`/workspace/internal-data-admin`

当前能力：

- 直接读取 D1 中的 `commercial_deals` 和 `promotion_reports`
- 在浏览器里编辑 JSON
- 直接调用 Worker 写回 D1
- 可查看 `/api/internal/health` 返回的健康状态和当前记录数（含 `annualReports` 计数）
- 同页底部「📈 年度总览编辑器」可直接维护 `annual_reports`

这条链路已经能满足“日常维护不再改本地 JSON 文件”的需求。

### 7) 字段约定

商单表 `commercial_deals` 主要字段：

- `id`：合作编码，唯一主键
- `brand`：品牌 / 项目
- `service`：合作内容
- `progress`：当前进度
- `remark`：备注
- `category`：兼容旧数据的分类字段
- `referrer`：推荐人
- `updated_at`：最近沟通时间，保持 `YYYY.MM.DD`
- `muted`：是否置灰
- `report_cooperation_id`：跳转报告时使用的关联合作编码

年度总览表 `annual_reports` 主要字段：

- `year`：年份，主键
- `partners_json`：合作品牌名数组 JSON
- `summary_cards_json`：核心指标卡片数组 JSON（label / value / accent）
- `highlights_json`：年度重点字符串数组 JSON
- `intro`：介绍语（接在「我们与 …… 等品牌完成合作，」之后）
- `updated_at`：维护时间

公开页面 `/annual-report-2025` 通过 `GET /api/public/annual-report?year=2025` 读取（无需鉴权）。
内部 `/tob/internal` 解锁后可在「年度总览编辑器」直接修改并保存（走 `PUT /api/internal/admin/annual-reports`）。

报告表 `promotion_reports` 主要字段：

- `id`：报告唯一业务 ID
- `title`：报告标题，通常固定为 `数据报告`
- `article_title`：推广图文标题
- `project`：合作项目名
- `author`：执行人
- `period`：统计周期文案
- `published_at`：ISO 时间
- `cooperation_id`：与合作进度表关联的合作编码
- `platforms_json`：平台数组 JSON
- `stats_json`：统计对象 JSON
- `platform_stats_json`：按平台统计 JSON
- `author_sections_json`：按博主拆分的分项 JSON
- `content`：报告正文

当前仓库已经移除前端加解密资产，内部数据统一走 `Worker + D1`。

---

**Blogger Alliance** - 技术人影响力平台 🚀
