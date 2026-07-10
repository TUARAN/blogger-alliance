# AGENTS.md

> 面向 codex 及其他编码 Agent。与 `CLAUDE.md` 内容一致，请同样遵守。

博主联盟（blogger-alliance）—— Vue 3 + Vite 前端，Cloudflare Worker 提供 `/api/internal/*`，Supabase Postgres 作数据底座。

## 数据台账录入（重要）

合作台账的**唯一权威源**是 Git 跟踪的 `data/ledger/deals/<id>.json`（每合作一文件）。
**录入 / 修改台账前必须先读 [`data/ledger/README.md`](data/ledger/README.md)**，严格按其字段契约与流程操作。

铁律：

- 不要在网页或数据库里手改台账；改 `data/ledger/deals/*.json` 后用 `npm run ledger:sync` 同步。
- `settlement` 字段只能是 `null` 或 `ledger:encrypt` 产出的**密文信封**。
  **绝对禁止**把前向/后向/运营支撑金额或结算详情的**明文**写进任何 `.json`、提交记录或日志。
- 改完跑 `npm run ledger:validate`，必须通过（CI 也会跑）。
- 新结算使用站长设备公钥加密；历史 v1 迁移时才临时使用旧密码短语。普通维护只填公开字段，`settlement` 留 `null`。

## 常用命令

```bash
npm run ledger:validate    # 校验台账文件
npm run ledger:device       # (owner) 管理站长设备公钥
npm run ledger:encrypt      # (owner) 用设备公钥加密结算金额
npm run ledger:migrate-device # (owner) 一次性迁移历史 v1 密文
npm run ledger:sync         # 同步台账到 Supabase
npm run build               # 构建
```

## 角色模型

`member`(0) < `internal`(1) < `manager`(2，普通管理员，看不到金额) < `admin`(3，owner，可解密金额)。

更多说明见 [`README.md`](README.md)。
