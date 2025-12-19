// 博主团队数据 - 动态计算博主数量和覆盖程序员粉丝数
export const bloggersData = [
  {
    id: 1,
    name: '掘金安东尼',
    avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/99b34a64642e38fd8e8b130e40956cd2~80x80.awebp',
    introduction: '多平台技术博主、掘金7级作者、社区共建者、签约作者、51CTO专家博主、文章400余篇、阅读量200余万、机械工业《程序员成长手记》作者、《扣子指南小册》作者',
    followers: '15K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1521379823340792', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/TUARAN', icon: '🐙' },
      { platform: '51CTO', url: 'https://blog.51cto.com/u_13961087', icon: '💻' },
      { platform: '头条', url: 'https://www.toutiao.com/c/user/token/CiytHKMTSTLr9UjjPapQfQgP0Qtz-mo_r7SZ-9a-vjhHMpxe4Zf0NZ5nXMww0BpJCjwAAAAAAAAAAAAATzLFgylPHFsiAK3qyEAfRlTqWH9UNxHBykjYOQGlKESnc18eU1QTS8cwMB6HSurHYfYQvfn1DRjDxYPqBCIBA2ciM6E=/?source=list&log_from=d3cb457759bbb_1751732899254', icon: '📰' },
      { platform: '微信公众号', url: 'https://mp.weixin.qq.com/s/anthony_wechat', icon: '🌏' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/Anthony1453?spm=1000.2115.3001.5343', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['前端开发', '技术写作', '社区建设', '多平台运营'],
      achievements: ['掘金7级-社区共建者', '掘金签约作者', '51CTO专家博主', '文章400余篇'],
      recentPosts: ['前端技术发展趋势', '掘金社区建设经验分享', '技术写作技巧分享']
    }
  },
  {
    id: 2,
    name: '德育处主任',
    avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/6c49bd0b908f5b1601050a168d0283b2~80x80.awebp',
    introduction: '多平台技术博主、掘金6级、文章300余篇、阅读量200余万。🧑‍💻写技术专栏｜聊商业故事。',
    followers: '15K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/2673620576140030', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/Quick-Z', icon: '🐙' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_39415598', icon: '💻' },
      { platform: '微信公众号：德育处主任', url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMjU3ODU5Ng==#wechat_redirect', icon: '🌏' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/rabbit-svip/posts', icon: '📚' },
    ],
    expandedContent: {
      specialties: ['前端可视化', 'Python', '商业故事', '工具分享'],
      achievements: ['掘金6级', '文章300余篇', '阅读量200余万', '多平台技术博主'],
      recentPosts: ['OpenCV专栏', 'Python后端开发专栏', '商业故事']
    }
  },
  {
    id: 3,
    name: '阿杆',
    avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/de3dfdc0012f9090816782278813f241~180x180.awebp',
    introduction: '多平台技术博主、掘金优秀创作者、CSDN博客专家、文章数100+、阅读量100w+、GitHub 800+ star',
    followers: '24K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/little_stick_i', icon: '💻' },
      { platform: 'GitHub', url: 'https://github.com/stick-i', icon: '🐙' },
      { platform: '掘金', url: 'https://juejin.cn/user/4182956056773160', icon: '📝' },
      { platform: '微信公众号：程序员阿杆', url: 'https://mp.weixin.qq.com/s/-9AJukj2GTE6Im7x4mW4lw', icon: '🌏' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/stick-i', icon: '📚' },
    ],
    expandedContent: {
      specialties: ['后端开发', '技术写作', '多平台运营', '开源分享'],
      achievements: ['专家博主', '技术文章作者', '知识分享达人'],
      recentPosts: ['技术写作心得', '多平台运营策略', '知识传播策略']
    }
  },
  {
    id: 4,
    name: '前端之虎陈随易',
    avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/1e53615038b0e9a227c4627ee0bb0a65~180x180.awebp',
    introduction: '农村程序员、独立开发者、10多个500人微信群、技术文章200+、全网粉丝40000+',
    followers: '40K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1239904846873326', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/chenbimo', icon: '🐙' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/chensuiyi', icon: '💻' },
      { platform: '微信公众号', url: 'https://mp.weixin.qq.com/s/T_RW_gc0qiX6SwMM2SAbiw', icon: '💻' },
      { platform: '个人网站', url: 'https://chensuiyi.me', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['前端开发', '独立开发', '产品设计', '行业观察', '技术写作'],
      achievements: ['独立产品100+', '技术文章200+', '全网粉丝40000+', '农村程序员代表'],
      recentPosts: ['独立开发经验分享', '前端技术发展趋势', '农村程序员成长之路']
    }
  },
  {
    id: 5,
    name: '南方者',
    avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/db3b09f9ca107d8843cee3fe8f4f0cd4~130x130.awebp',
    introduction: 'CSDN专家博主，专注于技术分享和知识传播',
    followers: '40K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://anpai.blog.csdn.net', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/2840793779295133/posts', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/NanFangZhe404', icon: '🐙' },
    ],
    expandedContent: {
      specialties: ['技术分享', '知识传播', 'CSDN运营', '技术写作'],
      achievements: ['CSDN专家博主', '粉丝40000+', '技术文章作者', '知识分享达人'],
      recentPosts: ['CSDN运营经验分享', '技术写作技巧', '知识传播策略']
    }
  },
  {
    id: 6,
    name: '战场小包',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=zhanchangxiaobao&backgroundColor=f4e4bc',
    introduction: '前端开发工程师，多平台活跃博主，专注于技术分享和社区建设',
    followers: '10K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/4424090519078430', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/zcxiaobao', icon: '🐙' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/qq_32036091?spm=1000.2115.3001.5343', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['技术分享', '多平台运营', '社区建设', '技术写作'],
      achievements: ['AGI 社区共建者', '掘金签约作者', '粉丝10000+', '阿里云签约作者', '掘金优秀创作者', '社区贡献者'],
      recentPosts: ['多平台运营经验', '技术分享心得', '社区建设实践', '与掘金社区合作多次']
    },
  },
  {
    id: 7,
    name: 'MiyueFE',
    avatar: 'https://p26-passport.byteacctimg.com/img/user-avatar/afcc0b5364cba06f7814368d1f44fc11~180x180.awebp',
    introduction: '前端开发工程师，多平台活跃博主，掘金5级，文章100+篇，GitHub 2k+ star',
    followers: '4K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/747323639208391', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/miyuesc', icon: '🐙' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_43359503', icon: '💻' },
      { platform: '微信公众号', url: 'https://mp.weixin.qq.com/s/miyuefe_wechat', icon: '🌏' },
    ],
    expandedContent: {
      specialties: ['技术分享', '多平台运营', '社区建设', '技术写作'],
      achievements: ['专家博主', '文章100+篇', '技术文章作者', '开源爱好者'],
      recentPosts: ['什么可以帮助你在前端面试中取得成功', '让我害怕的 TypeScript 类型', '深入浅出Babel插件开发']
    },
  },
  {
    id: 8,
    name: 'XiaomingX',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=cloud&backgroundColor=00ced1',
    introduction: '多平台技术博主、掘金5级、文章800+篇、阅读量580万+、云原生架构师',
    followers: '23.3K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/2875978147692910', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/XiaomingX', icon: '🐙' },
      { platform: 'X', url: 'https://x.com/seclink ', icon: '💻' },
    ],
    expandedContent: {
      specialties: ['Python', '大模型应用开发', 'Next.js', '系统架构设计'],
      achievements: ['掘金5级', '文章800+篇', '阅读量580万+', '云原生架构师'],
      recentPosts: ['基于Python的大模型实践', 'Next.js全栈开发最佳实践', '现代系统架构设计思路']
    }
  },
  {
    id: 9,
    name: '嚣张农民',
    avatar: 'https://avatars.githubusercontent.com/u/35765876?v=4&size=64',
    introduction: '多平台技术博主、掘金优秀创作者、CSDN前端领域优质创作者、51CTO专家博主、文章200余篇、阅读量100余万',
    followers: '20K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/3131035352311646', icon: '📝' },
      { platform: 'GitHub', url: 'https://github.com/linweiqian', icon: '🐙' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/rrskeo', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_40808668?spm=1000.2115.3001.5343', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['前端开发', '技术写作', '社区建设', '多平台运营'],
      achievements: ['掘金优秀创作者', 'CSDN前端领域优质创作者', '技术文章作者', '文章200余篇'],
      recentPosts: ['前端技术发展趋势', '掘金社区建设经验分享', '技术写作技巧分享']
    }
  },
  {
    id: 10,
    name: '中杯可乐多加冰',
    avatar: 'https://avatars.githubusercontent.com/u/35050697?s=400&u=87690c4cb71974e60295a713986cc0393212169a&v=4',
    introduction: '武汉开发者社区主理人、CSDN博客专家、年度博客之星、人工智能领域TOP2、中国开发者影响力榜单博主、文章300余篇、全网粉丝量100k+、阅读量800余万',
    followers: '100K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/air__Heaven?type=blog', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/3435306702347432', icon: '📝' },
      { platform: '微信公众号:采苓AI研习社', url: 'https://mp.weixin.qq.com/s/NJgBjKLIvjblsUjDa2yxmQ', icon: '🌏' },
      { platform: 'GitHub', url: 'https://github.com/Heavenhjs', icon: '🐙' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/ling-sheng-87', icon: '🎯' },
      { platform: '腾讯云开发者社区', url: 'https://cloud.tencent.com/developer/user/10172274', icon: '📚' },
    ],
    expandedContent: {
      specialties: ['技术写作', '社群推广', '产品推介', '社区建设', '多平台运营', '技术咨询', '研学辅导'],
      achievements: ['CSDN专家博主', '掘金优秀创作者', '中国开发者影响力榜单博主', '亚马逊云官方博主', '腾讯云创作之星', '武汉开发者社区主理人'],
      recentPosts: ['AI落地应用实战专栏', 'RAG应用解决方案', '百度文心一言开源ERNIE-4.5深度测评报告']
    }
  },
  {
    id: 11,
    name: 'Alex',
    avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/95be01169a8d7826404bf5e0dfb38e45~180x180.awebp',
    introduction: '某大厂AIOT技术专家，CSDN优质创作者，51cto专家博主，全网粉丝量33W+，提供产品测评、学习辅导、简历定制优化、面试辅导、毕设辅导、项目开发、C/C++/Java/Python/Linux/AI/云平台等方面的服务',
    followers: '330K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/g310773517?type=lately', icon: '💻' },
      { platform: '51CTO', url: 'https://blog.51cto.com/u_1150085', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/2505125286925081', icon: '📝' },
      { platform: '微信公众号:Alex技术圈', url: 'https://mp.weixin.qq.com/s/AwruowQ6fRu1tabXPZxyFw', icon: '🌏' },
      { platform: 'Gitee', url: 'https://gitee.com/ylguo', icon: '🐙' },
      { platform: '知乎', url: 'https://www.zhihu.com/people/alex-30-57', icon: '🎯' },
    ],
    expandedContent: {
      specialties: ['嵌入式开发', '技术写作', '私域推广', '测评软文', '技术分享', '技术自媒体写作指导', '研学辅导'],
      achievements: ['CSDN优质创作者', '51cto博客专家', '文章1600+篇', '全网阅读量≈1000W', '多平台技术博主'],
      recentPosts: ['通义灵码IDE使用mcp', '产品推介', '华为开发者空间xDeepSeek的应用']
    }
  },
  {
    id: 12,
    name: '田八',
    avatar: 'https://p26-passport.byteacctimg.com/img/user-avatar/6a646066de6c1376525669efb70295e9~130x130.awebp',
    introduction: '技术爱好者、掘金优秀创作者、专注全栈开发（前端方向）、技术写作、文章150+、阅读量50万+',
    followers: '3K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/950446655026551', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/qq_33733799', icon: '💻' },
      { platform: 'GitHub', url: 'https://github.com/zeng-hang', icon: '🐙' },
    ],
    expandedContent: {
      specialties: ['前端全栈', '技术写作', '社区建设', '技术咨询'],
      achievements: ['掘金优秀创作者', '阿里云专家博主', '技术爱好者', '技术文章150+'],
      recentPosts: ['学会Grid之后，我觉得再也没有我搞不定的布局了', '告别屎山！！！WebSocket 的极致封装， 写好代码竟如此简单', '一个永远不会完成的 Promise 是否会造成存储泄漏']
    }
  },
  {
    id: 13,
    name: '万少',
    avatar: 'https://p26-passport.byteacctimg.com/img/user-avatar/3559b8826a8e632112e62195b3a1c745~180x180.awebp',
    introduction: '华为HDE 华为云 HCDE 华为鸿蒙社区问答专家、HarmonyOS学习资源创作专家、阿里云专家博主、掘金优秀作者、51CTO社区明星',
    followers: '5K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/4441682708283191', icon: '📝' },
      { platform: '微信公众号:程序员漫谈', url: 'https://mp.weixin.qq.com/s/kX-9EpoZAe2FrEvvRXShhQ', icon: '🌏' },
      { platform: '个人博客', url: 'https://itcastwsy.github.io/pub-blog/', icon: '🐙' },
    ],
    expandedContent: {
      specialties: ['前端全栈', '技术博主', 'HarmonyOS 鸿蒙应用开发专家', '技术布道师'],
      achievements: ['掘金优秀创作者', '阿里云专家博主', '技术爱好者', '技术文章150+'],
      recentPosts: ['HarmonyOS 鸿蒙应用开发  AI 的bug AI来修复', '2025年 华为鸿蒙创新赛比赛流程 全攻略', '可可图片编辑 HarmonyOS（4）图片裁剪-canvas']
    }
  },
  {
    id: 14,
    name: '摸鱼的春哥',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=chunge&backgroundColor=F2F5F9',
    introduction: '掘金签约作者，分享实用编程技巧与职场成长故事，致力于陪伴开发者稳步进阶。',
    followers: '8.2K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1714893870865303', icon: '📝' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['编程技术', '职场成长', '效率工具'],
      achievements: ['掘金优质创作者', '多平台内容输出', '粉丝8K+'],
      recentPosts: ['程序员的进阶路径思考', '职场沟通的三个实战技巧', '面向自动化的开发工具清单']
    }
  },
  {
    id: 15,
    name: '法医',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=fayi&backgroundColor=E8F7FF',
    introduction: '聚焦后端与安全方向的技术作者，擅长将复杂知识拆解为通俗易懂的教程。',
    followers: '10K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1574156383557255', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['后端开发', '安全实践', '技术写作'],
      achievements: ['多平台技术博主', '技术教程系列化', '粉丝10K+'],
      recentPosts: ['高并发接口设计要点', '服务安全防护清单', '代码审计入门指北']
    }
  },
  {
    id: 16,
    name: '六月暴雪飞梨花',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=liuhua&backgroundColor=FFF2F8',
    introduction: '云原生方向创作者，专注分享工程实践与架构经验，用真实案例帮助开发者成长。',
    followers: '7K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '腾讯云', url: 'https://cloud.tencent.com/developer/user', icon: '☁️' }
    ],
    expandedContent: {
      specialties: ['云原生', '服务治理', 'DevOps'],
      achievements: ['CSDN优质创作者', '腾讯云社区达人', '实战经验输出'],
      recentPosts: ['云原生迁移实战笔记', '微服务链路追踪方案', 'K8s 资源管理实践']
    }
  },
  {
    id: 17,
    name: '是小刘',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=shixiaoliu&backgroundColor=E9F0FF',
    introduction: '全栈方向自媒体人，从真实项目提炼经验，关注开发效率与工程质量。',
    followers: '3.1K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/787689310784280', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['全栈开发', '前端工程化', '技术写作'],
      achievements: ['多平台同步更新', '企业项目经验', '粉丝3K+'],
      recentPosts: ['企业级前端错误监控实践', 'React 项目性能调优 checklist', '服务端渲染入门总结']
    }
  },
  {
    id: 18,
    name: '百里落云',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=baililuoyun&backgroundColor=F1F7ED',
    introduction: '全栈工程师，活跃于掘金、InfoQ 与视频平台，输出工程实践与职业成长思考。',
    followers: '3K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/3843548383296686', icon: '📝' },
      { platform: 'InfoQ', url: 'https://www.infoq.cn/', icon: '📚' },
      { platform: 'B站', url: 'https://space.bilibili.com/', icon: '📺' }
    ],
    expandedContent: {
      specialties: ['全栈开发', '架构设计', '团队协作'],
      achievements: ['InfoQ 作者', '多平台视频创作者', '粉丝3K+'],
      recentPosts: ['全栈项目交付流程拆解', '技术Leader的沟通技巧', '个人品牌搭建指南']
    }
  },
  {
    id: 19,
    name: '黑心萝卜三条杠',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=luobu&backgroundColor=FFF5E9',
    introduction: '持续输出前端实践与项目复盘，擅长用图表和案例讲解复杂问题。',
    followers: '12K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/4394083322176301', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['前端开发', '工程化', '可视化'],
      achievements: ['掘金优秀创作者', '技术活动分享嘉宾', '粉丝12K+'],
      recentPosts: ['前端可观测性最佳实践', 'ECharts 高级应用心得', '复杂前端项目的质量保障']
    }
  },
  {
    id: 20,
    name: 'J',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=authorJ&backgroundColor=EEF2FF',
    introduction: '专注现代 Web 技术的创作者，关注效率工具与开发者成长。',
    followers: '3.1K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1468603264933742', icon: '📝' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['前端开发', '效率工具', '技术写作'],
      achievements: ['多平台内容更新', '社区活动活跃', '粉丝3K+'],
      recentPosts: ['前端脚手架最佳实践', 'Chrome 插件效率提升技巧', '从 0 到 1 搭建知识库']
    }
  },
  {
    id: 21,
    name: '图图',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=tutu&backgroundColor=F8F5FF',
    introduction: '偏爱云开发与小程序生态的工程师，分享最新实战案例与思路。',
    followers: '3K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_57909172', icon: '💻' },
      { platform: '腾讯云', url: 'https://cloud.tencent.com/developer/user', icon: '☁️' }
    ],
    expandedContent: {
      specialties: ['小程序开发', '云开发', '全栈实践'],
      achievements: ['腾讯云云开发布道者', '技术社区活跃', '粉丝3K+'],
      recentPosts: ['小程序云函数性能调优', 'Serverless 入门手册', '多端统一项目落地经验']
    }
  },
  {
    id: 22,
    name: '周帅帅',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=zhoushuaishuai&backgroundColor=EAFBF3',
    introduction: '记录职场和编程的双重成长，分享真实经验与高效学习方式。',
    followers: '2.6K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1011206428562957', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['编程技术', '职场成长', '学习方法'],
      achievements: ['多平台内容输出', '技术成长系列作者', '粉丝2.6K+'],
      recentPosts: ['程序员学习路线规划', '一年精读 12 本技术书体验', '技术人如何做知识管理']
    }
  },
  {
    id: 23,
    name: '奶糖(肥晨)',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=naitang&backgroundColor=FFF3F0',
    introduction: '偏爱分享前端与职场话题的技术自媒体，拥有多篇高赞掘金文章。',
    followers: '44K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1688472903498189', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['前端开发', '职场故事', '效率工具'],
      achievements: ['掘金高赞作者', '粉丝44K+', '多平台同步分享'],
      recentPosts: ['职场沟通的避坑指南', '前端工程师面试复盘', '高效输出的写作框架']
    }
  },
  {
    id: 24,
    name: '程序员海军',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=haijun&backgroundColor=F7FBFF',
    introduction: '新锐技术博主，坚持每日学习打卡，记录真实的编程成长轨迹。',
    followers: '538+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/1239904848713592', icon: '📝' }
    ],
    expandedContent: {
      specialties: ['前端基础', '学习笔记', '算法刷题'],
      achievements: ['掘金日更计划成员', '学习社群活跃', '粉丝快速增长'],
      recentPosts: ['每日算法一题总结', 'Vue3 核心知识点笔记', '程序员成长日常 Vlog']
    }
  },
  {
    id: 25,
    name: '前端图形(Fly)',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=fly&backgroundColor=EEF8FF',
    introduction: '专注前端可视化与 WebGL 的工程师，分享复杂图形的实现心得。',
    followers: '6.0K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/2805609406402798', icon: '📝' },
      { platform: '知乎', url: 'https://www.zhihu.com/', icon: '📚' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['前端可视化', 'WebGL', '三维图形'],
      achievements: ['多平台可视化专栏作者', '分享真实项目经验', '粉丝6K+'],
      recentPosts: ['WebGL 粒子动画实现', 'Three.js 进阶技巧', '数据可视化主题设计']
    }
  },
  {
    id: 26,
    name: '浪里行舟',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=langli&backgroundColor=F1F1FF',
    introduction: '深耕后端与架构的资深工程师，输出高质量的技术沉淀与行业洞察。',
    followers: '47K+',
    socialAccounts: [
      { platform: '掘金', url: 'https://juejin.cn/user/4283353031252967', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['后端架构', '职业规划', '技术写作'],
      achievements: ['掘金年度作者', '后端社群讲师', '粉丝47K+'],
      recentPosts: ['分布式事务设计模式', '中年程序员的逆袭指南', '技术人的认知升级模型']
    }
  },
  {
    id: 27,
    name: '林三心',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=linsanxin&backgroundColor=FFEFF7',
    introduction: '知名前端创作者，擅长以浅显易懂的方式讲解底层原理。',
    followers: '64K+',
    socialAccounts: [
      { platform: '微信公众号:前端之神', url: 'https://mp.weixin.qq.com/', icon: '🌏' },
      { platform: '掘金', url: 'https://juejin.cn/user/129268140737766', icon: '📝' }
    ],
    expandedContent: {
      specialties: ['前端底层原理', '知识体系', '职业成长'],
      achievements: ['公众号前端之神主理人', '掘金头部创作者', '粉丝64K+'],
      recentPosts: ['JavaScript 执行机制全览', 'Vue3 源码阅读笔记', '技术人个人品牌打造']
    }
  },
  {
    id: 28,
    name: '小虚竹',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=zhuxiao&backgroundColor=EFFFF7',
    introduction: '多平台高能作者，聚焦后端与云原生，输出深入浅出的实践文章。',
    followers: '160K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://xiaoxuzhu.blog.csdn.net/', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/3747529825315230', icon: '📝' },
      { platform: '知乎', url: 'https://www.zhihu.com/', icon: '📚' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['云原生', '后端架构', '开源分享'],
      achievements: ['CSDN 星荐作者', '企业内训讲师', '粉丝160K+'],
      recentPosts: ['云原生可观测性体系', '高可用架构设计详解', '工程效能提升实战']
    }
  },
  {
    id: 29,
    name: 'xiaoming',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=xiaoming&backgroundColor=E8F6FF',
    introduction: '关注 AI 与前端交叉领域的创作者，分享实战案例与开源工具体验。',
    followers: '34K+',
    socialAccounts: [
      { platform: 'X(Twitter)', url: 'https://twitter.com/', icon: '🐦' },
      { platform: '掘金', url: 'https://juejin.cn/user/2875978147692910', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['AI 应用', '前端开发', '效率工具'],
      achievements: ['AI 辅助开发布道者', '多平台互动社群', '粉丝34K+'],
      recentPosts: ['AI 赋能前端的 10 个场景', '开源工具推荐清单', '开发者如何玩转 AIGC']
    }
  },
  {
    id: 30,
    name: '代码AI弗森',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=aifusen&backgroundColor=FFF7E8',
    introduction: '专注 AI 代码助手与自动化实践，帮助开发者提升编码效率。',
    followers: '3.5K+',
    socialAccounts: [
      { platform: '微信公众号:前端周看', url: 'https://mp.weixin.qq.com/', icon: '🌏' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/aifs2025', icon: '💻' }
    ],
    expandedContent: {
      specialties: ['AI 辅助开发', '自动化测试', '前端工程化'],
      achievements: ['AI 工具评测系列作者', '技术沙龙讲师', '粉丝3.5K+'],
      recentPosts: ['AI 代码助手横评', '自动化测试流水线搭建', '前端智能化工作流实践']
    }
  },
  {
    id: 31,
    name: 'kingssed',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=kingssed&backgroundColor=F4F1FF',
    introduction: '将技术与商业洞察相结合的内容创作者，擅长故事化表达产品价值。',
    followers: '70K+',
    socialAccounts: [
      { platform: '小红书', url: 'https://www.xiaohongshu.com/', icon: '📘' },
      { platform: '视频号', url: 'https://channels.weixin.qq.com/', icon: '🎬' },
      { platform: '微信公众号:农码开花', url: 'https://mp.weixin.qq.com/', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['技术科普', '商业洞察', '品牌故事'],
      achievements: ['多平台 7 万粉丝', '跨界内容创作者', '线下沙龙主理人'],
      recentPosts: ['从技术到商业的转型经历', '开发者如何讲好作品故事', '技术人个人品牌运营指南']
    }
  },
  {
    id: 32,
    name: '晓雨(是yu欸)',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=xiaoyu&backgroundColor=EAF6FF',
    introduction: '专注云开发与 AI 应用的创作者，也是多个技术社群的组织者。',
    followers: '100K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/WTYuong', icon: '💻' },
      { platform: '微信公众号', url: '-', icon: '🌏' },
      { platform: '腾讯云', url: 'https://cloud.tencent.com/developer/user', icon: '☁️' }
    ],
    expandedContent: {
      specialties: ['云开发', 'AIGC', '社群运营'],
      achievements: ['CSDN 平台优质创作者', '技术社群主理人', '粉丝100K+'],
      recentPosts: ['企业 AIGC 落地实践', '云原生入门系列', '社群运营的经验复盘']
    }
  },
  {
    id: 33,
    name: '木偶',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=muou&backgroundColor=FFF5F5',
    introduction: '坚持原创的资深技术博主，长期深耕后端与数据结构领域。',
    followers: '70K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://strive-forward.blog.csdn.net/', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/299965585059223', icon: '📝' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['后端开发', '数据结构', '系统设计'],
      achievements: ['CSDN 万粉博主', '企业培训讲师', '粉丝70K+'],
      recentPosts: ['数据结构实战系列', '分布式锁全面解析', '从零搭建企业级权限系统']
    }
  },
  {
    id: 34,
    name: '是Dream呀',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=dreamya&backgroundColor=EEFDF4',
    introduction: '专注分享全栈与产品实战的创作者，擅长用故事化语言传递技术价值。',
    followers: '100K+',
    socialAccounts: [
      { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_51390582', icon: '💻' },
      { platform: '掘金', url: 'https://juejin.cn/user/3000787314294461', icon: '📝' },
      { platform: '微信公众号', url: '-', icon: '🌏' }
    ],
    expandedContent: {
      specialties: ['全栈开发', '产品实战', '内容创作'],
      achievements: ['CSDN 百万阅读作者', '技术社群分享嘉宾', '粉丝10W+'],
      recentPosts: ['创业公司技术栈实战', '从需求到上线的实战复盘', '技术人如何搭建产品 MVP']
    }
  },
  {
    id: 35,
    name: '不如摸鱼去',
    avatar: 'https://api.dicebear.com/9.x/identicon/svg?seed=burumoyuqu',
    introduction: '专注前端技术与AI编程知识的分享，多平台创作者，uni-app开源组件库wot-ui作者。',
    followers: '4K+',
    socialAccounts: [
      { platform: '微信公众号:鱼哥聊前端', url: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDAzNzEwNQ==&action=getalbum&album_id=4025495597703643138&scene=126&sessionid=1766160062126#wechat_redirect', icon: '🌏' },
      { platform: 'GitHub', url: 'https://github.com/Moonofweisheng', icon: '🐙' },
      { platform: '掘金', url: 'https://juejin.cn/user/26044011388510', icon: '📝' },
      { platform: 'CSDN', url: 'https://blog.csdn.net/qq_31647491', icon: '💻' },
    ],
    expandedContent: {
      specialties: ['前端开发', 'AI编程分享', '工具分享', '开源分享'],
      achievements: ['GitHub Star 2K+ ', '社群粉丝2K+', 'uni-app插件大赛三等奖'],
      recentPosts: ['TRAE SOLO 正式发布了？我用它将像老乡鸡那样做饭小程序开源了！', 'uni-app 也能远程调试？使用 PageSpy 打开调试的新大门！', 'AI 辅助下的 uni-app 跨端小程序工程化开发实践分享']
    }
  }
]

// 产品工具数据
export const toolsData = [
  {
    id: 1,
    name: '技术写作上下文工程',
    description: '提示词时代结束了，真正的竞争在「谁能为模型构建结构化思维环境」。精密上下文工程让 AI 从「输入-输出」的简单模式，走向「有状态的推理流程」，真正理解技术写作的深层逻辑。',
    icon: '✍️',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    url: 'https://awesome-prompt-seven.vercel.app/tutorials',
    category: '内容创作',
    features: ['结构层：从文本到结构化思维', '信息调度层：分阶段提供上下文', '记忆层：时间连续的创作流程', '增强智能装置：构建高质量上下文环境']
  },
  {
    id: 2,
    name: '代码矿工-工具集',
    description: '收集实用的开发工具，提升开发效率。100% 前端实现，免费开源使用，包含 GIF 搜索、图片压缩、二维码生成、JSON 格式化等实用工具。',
    icon: '⛏️',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    url: 'https://toolkit-hub.pages.dev/',
    category: '开发工具',
    features: ['GIF 搜索下载', '图片压缩处理', '二维码生成', 'JSON 格式化', 'Base64 编解码', '摇色子决定器']
  }
]

// 博主合伙人好处数据
export const partnerBenefits = [
  {
    id: 1,
    icon: '💰',
    title: '增加收入',
    description: '通过推广合作获得额外收入，写作兼职收入蹭蹭提升'
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
