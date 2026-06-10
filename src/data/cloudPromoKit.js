export const CLOUD_PROMO_CONTACT = {
  wechat: 'atar24',
  landingPath: '/cloudcost',
  landingOrigin: 'https://blogger-alliance.cn',
  servicePath: '/tob/services/cloud-cost',
  syncblogStats: 'https://syncblog.cn/stats'
}

export const CLOUD_PROMO_PITCH =
  '博主联盟是阿里云认证渠道。想团购或便宜买阿里云，全程用你自己的账号，在官网充值，享受渠道价与按量返利。'

export const CLOUD_PROMO_SELL_POINTS = [
  {
    title: '全场阿里云平台',
    desc: 'ECS、RDS、OSS、CDN、GPU / AI 等主流产品均可咨询。'
  },
  {
    title: '全程自己的账号',
    desc: '官方发票与售后，不是代充，也不是共享账号。'
  },
  {
    title: '用多少返多少',
    desc: '按量返利，用量越大阶梯越高；账单贵还可免费帮看。'
  }
]

export const CLOUD_PROMO_GROUP_BUY_STEPS = [
  '每人用自己的阿里云账号（没有可先注册）',
  '加微信说明人数、大概月消费、用途（建站 / AI / 企业等）',
  '为每人生成专属官方充值链接',
  '各自在阿里云官网下单，返利按账号单独结算'
]

export const CLOUD_PROMO_FAQS = [
  {
    q: '为什么不能直接在一个页面付款？',
    a: '优惠要绑在你的云账号上。先联系顾问生成专属链接，再用链接去官网充值或购买，优惠才会生效。'
  },
  {
    q: '和自己去官网买有什么区别？',
    a: '买的还是同一家云、同样的服务，发票和售后也找官方。区别是联盟作为渠道商，能提供官方渠道价、按量返利与账单建议。'
  },
  {
    q: '个人开发者 / 学生能用吗？',
    a: '可以。建站、side project、小团队创业都适用，用量不大也可以先问清楚。'
  },
  {
    q: '帮看账单真的免费吗？',
    a: '是的，不收费。你看完建议自己决定要不要调整，没有强制消费。'
  }
]

export const CLOUD_PROMO_COPY_SNIPPETS = [
  {
    id: 'title-ecs-renew',
    label: '标题 · 续费向',
    text: '个人开发者上阿里云，怎么买比官网更划算'
  },
  {
    id: 'title-group-buy',
    label: '标题 · 团购向',
    text: '小团队团购阿里云，全程自己的账号怎么操作'
  },
  {
    id: 'opening-blog',
    label: '开篇 · 技术博客',
    text: '很多开发者已经有阿里云账号，续费或新购时习惯直接去官网。其实认证渠道同样走官方账号与官网下单，还能拿到按量返利——全程是你自己的号，不是代充。'
  },
  {
    id: 'cta-long',
    label: '文末 CTA · 长文',
    text: '想团购或便宜买阿里云？全程用你自己的账号，在官网充值享渠道返利。\n👉 填表咨询：{{landing_url}}\n或微信：atar24'
  },
  {
    id: 'moment',
    label: '朋友圈',
    text: '阿里云续费/新购可以先问我拿官方渠道链接，自己的账号、官网下单，用多少返多少。微信 atar24'
  },
  {
    id: 'compliance',
    label: '合规提醒（对内）',
    text: '不写「全网最低」；不写代充、共享账号；统一口径：认证渠道 + 官方链接 + 用户自有账号。'
  }
]

export const CLOUD_PROMO_TEMPLATE_META = {
  'long-form-guide': {
    label: '长文指南',
    desc: '痛点 → 渠道价值 → 三步流程 → FAQ → CTA，适合掘金 / CSDN 主稿。'
  },
  'listicle-tips': {
    label: '清单技巧',
    desc: '条目式建议，适合账单优化、选型类短文。'
  },
  'faq-compilation': {
    label: 'FAQ 汇编',
    desc: '问答体，适合社群转发与 SyncBlog 短文。'
  },
  'short-wechat': {
    label: '朋友圈短文案',
    desc: '80–150 字，口语化。'
  },
  'moment-short': {
    label: '技术群短文案',
    desc: '约 100 字 + 链接。'
  }
}

export const CLOUD_PROMO_STATUS_LABELS = {
  draft: '待写',
  review: '待审',
  scheduled: '已排期',
  published: '已发布'
}

export const CLOUD_PROMO_PIPELINE_STEPS = [
  {
    step: 1,
    title: '选题入队',
    desc: '编辑 content/aliyun/topics.queue.json，或在中控台查看选题池。',
    status: 'ready'
  },
  {
    step: 2,
    title: 'AI + 模版生成',
    desc: '用 prompts/ 与 templates/ 生成草稿，产出到 content/aliyun/published/（待接 GitHub Action）。',
    status: 'planned'
  },
  {
    step: 3,
    title: 'PR 审稿',
    desc: '人工 merge 前检查合规口径与 CTA。',
    status: 'planned'
  },
  {
    step: 4,
    title: 'SyncBlog 分发',
    desc: '主稿同步至多平台，记录各平台链接。',
    status: 'planned'
  },
  {
    step: 5,
    title: 'metrics 采集',
    desc: 'npm run metrics:collect 批量采集互动数据（脚本待接 published meta）。',
    status: 'planned'
  }
]

export function buildLandingUrl({
  origin = CLOUD_PROMO_CONTACT.landingOrigin,
  path = CLOUD_PROMO_CONTACT.landingPath,
  utmSource = 'blog',
  utmMedium = 'article',
  utmCampaign = ''
} = {}) {
  const url = new URL(path, origin)
  url.searchParams.set('utm_source', utmSource)
  url.searchParams.set('utm_medium', utmMedium)
  if (utmCampaign) {
    url.searchParams.set('utm_campaign', utmCampaign)
  }
  return url.toString()
}

export function fillCloudPromoTemplate(template, variables) {
  return Object.entries(variables).reduce(
    (text, [key, value]) => text.replaceAll(`{{${key}}}`, String(value ?? '')),
    template
  )
}

export function buildTopicVariables(topic, utmSource = 'juejin') {
  const landingUrl = buildLandingUrl({
    utmSource,
    utmMedium: 'article',
    utmCampaign: topic.id
  })

  return {
    topic_id: topic.id,
    topic_title: topic.title,
    topic_angle: topic.angle,
    keywords: Array.isArray(topic.keywords) ? topic.keywords.join('、') : topic.keywords,
    template_name: topic.template,
    landing_url: landingUrl,
    utm_campaign: topic.id,
    wechat: CLOUD_PROMO_CONTACT.wechat,
    author_name: '博主联盟'
  }
}
