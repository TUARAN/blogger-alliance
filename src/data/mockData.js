// 博主团队数据
export const bloggersData = [
  {
    id: 1,
    name: '掘金安东尼',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    introduction: '前端技术专家，Vue.js 核心贡献者，专注于前端工程化和性能优化',
    followers: '12.5K',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/123456', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/anthony', icon: '🐙' },
      { platform: '知乎', url: 'https://zhihu.com/people/anthony', icon: '📚' }
    ],
    expandedContent: {
      specialties: ['Vue.js', 'React', 'TypeScript', '前端工程化'],
      achievements: ['掘金年度作者', '开源项目维护者', '技术大会讲师'],
      recentPosts: ['Vue 3.4 新特性解析', '前端性能优化实战', 'TypeScript 最佳实践']
    }
  },
  {
    id: 2,
    name: '技术胖',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    introduction: '全栈开发工程师，Node.js 专家，擅长后端架构和数据库设计',
    followers: '8.9K',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/789012', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/techfat', icon: '🐙' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/techfat', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
      achievements: ['Node.js 社区贡献者', '技术书籍作者', '在线教育讲师'],
      recentPosts: ['Node.js 性能调优指南', '微服务架构实践', '数据库设计模式']
    }
  },
  {
    id: 3,
    name: '前端小王子',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    introduction: 'UI/UX 设计师转前端，专注于用户体验和界面设计，CSS 魔法师',
    followers: '15.2K',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/345678', icon: '📝' },
      { platform: 'Dribbble', url: 'https://dribbble.com/frontendprince', icon: '🎨' },
      { platform: '微博', url: 'https://weibo.com/frontendprince', icon: '📱' }
    ],
    expandedContent: {
      specialties: ['CSS3', 'Sass/Less', 'UI/UX 设计', '动画效果', '响应式设计'],
      achievements: ['CSS 设计大赛冠军', 'UI 设计作品集作者', '设计系统构建者'],
      recentPosts: ['CSS Grid 布局完全指南', '动画性能优化技巧', '设计系统构建实践']
    }
  }
]

// 产品工具数据
export const toolsData = [
  {
    id: 1,
    name: 'AI 代码助手',
    description: '基于 GPT-4 的智能代码生成和重构工具，支持多种编程语言',
    icon: '🤖',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    url: 'https://ai-code-assistant.com',
    category: '开发工具',
    features: ['智能代码生成', '代码重构建议', '多语言支持', 'IDE 插件']
  },
  {
    id: 2,
    name: '推广数据分析',
    description: '一站式推广效果分析平台，帮助产品经理优化推广策略',
    icon: '📊',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    url: 'https://analytics-tool.com',
    category: '数据分析',
    features: ['实时数据监控', '转化率分析', '用户行为追踪', 'ROI 计算']
  },
  {
    id: 3,
    name: 'Markdown 排版工具',
    description: '专业的 Markdown 编辑器和排版工具，支持多种主题和导出格式',
    icon: '📝',
    cover: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop',
    url: 'https://markdown-editor.com',
    category: '内容创作',
    features: ['实时预览', '多种主题', '导出 PDF', '协作编辑']
  },
  {
    id: 4,
    name: '技术文档生成器',
    description: '自动生成项目技术文档，支持 API 文档、组件文档等多种类型',
    icon: '📚',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    url: 'https://doc-generator.com',
    category: '开发工具',
    features: ['自动生成', '多种模板', '版本控制', '在线预览']
  },
  {
    id: 5,
    name: '代码审查助手',
    description: 'AI 驱动的代码审查工具，自动检测代码质量和潜在问题',
    icon: '🔍',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    url: 'https://code-review-ai.com',
    category: '开发工具',
    features: ['自动检测', '质量评分', '最佳实践建议', '团队协作']
  },
  {
    id: 6,
    name: '项目管理看板',
    description: '轻量级项目管理工具，支持看板、甘特图等多种视图',
    icon: '📋',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    url: 'https://project-kanban.com',
    category: '项目管理',
    features: ['看板视图', '甘特图', '任务分配', '进度跟踪']
  }
]

// 博主合伙人好处数据
export const partnerBenefits = [
  {
    id: 1,
    icon: '💰',
    title: '增加收入',
    description: '通过推广合作获得额外收入，月收入提升 30-50%'
  },
  {
    id: 2,
    icon: '🤝',
    title: '资源共享',
    description: '与其他博主共享推广资源，扩大影响力'
  },
  {
    id: 3,
    icon: '📈',
    title: '粉丝增长',
    description: '通过联盟活动获得更多曝光，快速涨粉'
  },
  {
    id: 4,
    icon: '🎯',
    title: '精准对接',
    description: '优先获得优质产品推广机会，提高转化率'
  },
  {
    id: 5,
    icon: '📚',
    title: '学习成长',
    description: '与行业大咖交流，提升内容创作和推广能力'
  },
  {
    id: 6,
    icon: '🏆',
    title: '品牌背书',
    description: '获得博主联盟认证，提升个人品牌价值'
  }
] 