/** 案例与服务一一对应；非推文为交付样张，便于后续替换为脱敏真实素材 */

export const caseServicePaths = {
  tweet: '/tob/services/tweet',
  cpc: '/tob/services/cpc',
  community: '/tob/services/community',
  'ai-access': '/tob/services/ai-access',
  'oversea-cloud': '/tob/services/oversea-cloud',
  'enterprise-cloud': '/tob/services/cloud-cost'
}

export const casesHubItems = [
  {
    slug: 'tweet',
    title: '推文服务',
    emoji: '✍️',
    path: '/cases/tweet',
    servicePath: caseServicePaths.tweet,
    isMock: false,
    badge: '真实呈现',
    blurb: '写文流程、分发协作、数据报告与 GEO 展示的完整推文合作呈现。',
    proofPoints: ['原帖链接回传', '发布数据截图', 'GEO 结果展示'],
    scenario: '冷启动曝光 / 可信测评'
  },
  {
    slug: 'cpc',
    title: '引流服务',
    emoji: '🔗',
    path: '/cases/cpc',
    servicePath: caseServicePaths.cpc,
    isMock: true,
    badge: '复盘模板',
    blurb: 'CPC 投放结构、有效点击认定与结算对账的交付样张。',
    proofPoints: ['UTM 追踪', '有效点击口径', '渠道对账表'],
    scenario: '线索增长 / 可量化点击'
  },
  {
    slug: 'community',
    title: '社群服务',
    emoji: '👥',
    path: '/cases/community',
    servicePath: caseServicePaths.community,
    isMock: true,
    badge: '运营样张',
    blurb: '社群宣发节奏、话题策划与月度复盘看板的交付样张。',
    proofPoints: ['排期表', '活跃观察', '月度复盘'],
    scenario: '私域沉淀 / 长期触达'
  },
  {
    slug: 'ai-access',
    title: 'AI Access',
    emoji: '🤖',
    path: '/cases/ai-access',
    servicePath: caseServicePaths['ai-access'],
    isMock: true,
    badge: '联运模板',
    blurb: '内容站点 + 引导路径 + 成交归因与分佣结算的交付样张。',
    proofPoints: ['内容资产地图', '订单归因', '分佣对账'],
    scenario: '订阅转化 / 高 LTV 联运'
  },
  {
    slug: 'oversea-cloud',
    title: '出海云访问',
    emoji: '🌐',
    path: '/cases/oversea-cloud',
    servicePath: caseServicePaths['oversea-cloud'],
    isMock: true,
    badge: '联运模板',
    blurb: '导航页、访问指引与长尾转化链路的交付样张。',
    proofPoints: ['合规口径', '教程站资产', '长尾转化路径'],
    scenario: '出海工具 / 长期资产'
  },
  {
    slug: 'enterprise-cloud',
    title: '大厂云服务',
    emoji: '☁️',
    path: '/cases/enterprise-cloud',
    servicePath: caseServicePaths['enterprise-cloud'],
    isMock: true,
    badge: '联运模板',
    blurb: '云服务渠道团购模式：按用量返利、阶梯越高返越多，联盟作为云厂商渠道商之一。',
    proofPoints: ['渠道商身份', '按量返利', '阶梯加码'],
    scenario: '云渠道 / 企业采购'
  }
]

