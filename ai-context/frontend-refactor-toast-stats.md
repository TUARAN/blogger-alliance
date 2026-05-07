# 前端清理、TOB 拆分与统计层合并说明

## 背景

这批改动已经合并到 `main`，最终 merge commit：

- `50ba1f8 Merge branch 'claude/toast-and-stats'`

它串联了最近几档工作：

- `cb3d50f`：清理死代码 / 路由、抽取 `AppNav`、补 SEO、404、favicon
- `5f5e10c`：拆分 `tob/index.vue`，把 TOB 页核心 UI 组件化
- `cf77a33`：忽略 Claude Code 本地 worktree 与个人设置
- `c66d6f6`：把 `alert()` 替换为 toast，并合并统计工具层

## 已完成的结构调整

### 1. 通用导航与路由清理

新增统一导航组件：

- `src/components/AppNav.vue`

各页面不再重复维护局部导航结构，而是统一使用 `AppNav`。

同时移除了已经不再使用的旧入口和旧布局组件：

- `src/views/Home.vue`
- `src/views/About.vue`
- `src/components/Header.vue`
- `src/components/Footer.vue`

路由层补充了 404 页面：

- `src/pages/not-found/index.vue`

站点入口补齐了 SEO meta 与 favicon：

- `index.html`
- `public/favicon.svg`

### 2. TOB 页面拆分

`src/pages/tob/index.vue` 原本超过 1000 行，已经拆成页面容器 + 多个业务组件：

- `src/components/BloggerCard.vue`
- `src/components/BloggerControls.vue`
- `src/components/BloggerTable.vue`
- `src/components/BrandMarquee.vue`
- `src/components/QrCorner.vue`

当前分工：

- `tob/index.vue`：保留页面状态、筛选排序、复制表格、统计读取等页面级逻辑
- `BloggerControls.vue`：筛选、排序、视图切换、下载花名册、复制表格按钮
- `BloggerCard.vue`：卡片视图
- `BloggerTable.vue`：表格视图
- `BrandMarquee.vue`：合作品牌滚动展示
- `QrCorner.vue`：二维码角标

排序逻辑也更数据化：

- `src/data/bloggerInfo.js` 中维护 `cooperationHeatOrder`
- TOB 页按合作热度、推荐顺序、粉丝数进行排序

## Toast 改造

新增轻量 toast 工具：

- `src/utils/toast.js`
- `src/components/ToastHost.vue`

挂载位置：

- `src/App.vue`

当前使用场景：

- `src/pages/tob/index.vue`
  - 复制表格成功 / 失败提示
- `src/pages/workspace/web-llm/index.vue`
  - 模型加载失败
  - 未加载模型时执行操作
  - 应用初始化失败

全仓库已经清掉 `alert()` 调用。后续新增用户反馈时优先使用：

```js
import { showToast } from '../utils/toast.js'

showToast('操作成功', { type: 'success' })
showToast('操作失败，请重试', { type: 'error' })
```

可选参数：

- `type`: `info` / `success` / `error`
- `duration`: 毫秒，默认 3000

## 统计层合并

之前统计相关逻辑分散在多层：

- `src/utils/statsService.js`
- `src/utils/analytics.js`
- `src/utils/hybridStats.js`
- `src/utils/busuanzi.js`

现在保留单一业务入口：

- `src/utils/stats.js`

`busuanzi.js` 仍保留为第三方不蒜子集成层，不再作为业务侧直接入口。

当前公开 API：

- `getBloggerStats()`
- `getRealTimeStats()`
- `recordPageView()`
- `trackLinkClick(linkText, linkUrl, pagePath)`

当前引用方：

- `src/pages/tob/index.vue`
- `src/pages/toc/index.vue`
- `src/pages/academy/index.vue`

已经删除旧统计文件：

- `src/utils/statsService.js`
- `src/utils/analytics.js`
- `src/utils/hybridStats.js`

也删除了未被页面引用的旧统计组件：

- `src/components/DetailedStats.vue`
- `src/components/SimpleStatsBar.vue`
- `src/components/StatsDisplay.vue`

## 本地 Claude Code 状态文件

`.gitignore` 已补充：

```gitignore
.claude/worktrees/
.claude/settings.local.json
```

这两个路径属于 Claude Code 本地运行状态，不应提交。

## 验证记录

合并到 `main` 后已执行：

```bash
npm run build
```

结果：

- 构建通过
- Vite 仍提示 Browserslist 数据过期
- Vite 仍提示部分 chunk 大于 500 kB

以上两个是现有构建提示，不是本次改动引入的阻断错误。

还做过一次 preview 交互验证：

- 路径：`/tob`
- 操作：切换到表格视图，点击“复制表格数据”
- 结果：toast 正常显示“表格数据已复制，可粘贴到 Excel / 飞书 / Notion”

## 后续维护注意

新增页面时：

- 优先复用 `AppNav`
- 页面级 404 继续走现有路由配置
- 用户反馈优先用 `showToast()`，不要重新引入 `alert()`
- 站点统计只从 `src/utils/stats.js` 引入

修改 TOB 页时：

- UI 展示优先放进 `BloggerCard.vue` / `BloggerTable.vue` / `BloggerControls.vue`
- 页面状态和跨组件计算保留在 `src/pages/tob/index.vue`
- 合作热度排序优先维护 `src/data/bloggerInfo.js` 的 `cooperationHeatOrder`
