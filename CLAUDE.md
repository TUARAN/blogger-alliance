# CLAUDE.md

博主联盟（blogger-alliance）—— 技术博主联盟与品牌增长平台。Vue 3 + Vite 前端，Cloudflare Worker 提供 `/api/internal/*` 接口，Supabase Postgres 作数据底座。

## 数据台账录入（重要）

合作台账的**唯一权威源**是 Git 跟踪的 `data/ledger/deals/<id>.json`（每合作一文件）。
**录入 / 修改台账前必须先读 [`data/ledger/README.md`](data/ledger/README.md)**，严格按其字段契约与流程操作。

铁律：

- 不要在网页或数据库里手改台账；改 `data/ledger/deals/*.json` 后用 `npm run ledger:sync` 同步。
- `settlement` 字段只能是 `null` 或 `ledger:encrypt` 产出的**密文信封**。
  **绝对禁止**把前向/后向/运营支撑金额或结算详情的**明文**写进任何 `.json`、提交记录或日志。
- 改完跑 `npm run ledger:validate`，必须通过。
- 结算金额加密需要密码短语，只有 owner 持有；普通维护只填公开字段，`settlement` 留 `null`。

## 常用命令

```bash
npm run dev                # 本地前端
npm run build              # 构建
npm run ledger:validate    # 校验台账文件
npm run ledger:sync        # 同步台账到 Supabase
npm run supabase:migrate   # 执行 supabase/migrations/ SQL
```

## 角色模型

`member`(0) < `internal`(1，只读台账) < `manager`(2，普通管理员，维护台账但看不到金额) < `admin`(3，owner，可解密金额)。
角色等级见 `src/composables/useAuth.js` 与 `cloudflare/worker.js` 的 `ROLE_RANK`。结算解密由密码短语把守，不仅是角色。

更多数据底座、部署、字段约定见 [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)（`README.md` 只做产品介绍）。
