# 网站访问统计设置指南

## 当前实现

目前网站使用本地存储 (localStorage) 来记录访问数据，提供真实的 PV/UV 统计功能。每次用户访问页面时，系统会：

1. 记录页面浏览量 (PV)
2. 识别独立访客 (UV)
3. 保存每日统计数据
4. 显示实时更新的统计信息

## 升级到 Google Analytics 4 (推荐)

为了获得更准确的统计数据和更丰富的分析功能，建议升级到 Google Analytics 4。

### 步骤 1: 创建 Google Analytics 账户

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 点击"开始衡量"
3. 创建账户和媒体资源
4. 获取测量 ID (格式: G-XXXXXXXXXX)

### 步骤 2: 更新配置

✅ **已完成配置**

Google Analytics 测量 ID: `G-MF2CNPVS7M`

配置文件已更新：
- `src/utils/analytics.js` - 测量 ID 已配置
- `index.html` - Google Analytics 脚本已添加

当前配置：
```javascript
const GA_MEASUREMENT_ID = 'G-MF2CNPVS7M'
```

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MF2CNPVS7M"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MF2CNPVS7M');
</script>
```

### 步骤 3: 启用 GA4 API (可选)

如果需要获取实时数据，需要配置 GA4 API：

1. 在 Google Cloud Console 创建项目
2. 启用 Google Analytics Data API
3. 创建服务账户和密钥
4. 更新 `getRealTimeStats` 函数使用真实 API

## 其他统计服务选项

### 1. 百度统计 (国内推荐)
- 适合国内用户
- 提供中文界面
- 支持实时数据

### 2. 友盟统计
- 移动端友好
- 提供详细用户行为分析
- 支持多平台

### 3. 51.la 统计
- 轻量级统计服务
- 适合小型网站
- 免费使用

## 当前功能特性

✅ 实时 PV/UV 统计  
✅ 每日数据记录  
✅ 7天趋势图表  
✅ 访客去重统计  
✅ 自动数据更新  
✅ 响应式设计  
✅ Google Analytics 4 集成  
✅ 用户交互跟踪  
✅ 混合统计服务  
✅ 统计状态指示器  

## 数据存储

- 统计数据存储在浏览器的 localStorage 中
- 数据格式：JSON
- 包含：总 PV/UV、每日统计、访客 ID
- 数据持久化，不会因刷新页面而丢失

## 注意事项

1. 当前实现基于客户端存储，数据仅保存在用户浏览器中
2. 不同设备/浏览器会显示不同的统计数据
3. 清除浏览器数据会重置统计
4. 建议升级到服务器端统计以获得更准确的数据

## 自定义配置

可以在 `src/utils/statsService.js` 中修改：

- 更新频率 (默认 30 秒)
- 数据保留时间
- 统计维度
- 显示格式

## 新增功能

### 混合统计服务
- 结合本地存储和 Google Analytics 的优势
- 本地存储提供实时显示
- Google Analytics 提供准确的长时期数据

### 用户交互跟踪
- 按钮点击跟踪
- 链接点击跟踪
- 表单提交跟踪
- 自定义事件跟踪

### 统计状态指示器
- 显示本地统计状态
- 显示 Google Analytics 连接状态
- 实时更新指示器

## 查看统计数据

### Google Analytics 控制台
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择你的媒体资源
3. 查看实时报告和受众报告

### 本地统计数据
- 数据存储在浏览器 localStorage 中
- 可以通过浏览器开发者工具查看
- 键名：`blogger_alliance_stats` 