# 数据台账录入规范（codex / claude code 共用）

这是「合作台账」的**唯一权威源**。每条合作 = 一个文件 `data/ledger/deals/<id>.json`。
线上 Supabase 里的台账由这里**同步生成**，不要再去网页或数据库手改。

> 为什么是每合作一文件：多人改不同合作时不会产生 git 合并冲突；评审 PR 时 diff 清晰。

---

## 1. 字段字典

字段契约见 [`../schema.json`](../schema.json)。分两类：

- **公开/内部字段**（明文，团队内可见）：`id, brand, service, progress, remark, category, referrer, owner, updatedAt, reportCooperationId, muted`
- **敏感字段**（加密，仅 owner 可解）：`settlement`

`settlement` 只能是两种值之一：
- `null`（没有结算信息，或还没加密）
- 一段**密文信封字符串**（由 `ledger:encrypt` 生成，形如 `{"v":1,"alg":"AES-256-GCM",...}`）

⛔ **绝对禁止**把前向/后向/运营支撑金额、结算详情的**明文**写进任何 `.json`。明文只在 owner 本地中转文件 `tmp/ledger-settlement-plain.json` 里（已被 .gitignore）。

---

## 2. 新增 / 修改一条合作（任何维护者都能做）

1. 文件名即编码：`data/ledger/deals/<id>.json`，`id` 须与文件名一致。
2. `id` 命名：全小写、用 `-` 连接，约定 `品牌-服务-期数`，例：`finclip-cpc-2`、`wandabao-buildsom`。
   - ⚠️ 已存在的 `id` **不要改名**——报告通过 `cooperationId` 引用它，改名会断链。新合作才起新 `id`。
3. 只填公开/内部字段，`settlement` 先写 `null`。模板：

```json
{
  "id": "brand-service-1",
  "brand": "品牌名",
  "service": "CPC",
  "progress": "沟通中",
  "remark": "1期；承接：xxx",
  "category": "",
  "referrer": "安东尼",
  "owner": "",
  "updatedAt": "2026.6.13",
  "reportCooperationId": "",
  "muted": false,
  "settlement": null
}
```

4. 本地校验：`npm run ledger:validate`
5. 提交 PR（见第 5 节）。

---

## 3. 录入 / 更新结算金额（**仅 owner**）

金额需要密码短语加密，只有 owner 持有密码短语，因此**只有 owner 能录金额**。

单条：
```bash
npm run ledger:encrypt -- --deal=finclip-cpc-1
# 按提示输入 前向/后向/运营支撑/详情 与密码短语，自动写入该文件的 settlement
```

批量（迁移/补录时）：
```bash
# tmp/ledger-settlement-plain.json 形如 { "deal-id": { "forward": "1135.5", "detail": "..." } }
npm run ledger:encrypt -- --batch=tmp/ledger-settlement-plain.json
```

密码短语来源：环境变量 `LEDGER_PASSPHRASE`（可放本地 `.ledger.env`，已 gitignore），或交互输入（不回显）。
**密码短语永不入库、永不入 git。** 忘记密码短语 = 旧密文永久不可读，只能重录。

---

## 4. 同步到线上（owner / manager）

```bash
npm run ledger:validate        # 先校验
npm run ledger:sync            # 生成含 settlement_cipher 的 seed SQL 到 tmp/
npm run supabase:migrate       # 执行 SQL，覆盖线上台账
```

线上权限：`internal` 只读进度等公开字段；`manager` 同样看不到金额；只有 `admin`(owner) 在台账页输入密码短语后，于浏览器本地解密查看金额。

---

## 5. 协作流程（PR）

1. 从 `main` 拉分支，改 / 加 `data/ledger/deals/*.json`（每人尽量只动自己的合作文件）。
2. `npm run ledger:validate` 通过后提交 PR（CI 也会跑 validate）。
3. 金额相关改动由 owner 负责或 owner review。
4. 合并后由 owner / manager 跑同步。

---

## 6. 常见错误

- `ID_MISMATCH`：文件里的 `id` 和文件名不一致。
- `DUPLICATE_ID`：两个文件 `id` 相同。
- `MISSING_FIELD`：缺 `id/brand/service/progress`。
- `BAD_SETTLEMENT`：`settlement` 既不是 `null` 也不是合法密文信封 —— 多半是有人直接写了明文金额，按第 3 节加密。
