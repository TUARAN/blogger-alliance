/**
 * Alliance 数据模型定义（JSDoc）
 * @typedef {Object} PlatformStats
 * @property {string} platform
 * @property {number} followers
 * @property {number} reads
 * @property {number} posts
 * @property {number} likes
 * @property {number} dailyFollowers
 * @property {number} dailyReads
 * @property {string} link
 *
 * @typedef {Object} MatrixAccount
 * @property {string} id
 * @property {string} name
 * @property {string} handle
 * @property {PlatformStats[]} platforms
 * @property {{ followers: number, reads: number, posts: number, likes: number }} subtotal
 *
 * @typedef {Object} AllianceProfile
 * @property {string[]} forBloggers
 * @property {string[]} forBrands
 * @property {Array<{ stage: string, summary: string, goal: string, strategy: string, challenge: string, opportunity: string, writingPlan: string }>} operationPlans
 * @property {Array<{ group: string, items: Array<{ name: string, url: string }> }>} monetizationPlatforms
 *
 * @typedef {Object} Blogger
 * @property {string} id
 * @property {string} name
 * @property {string} brandName
 * @property {string} updatedAt
 * @property {{ matrixAccountCount: number, activePlatformCount: number, totalFollowers: number, totalReads: number, totalPosts: number, totalLikes: number }} overview
 * @property {MatrixAccount[]} accounts
 * @property {AllianceProfile} allianceProfile
 */