export const mockCaseModels = {
  cpc: {
    eyebrow: 'CPC Delivery Sample',
    headline: '引流合作：点击追踪与结算样张',
    intro:
      '以下为 CPC 合作交付样张，用于说明从素材确认、投放执行到点击验收与对账复盘的标准协作方式。正式合作可按保密要求提供脱敏报表与截图。',
    steps: [
      { title: '目标对齐', description: '确认考核事件（点击 / 注册 / 试用）与 UTM、归因窗口。' },
      { title: '素材就位', description: '落地页、监测链接与博主分发物料统一下发。' },
      { title: '矩阵分发', description: '按排期在多平台露出，联盟侧汇总有效曝光入口。' },
      { title: '防作弊抽检', description: '异常流量过滤规则与人工抽检记录。' },
      { title: '结算对账', description: '按有效点击周期出具对账单，品牌确认后结算。' },
      { title: '复盘优化', description: '汇总渠道与素材表现，指导下一轮出价与创意。' }
    ],
    panels: [
      {
        kicker: 'Tracking Board · Sample',
        title: '有效点击验收看板',
        subtitle: '分区展示渠道、计划与博主维度的新增量级。下方数字为样张口径，正式合作以实际追踪数据为准。',
        metrics: [
          { label: '周期有效点击', value: '12.4k' },
          { label: '异常过滤占比', value: '1.8%' },
          { label: '落地页到达率', value: '94%' }
        ]
      },
      {
        kicker: 'Settlement · Sample',
        title: '对账清单结构',
        subtitle: '按日聚合有效点击与应付金额，支持导出与品牌侧复核。',
        lines: [
          '2026-04-01 · Plan-A · 3,120 次 · ¥× 单价',
          '2026-04-02 · Plan-A · 2,890 次 · ¥× 单价',
          '汇总行 · 周期合计 · 待确认后开票结算'
        ]
      }
    ],
    theme: 'amber'
  },
  community: {
    eyebrow: 'Community Delivery Sample',
    headline: '社群合作：宣发与活跃节奏样张',
    intro:
      '以下为社群月度合作交付样张，展示内容排期、话题动作与活跃观测方式。正式合作可替换为真实社群脱敏截图与运营台账。',
    steps: [
      { title: '社群画像', description: '确认群主调性、成员规模与禁忌话题清单。' },
      { title: '排期共创', description: '固定栏目 + 机动通知混合排期，避免硬广刷屏。' },
      { title: '物料适配', description: '长图、短链与 FAQ 统一沉淀在群公告与腾讯文档。' },
      { title: '互动引导', description: '答疑时段、抽奖或打卡等低打扰活跃设计。' },
      { title: '舆情与安全', description: '敏感问题预案与撤回路径，保证品牌安全。' },
      { title: '月度复盘', description: '进群人数、活跃峰值与关键问题汇总输出月报。' }
    ],
    panels: [
      {
        kicker: 'Calendar · Sample',
        title: '月度宣发日历',
        subtitle: '按周拆分主题帖、产品帖与福利帖，支持拖拽调整。',
        metrics: [
          { label: '计划触达人次', value: '≈ 48k' },
          { label: '主动@响应', value: '92%' },
          { label: '月活跃峰值', value: '周三晚' }
        ]
      },
      {
        kicker: 'Health · Sample',
        title: '社群健康度摘要',
        subtitle: 'Spam 拦截、退群率与负面关键词告警的摘要卡片。',
        lines: ['告警 0 条（示例）', '退群率 0.6%（示例）', '精华帖沉淀 6 条']
      }
    ],
    theme: 'emerald'
  },
  'ai-access': {
    eyebrow: 'AI Access Delivery Sample',
    headline: 'AI Access：内容与成交归因样张',
    intro:
      '以下为专题合作交付样张：由联盟维护内容站点 / 仓库触点，流量进入后成交归因到分佣结算。正式交付可接入真实订单与脱敏流水。',
    steps: [
      { title: '专题拆解', description: '明确主打 SKU、优惠码规则与禁止承诺清单。' },
      { title: '资产搭建', description: '导航页、教程沉淀与社群入口互为补充。' },
      { title: '内容与 SEO', description: '长尾词布局与结构化内容，服务自然检索与口碑。' },
      { title: '引导路径', description: '明确从阅读 → 试用 → 付费的 CTA 与跟踪参数。' },
      { title: '归因对账', description: '订单回传、退款剔除与重复单处理规则。' },
      { title: '分成结算', description: '按协议周期结算高提成，附明细与争议处理 SLA。' }
    ],
    panels: [
      {
        kicker: 'Attribution · Sample',
        title: '成交归因摘要',
        subtitle: '按内容来源拆分订单数与分成应付。下方数字为样张口径，正式合作以订单回传数据为准。',
        metrics: [
          { label: '周期成交笔数', value: '186' },
          { label: '可结算订单', value: '172' },
          { label: '平均客单价', value: '¥×××' }
        ]
      },
      {
        kicker: 'Asset Map · Sample',
        title: '触点地图',
        subtitle: '站点页、文档站、社群公告与镜像仓库的跳转关系。',
        lines: ['Hub 页 → 官方注册', '教程文章 → 优惠码落地', '群精华 → 问卷线索']
      }
    ],
    theme: 'violet'
  },
  'oversea-cloud': {
    eyebrow: 'Oversea Cloud Delivery Sample',
    headline: '出海云访问：导航与转化样张',
    intro:
      '以下为出海云访问类合作交付样张：通过导航、测速与常见问题降低决策摩擦，长尾流量沉淀在可更新页面。正式合作可替换为真实品牌脱敏案例。',
    steps: [
      { title: '合规表述', description: '统一对外话术，避免绝对化承诺与敏感表述。' },
      { title: '体验路径', description: '注册、试用与账单说明的分步截图或页面样张。' },
      { title: '导航聚合', description: '多区域入口、备用链路与状态看板集中呈现。' },
      { title: '性能与可用', description: '延迟与稳定性说明放置显眼位置，建立预期。' },
      { title: '转化闭环', description: '优惠 / 试用码与工单入口，减少半路流失。' },
      { title: '持续迭代', description: '根据政策与产品变更更新页面与社群公告。' }
    ],
    panels: [
      {
        kicker: 'Nav · Sample',
        title: '区域导航摘要',
        subtitle: '用户自选区域后，展示推荐方案与风险提示。下方数字为样张口径，正式合作以实际页面数据为准。',
        metrics: [
          { label: '页面 UV（示例）', value: '8.2k' },
          { label: '有效转化估算', value: '3.1%' },
          { label: '跳出率', value: '41%' }
        ]
      },
      {
        kicker: 'FAQ · Sample',
        title: '常见问题结构',
        subtitle: '账单、发票与合规边界的标准问答模块。',
        lines: ['适用人群与限制', '试用与退款口径', '安全与隐私说明']
      }
    ],
    theme: 'sky'
  },
  'enterprise-cloud': {
    eyebrow: 'Cloud Channel Rebate',
    headline: '大厂云服务：渠道团购式返利合作',
    intro:
      '博主联盟是阿里云、腾讯云、华为云、火山引擎等头部云厂商的认证渠道商之一。合作模式类似「云服务团购」：客户通过联盟专属链接在官方充值，用多少消费、拿多少返利；用量越大，可进入更高返利阶梯。',
    statusBadge: '渠道合作',
    steps: [
      { title: '渠道商身份', description: '联盟作为云厂商授权渠道之一，充值仍走官方页面，发票与售后由云厂商提供。' },
      { title: '专属充值链接', description: '顾问按云厂商与账号情况生成官方归因链接，确保消费计入渠道。' },
      { title: '按量返利', description: '实际云消费按渠道政策返还，用多少、拿多少，不做一口价硬广。' },
      { title: '阶梯加码', description: '月/年用量越高，匹配更高返利档位，用得越多、返利比例越高。' },
      { title: '选型与体检', description: '可选多云选型内容与免费账单体检，帮团队控本后再充值。' },
      { title: '透明结算', description: '返利明细、续费跟踪与争议处理 SLA，支持品牌与渠道方对账。' }
    ],
    panels: [
      {
        kicker: 'Rebate Tier',
        title: '返利阶梯示意',
        subtitle: '按实际消费档位匹配返利比例，具体以云厂商当期渠道政策为准。',
        metrics: [
          { label: '基础档', value: '月消费 < ¥5k' },
          { label: '成长档', value: '月消费 ¥5k–50k' },
          { label: '战略档', value: '月消费 > ¥50k' }
        ]
      },
      {
        kicker: 'Channel Partner',
        title: '团购式渠道合作',
        subtitle: '强调「联盟是渠道商之一 + 按量返利 + 阶梯越高返越多」，而非一次性曝光交付。',
        lines: [
          '博主联盟 = 云服务渠道商（非云厂商本身）',
          '客户官方充值 → 消费归因 → 按量返利',
          '用量越大 → 更高返利阶梯 → 长期续费仍计渠道',
          '内容获客 + 专属链接 + 返利结算 = 完整闭环'
        ]
      }
    ],
    theme: 'emerald'
  }
}
