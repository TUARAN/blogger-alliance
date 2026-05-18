# 网站 UI 风格记录

## 定位

当前站点是面向技术博主联盟、品牌合作、开发者资源与内部工作台的轻量 SaaS / 运营看板风格。整体观感应保持专业、可信、清爽，有技术社区气质，但不要做成重营销落地页。

关键词：

- 专业技术影响力平台
- 浅色、清爽、信息密度适中
- 商业合作可读性优先
- 开发者社区亲和感
- 数据、表格、卡片、流程说明并重

## 技术与基础样式

- 前端使用 Vue + Vite + Tailwind CSS。
- 全局字体为 `Inter, system-ui, sans-serif`，见 `tailwind.config.js` 和 `src/style.css`。
- 页面默认背景多为 `bg-gray-50` 或浅色渐变。
- 全站使用 Tailwind 原子类为主，已有少量通用组件类：
  - `.btn-primary`
  - `.btn-secondary`
  - `.card`
  - `.card-mobile`
  - `.btn-mobile`
  - `.input-mobile`
  - `.section-mobile`
  - `.container-mobile`

后续新增页面应优先沿用 Tailwind 直接组合，不要引入新的 UI 框架。

## 色彩

### 主色

主色是 indigo / blue 系：

- 品牌与关键链接：`text-indigo-600`, `text-indigo-700`
- 主按钮：`bg-indigo-600 hover:bg-indigo-700`
- Hero 渐变文字：`from-indigo-600 to-purple-600`
- 焦点态：`focus:ring-indigo-500`

`tailwind.config.js` 中定义了 `primary` 色板，实质是 blue 系：

- `primary-600: #2563eb`
- `primary-700: #1d4ed8`

### 辅助色

按业务类型使用轻量辅助色：

- 推文 / 品牌主路径：indigo、blue
- 引流 / 增长：emerald、green
- 社群：blue、sky
- AI / 专题：amber、orange
- 出海 / 云访问：cyan
- 风险、禁用、错误：rose、red
- 中性内容、表格、边框：gray、slate

辅助色大多使用浅底深字组合，例如：

- `bg-indigo-50 text-indigo-700 border-indigo-200`
- `bg-emerald-50 text-emerald-700 border-emerald-200`
- `bg-amber-100 text-amber-800`

### 背景

公共页面常用浅色渐变：

- `bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`
- `bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50`
- `bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100`

工作台、矩阵、内部数据页面更偏白底 / 灰底，减少装饰，突出扫描效率。

## 布局

### 页面容器

常用宽度：

- 主站内容：`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- 服务详情：`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- 矩阵看板：`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8`

页面间距：

- Hero 区常用 `pt-8 pb-16 lg:pt-14 lg:pb-24`
- 普通内容区常用 `py-10`、`py-16`
- 卡片内部常用 `p-4`、`p-5`、`p-6`

### 响应式

- 移动端优先，栅格从 `grid-cols-1` 起步。
- 常见断点：
  - `sm:grid-cols-2`
  - `md:grid-cols-3`
  - `lg:grid-cols-3/4`
  - `xl:grid-cols-4/5`
- 表格类内容必须包一层 `overflow-x-auto`。
- 移动端控件高度至少约 `h-10`，已有 `.btn-mobile` 和 `.input-mobile` 保证 `min-h-[44px]`。

## 导航

统一导航组件为 `src/components/AppNav.vue`。

视觉特征：

- `sticky top-0 z-40`
- `bg-white/80 backdrop-blur-md`
- `shadow-sm border-b`
- 高度 `h-16`
- 品牌文字使用 `text-xl font-bold text-indigo-600`

新增页面优先复用 `AppNav`，不要复制一套导航。

## 卡片与容器

站点大量使用白色、半透明白色和浅灰容器。

常见形态：

- 标准卡片：`bg-white rounded-2xl border border-gray-100 shadow-md`
- 信息区块：`bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6`
- 服务总览：`rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm`
- 矩阵页数据卡：`rounded-[22px] border border-gray-200 bg-[#fafafa] p-5`

圆角层级：

- 小按钮 / 输入框：`rounded-md`、`rounded-lg`
- 标签 / pill：`rounded-full`
- 普通卡片：`rounded-xl`、`rounded-2xl`
- 大型 CTA / 重点区块：可用 `rounded-3xl` 或 `rounded-[28px]`

阴影应克制，默认用 `shadow-sm` / `shadow-md`， hover 才提升到 `shadow-lg` / `shadow-xl`。

## 排版

### 标题

- Hero H1：`text-4xl md:text-6xl font-bold text-gray-900 leading-tight`
- 页面主标题：`text-3xl md:text-4xl font-bold text-gray-900`
- 区块标题：`text-2xl font-bold text-gray-900`
- 卡片标题：`text-sm` 到 `text-lg`，通常 `font-semibold text-gray-900`

### 正文

- 主体正文多为 `text-gray-600`
- 说明文字常用 `text-sm leading-7`
- 次级说明常用 `text-xs text-gray-500`
- 表格头常用 `text-xs uppercase tracking-wider text-slate-500`