/** @type {Blogger[]} */
export const matrixAllianceBloggers = [
  {
    id: 'tuaran',
    name: 'TUARAN',
    brandName: '博主联盟',
    updatedAt: '2026-01-20',
    overview: {
      matrixAccountCount: 5,
      activePlatformCount: 8,
      totalFollowers: 30129,
      totalReads: 3985016,
      totalPosts: 1545,
      totalLikes: 112645
    },
    accounts: [
      {
        id: 'anthony',
        name: '掘金安东尼',
        handle: 'anthony',
        domains: ['编程创作'],
        platforms: [
          {
            platform: 'CSDN',
            followers: 535,
            reads: 71725,
            posts: 124,
            likes: 2675,
            dailyFollowers: 5,
            dailyReads: 2061,
            link: 'https://blog.csdn.net/Anthony1453?spm=1000.2115.3001.5343'
          },
          {
            platform: '掘金',
            followers: 13000,
            reads: 2188696,
            posts: 536,
            likes: 65000,
            dailyFollowers: 4,
            dailyReads: 1486,
            link: 'https://juejin.cn/user/1521379823340792'
          },
          {
            platform: '头条',
            followers: 692,
            reads: 120346,
            posts: 65,
            likes: 3460,
            dailyFollowers: 40,
            dailyReads: 0,
            link: 'https://www.toutiao.com/c/user/token/CiytHKMTSTLr9UjjPapQfQgP0Qtz-mo_r7SZ-9a-vjhHMpxe4Zf0NZ5nXMww0BpJCjwAAAAAAAAAAAAATzLFgylPHFsiAK3qyEAfRlTqWH9UNxHBykjYOQGlKESnc18eU1QTS8cwMB6HSurHYfYQvfn1DRjDxYPqBCIBA2ciM6E=/?source=list&log_from=d3cb457759bbb_1751732899254'
          },
          {
            platform: '微博',
            followers: 400,
            reads: 6000,
            posts: 20,
            likes: 2000,
            dailyFollowers: 5,
            dailyReads: 0,
            link: 'https://weibo.com/'
          }
        ],
        subtotal: {
          followers: 14627,
          reads: 2386767,
          posts: 745,
          likes: 73135
        }
      },
      {
        id: 'code-ai-frosen',
        name: '安东尼与AI',
        handle: 'code-ai-frosen',
        domains: ['AI大模型'],
        platforms: [
          {
            platform: 'CSDN',
            followers: 1200,
            reads: 78249,
            posts: 92,
            likes: 6000,
            dailyFollowers: 8,
            dailyReads: 0,
            link: 'https://blog.csdn.net/aifs2025'
          },
          {
            platform: '51CTO',
            followers: 276,
            reads: 160000,
            posts: 218,
            likes: 1380,
            dailyFollowers: 2,
            dailyReads: 0,
            link: 'https://blog.51cto.com/u_13961087'
          }
        ],
        subtotal: {
          followers: 1476,
          reads: 238249,
          posts: 310,
          likes: 7380
        }
      },
      {
        id: 'thirty-cube',
        name: '三十而立方',
        handle: 'thirty-cube',
        domains: ['社会洞察'],
        platforms: [
          {
            platform: '知乎',
            followers: 350,
            reads: 350000,
            posts: 180,
            likes: 1750,
            dailyFollowers: 15,
            dailyReads: 0,
            link: 'https://www.zhihu.com/'
          }
        ],
        subtotal: {
          followers: 350,
          reads: 350000,
          posts: 180,
          likes: 1750
        }
      },
      {
        id: 'frontend-weekly',
        name: '前端周看',
        handle: 'frontend-weekly',
        domains: ['前端周刊'],
        platforms: [
          {
            platform: '公众号',
            followers: 2676,
            reads: 10000,
            posts: 10,
            likes: 13380,
            dailyFollowers: 20,
            dailyReads: 0,
            link: 'https://mp.weixin.qq.com/s/anthony_wechat'
          }
        ],
        subtotal: {
          followers: 2676,
          reads: 10000,
          posts: 10,
          likes: 13380
        }
      },
      {
        id: 'anthony404',
        name: '安东尼404',
        handle: 'anthony404',
        domains: ['科技资讯'],
        platforms: [
          {
            platform: '小红书',
            followers: 11000,
            reads: 1000000,
            posts: 300,
            likes: 17000,
            dailyFollowers: 30,
            dailyReads: 0,
            link: 'https://xhslink.com/m/A9YGT5oW76h'
          }
        ],
        subtotal: {
          followers: 11000,
          reads: 1000000,
          posts: 300,
          likes: 17000
        }
      }
    ],
    allianceProfile: {
      forBloggers: [
        '号召一线技术博主开矩阵号，统一记录运营数据与增长轨迹。',
        '支持已有矩阵号博主持续沉淀账号资产，形成可复用的方法论。'
      ],
      forBrands: [
        '品牌方可直接查看账号层平台覆盖、活跃度和增长势能。',
        '辅助品牌更快完成合作对象筛选、投放策略匹配与风险判断。'
      ],
      operationPlans: [
        {
          stage: '阶段一：矩阵基建完善',
          summary: '完成 8 平台统一指标口径，建立账号日报与周报节奏。',
          goal: '把平台数据记录覆盖率提升到 100%。',
          strategy: '按账号设置主阵地平台 + 次分发平台，固定复盘模板。',
          challenge: '平台统计口径不统一，跨平台手工汇总成本高。',
          opportunity: '通过统一指标标准，形成面向品牌的“可对比”数据资产。',
          writingPlan: '每周 3 篇主内容、2 篇分发内容，确保主平台稳定更新。'
        },
        {
          stage: '阶段二：品牌协作加速',
          summary: '围绕联盟重点方向，建立品牌沟通与展示模板。',
          goal: '提升品牌合作决策效率与沟通成功率。',
          strategy: '按行业拆分案例包，输出“账号能力画像 + 历史数据表现”。',
          challenge: '不同品牌关注指标差异大，沟通成本容易增加。',
          opportunity: '矩阵化能力让品牌可以按账号粒度灵活组合投放。',
          writingPlan: '每月输出 1 份主题案例复盘与 1 份平台增长报告。'
        }
      ],
      monetizationPlatforms: [
        {
          group: '技术内容平台',
          items: [
            { name: '掘金创作', url: 'https://juejin.cn/' },
            { name: 'CSDN 创作中心', url: 'https://blog.csdn.net/' },
            { name: '51CTO 博客', url: 'https://blog.51cto.com/' },
            { name: '知乎创作中心', url: 'https://www.zhihu.com/' }
          ]
        },
        {
          group: '社媒与私域平台',
          items: [
            { name: '公众号', url: 'https://mp.weixin.qq.com/' },
            { name: '头条号', url: 'https://www.toutiao.com/' },
            { name: '微博', url: 'https://weibo.com/' },
            { name: '小红书', url: 'https://www.xiaohongshu.com/' }
          ]
        }
      ]
    }
  }
]

export const matrixAllianceBloggerMap = matrixAllianceBloggers.reduce((acc, blogger) => {
  acc[blogger.id] = blogger
  return acc
}, {})
