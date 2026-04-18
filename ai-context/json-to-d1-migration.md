# JSON 到 Cloudflare D1 迁移说明

## 背景

这个项目最初是纯前端 Vite 站点，内部数据采用“本地明文 JSON -> 加密 -> 打包进前端 -> 浏览器端解密”的方式。

原始链路如下：

- 商单数据明文：`private/commercialDeals.source.json`
- 报告数据明文：`private/promotionReports.source.json`
- 加密脚本：`scripts/deals-crypto.mjs`
- 前端密文文件：
  - `src/data/commercialDeals.encrypted.js`
  - `src/data/promotionReports.encrypted.js`
- 前端解密工具：`src/utils/securePayload.js`
- 页面入口：
  - `src/pages/tob/deals.vue`
  - `src/pages/tob/reports.vue`

旧方案的问题：

- 密文最终仍会随前端资源下发到浏览器
- 凭证校验发生在客户端
- 数据维护依赖“改 JSON -> 重新加密 -> 重新发版”
- 不能把数据真正作为服务端资源管理

## 迁移目标

把内部数据从“前端密文 JSON”迁移到“Cloudflare D1 + Worker API”。

迁移后目标状态：

- 数据存储在 Cloudflare D1
- 前端不再直接导入密文数据
- 前端输入访问凭证后，请求 Worker 创建短期会话
- Worker 在服务端校验凭证
- Worker 从 D1 查询数据并返回给前端

## 现在的架构

### 1. 数据库

使用 Cloudflare D1，数据库名：

- `blogger-alliance`

表结构文件：

- `cloudflare/schema.sql`

当前两张主表：

- `commercial_deals`
- `promotion_reports`

### 2. Worker API

Worker 入口：

- `cloudflare/worker.js`

主要接口：

- `POST /api/internal/session`
  - 用输入凭证换取 30 分钟有效的 session token
- `GET /api/internal/deals`
  - 读取商单数据
- `GET /api/internal/reports`
  - 读取报告数据
- `GET /api/internal/reports/coop-ids`
  - 读取报告中出现过的 cooperationId，用于商单页判断“查看报告”入口

### 3. 前端

前端 API 客户端：

- `src/utils/internalDataApi.js`

本地 session 缓存：

- `src/utils/secureDataCaches.js`

现在缓存的不是旧版“凭证”，而是 Worker 返回的 session token。

页面改造后：

- `src/pages/tob/deals.vue`
  - 不再导入 `commercialDeals.encrypted.js`
  - 解锁时改为调用 `/api/internal/session` 和 `/api/internal/deals`
- `src/pages/tob/reports.vue`
  - 不再导入 `promotionReports.encrypted.js`
  - 解锁时改为调用 `/api/internal/session` 和 `/api/internal/reports`

## D1 配置

Wrangler 配置文件：

- `wrangler.jsonc`

当前 D1 绑定：

- binding: `DB`
- database_name: `blogger-alliance`

当前真实 `database_id`：

- `587fe4fc-cae3-44c9-a591-9e24670c3337`

当前 `compatibility_date`：

- `2026-04-18`

注意：

- 之前部署失败过一次，原因是 `compatibility_date` 写成了未来日期 `2026-04-19`
- Cloudflare API 明确拒绝未来日期，所以已经回退到 `2026-04-18`

## Secret 配置

本地开发变量文件：

- `.dev.vars`

示例文件：

- `.dev.vars.example`

Worker 使用两个 secret：

- `INTERNAL_ACCESS_CREDENTIAL`
  - 页面输入的访问凭证
- `INTERNAL_SESSION_SECRET`
  - Worker 用于签发和校验 session token 的 HMAC 密钥

注意：

- 不要把真实 secret 写进仓库
- 如果凭证需要轮换，更新 Cloudflare secret 和本地 `.dev.vars` 即可

## 数据迁移方式

### 1. 原始数据来源

当前迁移仍然以本地明文 JSON 作为导入源：

- `private/commercialDeals.source.json`
- `private/promotionReports.source.json`

### 2. 导出 D1 SQL

导出脚本：

- `scripts/export-d1-seed.mjs`

命令：

```bash
npm run d1:seed:export
```

输出文件：

- `tmp/d1-seed.sql`

### 3. 导入 D1

初始化表结构：

```bash
npx wrangler d1 execute blogger-alliance --remote --file=cloudflare/schema.sql
```

导入数据：

```bash
npx wrangler d1 execute blogger-alliance --remote --file=tmp/d1-seed.sql
```

### 4. 一个实际踩过的坑

最初 `scripts/export-d1-seed.mjs` 生成的 SQL 包含：

- `BEGIN TRANSACTION`
- `COMMIT`

Cloudflare D1 远端导入时报错，不接受这类事务语句。报错含义是要改用 D1/DO 的事务 API，而不是在上传 SQL 文件里写显式事务。

因此现在脚本已经改成：

- 不生成 `BEGIN TRANSACTION`
- 不生成 `COMMIT`

## 已完成的状态

以下工作已经完成：

1. 创建了远端 D1 数据库 `blogger-alliance`
2. 把真实 `database_id` 写入 `wrangler.jsonc`
3. 初始化了远端 D1 表结构
4. 把本地 JSON 导出为 D1 SQL 并导入远端库
5. 成功部署了 Cloudflare Worker 和静态资源

当前线上地址：

- `https://blogger-alliance.tuaran666.workers.dev`

当前后台录入页：

- `https://blogger-alliance.tuaran666.workers.dev/workspace/internal-data-admin`

部署成功时的 Worker Version ID：

- `abd12d1c-2a26-48ef-8693-478b2be19ecc`

## 旧链路是否还保留

保留了，主要用于历史参考、回滚或再次迁移：

- `scripts/deals-crypto.mjs`
- `src/data/commercialDeals.encrypted.js`
- `src/data/promotionReports.encrypted.js`
- `src/utils/securePayload.js`

但当前线上主链路已经不是它们。

## 后续维护建议

### 短期

如果还是继续用本地 JSON 维护数据，推荐流程：

1. 修改 `private/*.json`
2. 执行 `npm run d1:seed:export`
3. 执行 `wrangler d1 execute --remote --file=tmp/d1-seed.sql`
4. 如有前端或 Worker 代码变化，再执行 `npm run cf:deploy`

### 中期

这里已经有一个最小可用管理后台：

- 页面：`/workspace/internal-data-admin`
- 可直接加载 `deals` / `reports`
- 可直接整表覆盖写回 D1
- 可查看 `/api/internal/health`

如果还要继续升级，可以做：

- 行级表单编辑，而不是整段 JSON 文本编辑
- 新增 / 删除 / 拖拽排序等交互
- 更细粒度更新脚本，而不是每次整库覆盖

### 风险点

- 当前导入脚本是“整表清空再重灌”，适合当前小数据量，不适合多人同时在线编辑
- 当前鉴权是单一内部凭证，不是用户体系
- 当前后台编辑仍然是整段 JSON 编辑，不是细粒度表单

## 相关文件索引

- D1 schema：`cloudflare/schema.sql`
- Worker：`cloudflare/worker.js`
- Wrangler 配置：`wrangler.jsonc`
- 前端 API：`src/utils/internalDataApi.js`
- 会话缓存：`src/utils/secureDataCaches.js`
- 商单页：`src/pages/tob/deals.vue`
- 报告页：`src/pages/tob/reports.vue`
- D1 seed 导出：`scripts/export-d1-seed.mjs`
- 部署说明：`README.md`