### 标签

小型标签常用：

- `inline-flex items-center rounded-full`
- `px-2.5 py-1` 或 `px-3 py-1`
- `text-xs font-semibold`

英文小标题或分组 eyebrow：

- `text-sm font-semibold uppercase tracking-[0.2em] text-slate-500`
- 更小可用 `text-xs uppercase tracking-[0.24em]`

## 按钮与交互

### 主按钮

常见主按钮：

- `rounded-full px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600`
- 或 `rounded-lg bg-indigo-600 text-white hover:bg-indigo-700`

### 次级按钮

常见次级按钮：

- `bg-white border border-indigo-200 text-indigo-700`
- `bg-gray-100 text-gray-500 hover:text-gray-700`
- `border border-slate-300 bg-white text-slate-700 hover:bg-slate-100`

### hover 与动效

动效保持轻量：

- `transition-colors`
- `transition-all duration-300`
- 卡片 hover 可用 `hover:shadow-lg`
- 入口卡片或 CTA 可用轻微 `hover:-translate-y-1` 或 `hover:scale-105`

不要在普通信息页面堆叠复杂动画。已有品牌轮播使用 `.animate-scroll`，并支持 `prefers-reduced-motion` 降级。

## 图标与视觉元素

当前项目大量使用 emoji 作为轻量图标，例如：

- 导航：`🚀`、`🗂️`
- 服务：`✍️`、`🔗`、`👥`、`🤖`、`🌐`
- 卡片状态：`✨`、`🌟`

这种风格适合社区感和低成本表达。后续如果引入图标库，应统一替换某一类场景，不要同一组件内混用两套体系。

装饰元素应少量使用：

- Hero 中有浅色圆形 pulse 装饰。
- 二维码角标有轻量渐变光晕。
- 主体内容不要大面积使用装饰图形，以信息可读性为主。

## 表格与数据展示

表格样式偏 B 端管理台：

- 外层：`overflow-x-auto rounded-xl border border-slate-200 bg-white`
- 表头：浅灰底、`uppercase tracking-wider`
- 行 hover：`hover:bg-slate-50/60` 或 `hover:bg-gray-50`
- 分隔：`divide-y divide-slate-200`
- 关键数字用 `font-bold` 和主色突出

数据看板可用：

- 白底卡片
- 浅灰分区
- 色条 / 圆点 / pill 标识平台
- 信息密度可以高于营销页，但要保留足够 `gap` 和 `p-4/p-5`

## 表单与内部工具

内部表单样式：

- Modal 背景：`bg-slate-900/50 backdrop-blur-sm`
- Modal 容器：`rounded-2xl bg-white shadow-2xl`
- 输入框：`h-10 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500`
- 操作栏：`border-t border-slate-200 bg-slate-50`

内部工具应保持安静、实用，避免 Hero 式大标题和过多渐变。

## Toast 与反馈

统一使用 `src/utils/toast.js` 和 `src/components/ToastHost.vue`。

样式特征：

- 顶部居中
- `rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md`
- success：emerald
- error：rose
- info：white / gray

不要重新引入 `alert()`。

## 页面类型差异

### 对外 TOB 页面

- 可使用浅色渐变背景。
- Hero 可以居中、大字号、渐变文字。
- CTA 用圆角 pill、主色渐变、轻微 hover 动效。
- 合作品牌、服务介绍、案例内容以卡片和表格组织。

### 服务详情页

- 信息密度高于首页。
- 左侧锚点导航仅桌面展示。
- 每个服务用 `section` + 白色半透明卡片拆分。
- 内容结构固定为：核心说明、适合谁、不适合谁、类型、交付、流程、结算口径。

### 博主列表

- 支持卡片和表格两种视图。
- 卡片强调头像、姓名、粉丝量、平台标签和展开详情。
- 表格强调横向扫描，第一列 sticky。
- 筛选、排序、下载、视图切换放在统一控制条。

### 工作台 / 内部页

- 更偏 dashboard。
- 使用卡片入口、表格、Modal 和表单。
- 色彩降低饱和度，以 `slate/gray/indigo` 为主。

### 矩阵看板

- 背景更克制：`bg-[#f6f7f8]`。
- 大卡片使用 `rounded-[22px]`、`bg-[#fafafa]`。
- 图表、平台列表、柱状图强调数据扫描。

## 后续修改原则

1. 新页面先复用 `AppNav`、现有容器宽度和 indigo 主色。
2. 优先使用 `bg-white` / `bg-white/80` + border + 轻阴影承载内容。
3. 按业务类型使用辅助色，但不要让页面变成单一高饱和色块。
4. 表格和长内容必须优先保证移动端横向滚动或合理换行。
5. 按钮、标签、卡片的圆角和阴影保持克制，不要引入厚重拟物风。
6. 用户反馈使用 toast；确认、编辑、内部数据维护使用 modal。
7. 文字表达保持直接、面向技术品牌和开发者，不要写成泛营销口号。
8. 如果改动涉及服务报价、周期、结算口径，要同步检查服务总览表和服务详情页。
