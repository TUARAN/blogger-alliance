/**
 * 联盟工作台命名约定：
 * - 分区：公开板块 / 内部板块 / 管理板块
 * - 卡片 title：功能名（2–6 字）
 * - 卡片 tag：功能类型（四字短语）
 * - 入口：站内「进入」、外链「打开」；权限由路由守卫与目标页处理
 */

export const WORKSPACE_CTA = {
  enter: '进入',
  open: '打开'
}

export const WORKSPACE_SECTIONS = [
  {
    id: 'public',
    title: '公开板块',
    description: '联盟对外内容、知识资源与外部协作工具。',
    modules: [
      {
        id: 'services',
        title: '服务介绍',
        description: '推文、引流、社群与 AI Access 等推广服务概览。',
        tag: '品牌合作',
        icon: '🔥',
        to: '/tob/services',
        theme: {
          shadow: 'shadow-emerald-100/40',
          icon: 'bg-emerald-100',
          tag: 'bg-emerald-50 text-emerald-700',
          cta: 'text-emerald-700'
        }
      },
      {
        id: 'cases',
        title: '合作案例',
        description: '已整理的合作案例、服务样例与交付展示。',
        tag: '案例展示',
        icon: '📌',
        to: '/cases',
        theme: {
          shadow: 'shadow-amber-100/40',
          icon: 'bg-amber-100',
          tag: 'bg-amber-50 text-amber-700',
          cta: 'text-amber-700'
        }
      },
      {
        id: 'academy',
        title: '联盟学院',
        description: '学习资料、工具资源与知识沉淀。',
        tag: '知识学习',
        icon: '📚',
        to: { path: '/academy', query: { tab: 'knowledge' } },
        theme: {
          shadow: 'shadow-blue-100/40',
          icon: 'bg-blue-100',
          tag: 'bg-blue-50 text-blue-700',
          cta: 'text-blue-700'
        }
      },
      {
        id: 'changelog',
        title: '更新日志',
        description: '按版本与周维度回看工作台、服务页、案例与数据底座演进。',
        tag: '产品动态',
        icon: '📝',
        to: '/workspace/changelog',
        theme: {
          shadow: 'shadow-slate-100/40',
          icon: 'bg-slate-100',
          tag: 'bg-slate-100 text-slate-700',
          cta: 'text-slate-700'
        }
      },
      {
        id: 'syncblog',
        title: '同步分发',
        description: 'syncblog.cn 多平台内容同步与分发，配合台账录入独立报告。',
        tag: '外部工具',
        icon: '🔄',
        external: true,
        href: 'https://syncblog.cn',
        theme: {
          shadow: 'shadow-violet-100/40',
          icon: 'bg-violet-100',
          tag: 'bg-violet-50 text-violet-700',
          cta: 'text-violet-700'
        }
      }
    ]
  },
  {
    id: 'internal',
    title: '内部板块',
    description: '合作进度、数据报告与年度总览。',
    modules: [
      {
        id: 'ledger',
        title: '数据台账',
        description: '合作进度、数据报告与年度总览统一维护入口。',
        tag: '数据管理',
        icon: '🗂️',
        to: '/tob/internal',
        theme: {
          shadow: 'shadow-indigo-100/40',
          icon: 'bg-indigo-100',
          tag: 'bg-indigo-50 text-indigo-700',
          cta: 'text-indigo-700'
        }
      }
    ]
  },
  {
    id: 'admin',
    title: '管理板块',
    description: '推广素材与内容飞轮工具。',
    modules: [
      {
        id: 'cloud-promo',
        title: '云服务自推广',
        description: '阿里云落地页素材、模版、选题与内容飞轮中控台。',
        tag: '推广素材',
        icon: '☁️',
        to: '/workspace/cloud-promo',
        theme: {
          shadow: 'shadow-orange-100/40',
          icon: 'bg-orange-100',
          tag: 'bg-orange-50 text-orange-700',
          cta: 'text-orange-700'
        }
      }
    ]
  }
]

export const PUBLIC_MODULE_TITLES = WORKSPACE_SECTIONS[0].modules.map((item) => item.title)
export const INTERNAL_MODULE_TITLES = WORKSPACE_SECTIONS[1].modules.map((item) => item.title)
