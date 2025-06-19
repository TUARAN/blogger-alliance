# 博主联盟 (Blogger Alliance)

一个基于 Vue 3 + Tailwind CSS 的技术博主展示和推广平台。

## 🚀 功能特性

### ToB 页面 (`/tobe`)
- 展示博主团队，帮助产品获得技术圈曝光
- 博主卡片展示，支持展开查看更多详情
- 联系方式 Modal 弹窗
- 响应式设计，适配移动端

### ToC 页面 (`/toc`)
- 双 Tab 设计：博主合伙人和工具库
- 博主合伙人申请表单
- 工具库展示，包含 6 个示例产品
- 流畅的页面切换动画

### 技术栈
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 快速的前端构建工具
- **Vue Router** - 官方路由管理器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **@vueuse/core** - Vue 组合式 API 工具集

## 📁 项目结构

```
blogger-alliance/
├── src/
│   ├── pages/
│   │   ├── tobe/
│   │   │   └── index.vue          # ToB 页面
│   │   └── toc/
│   │       └── index.vue          # ToC 页面
│   ├── data/
│   │   └── mockData.js            # Mock 数据
│   ├── views/
│   │   ├── Home.vue               # 首页
│   │   ├── Bloggers.vue           # 博主页面
│   │   └── About.vue              # 关于页面
│   ├── components/                # 组件目录
│   ├── App.vue                    # 根组件
│   ├── main.js                    # 入口文件
│   └── style.css                  # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ 安装和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🎨 设计特色

- **现代化 UI** - 使用 Tailwind CSS 构建清新现代的界面
- **响应式设计** - 完美适配桌面端和移动端
- **流畅动画** - Vue Transition 组件实现的页面切换动画
- **交互体验** - 卡片悬停效果、按钮渐变、Modal 弹窗等
- **Loading 状态** - 骨架屏加载动画

## 📱 页面路由

- `/` - 首页
- `/tobe` - ToB 推广服务页面
- `/toc` - ToC 博主合伙人和工具库页面
- `/bloggers` - 博主展示页面
- `/about` - 关于页面

## 🔧 自定义配置

### 修改 Mock 数据
编辑 `src/data/mockData.js` 文件来修改：
- 博主团队信息
- 工具库产品
- 合伙人好处列表

### 样式定制
- 全局样式：`src/style.css`
- Tailwind 配置：`tailwind.config.js`

## 🚀 部署

项目使用 Vite 构建，可以部署到任何静态文件托管服务：

```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态文件，可直接部署到：
- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**博主联盟** - 连接优秀的技术博主，分享知识，共同成长 🚀 