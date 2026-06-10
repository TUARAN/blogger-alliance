<script setup>
const releases = [
  {
    version: 'v0.1.0',
    period: '2025-06-19',
    title: '项目启动',
    summary: '完成 Vue 3 + Tailwind 基础工程、静态部署配置与 README 项目愿景说明。',
    commits: ['05dab57 init', '404f1fb static base', '249f82 README']
  },
  {
    version: 'v0.2.0',
    period: '2025-07-02 至 2025-07-10',
    title: '联盟名录与贡献流程成型',
    summary: '更新品牌为开发者博主联盟，完善首页统计、PV/UV 展示、Fork + PR 加入流程，并重构数据文件结构。',
    commits: ['8cf781d brand', '8f9224a analytics', '978c07b workflow', 'c97d521 data']
  },
  {
    version: 'v0.3.0',
    period: '2025-07-18 至 2025-09-03',
    title: '博主生态扩容',
    summary: '持续接入新博主与社交资料，修正头像和平台链接，补充 TOB 页面伙伴、统计与群体数据说明。',
    commits: ['bd5b9cc blogger', '38b00cf Alex', 'c3c1cf3 TOB', '2dc4eee blogger']
  },
  {
    version: 'v0.4.0',
    period: '2025-11-07 至 2025-12-31',
    title: '品牌、学院与统计体系刷新',
    summary: '扩展博主名单和 KOL/KOC 标识，重构导航与联盟学院，接入 Busuanzi 统计并优化二维码和统计卡片体验。',
    commits: ['a36d845 roster', '93d0a57 academy', 'b686170 stats', 'dbeeeb6 brand']
  },
  {
    version: 'v0.5.0',
    period: '2026-01-13 至 2026-02-28',
    title: '服务商业化页面完善',
    summary: '上线表格视图、筛选与排序，新增 TOB 服务子页面、CPC 详情、合作流程、受众定位与花名册下载。',
    commits: ['8e7441a table', '4c0c445 services', 'c773a1e copy', '654e914 roster']
  },
  {
    version: 'v0.6.0',
    period: '2026-03-09 至 2026-03-27',
    title: '商单、矩阵、案例与报告闭环',
    summary: '新增合作进度页、凭证解密、矩阵联盟模块、Why Us、案例页、GEO 文案、加密推广报告和年度报告入口。',
    commits: ['97ca696 deals', 'f98c6c1 matrix', 'dad1064 cases', '4985352 annual']
  },
  {
    version: 'v0.7.0',
    period: '2026-04-02 至 2026-04-29',
    title: '工作台智能化与数据底座',
    summary: '加入工作台 WebGPU LLM、完善知识库与生成流程，完成 D1 迁移、管理页、健康检查和访问锁定策略。',
    commits: ['c7e139f WebLLM', '55e0241 D1', 'f6c1f68 admin', '894a39c lockout']
  },
  {
    version: 'v0.8.0',
    period: '2026-05-06 至 2026-05-29',
    title: '后台化、报告分享与首页改版',
    summary:
      '同步 WebLLM 视觉，抽取 AppNav 与服务组件，增强专项服务和分类案例，上线安全报告分享、商单 owner、Excel 导入、移动端交互，并将合作品牌轮播拆分为独立页面后接入后台入口。',
    commits: ['e3ff76c WebLLM', '2b11eda cases', '5beb46c sharing', '0be662c ledger', '7957550 carousel page']
  },
  {
    version: 'v0.9.0',
    period: '2026-06-02 至 2026-06-10',
    title: 'Supabase 账号体系与角色权限',
    summary:
      '上线注册/登录/账号中心，以 Supabase 角色（普通成员、内部成员、管理员）替代内部访问凭证；Worker API 改为 JWT 鉴权，优化权限与邮箱验证引导，正式站点 https://blogger-alliance.cn/。',
    commits: ['supabase auth', 'role guard', 'worker jwt', 'auth copy']
  },
  {
    version: 'v0.10.0',
    period: '2026-06-10',
    title: '工作台板块整理与数据架构说明',
    summary:
      '工作台拆为公开板块与内部板块，统一功能命名并新增 SyncBlog 同步分发入口；明确 Supabase 与 D1 分工——Supabase 负责账号与角色鉴权，D1 仍是商单、数据报告、年度总览等业务数据的唯一存储，Worker 验 JWT 后读写 D1，短期内仍需保留双库。',
    commits: ['c9001d1 workspace', 'workspace registry', 'auth nav fix']
  },
  {
    version: 'v0.11.0',
    period: '2026-06-10',
    title: '导航高亮收敛、云自推广中控台升级与账号服务网络检测',
    summary:
      '顶部导航子页前缀高亮、移除 workspaceActive 死代码，并把 /tob 统一重定向到 /；路由权限改为 meta.requires 单一来源。云自推广中控台：planned 内容收进「路线图」标签页，选题预览稿、CTA 片段与文案片段全部可编辑后再复制，新增全平台 UTM 一键 TSV 导出与已发布文章扫描占位，模版切换与预览稿联动，并为管理员页面注入 robots noindex。账号体系新增主动网络探测：登录/注册页加载时检测 supabase.co 可达性，注册/登录/重发邮件接口统一捕获 Failed to fetch 类异常并给出中文代理排障提示。更新日志时间线倒序展示。',
    commits: [
      'AppNav prefix active',
      'route meta guards',
      'cloud-promo editable',
      'cloud-promo utm tsv',
      'cloud-promo published scan',
      'auth network probe',
      'changelog reverse'
    ]
  }
]

const weeklyProgress = [
  {
    week: '2025 W25',
    period: '06-16 至 06-22',
    focus: '项目启动与静态部署打底',
    highlights: ['初始化 Vue3 + Tailwind 工程并完成静态部署基线。', '补齐 README 愿景说明，建立项目定位与协作方向。'],
    commits: ['05dab57 init', '404f1fb static base', '249f82c README']
  },
  {
    week: '2025 W27',
    period: '06-30 至 07-06',
    focus: '品牌切换、统计与贡献流程落地',
    highlights: ['品牌统一为开发者博主联盟，首页统计与 PV/UV 能力上线。', '明确 Fork + PR 加入流程，首页和 TOC 文案同步重构。'],
    commits: ['8cf781d brand', '8f9224a analytics', '978c07b workflow', 'cc92877 stats']
  },
  {
    week: '2025 W28',
    period: '07-07 至 07-13',
    focus: '数据结构重构与名录持续补充',
    highlights: ['新增博主内容并继续合并社区贡献。', '完成数据文件与项目结构重构，降低后续维护成本。'],
    commits: ['2f49a98 blogger', 'ce13c50 contents', 'c97d521 data refactor']
  },
  {
    week: '2025 W29',
    period: '07-14 至 07-20',
    focus: '生态扩容启动',
    highlights: ['新增博主并开启 v0.3.x 的持续扩容节奏。'],
    commits: ['bd5b9cc blogger']
  },
  {
    week: '2025 W30',
    period: '07-21 至 07-27',
    focus: '社区新增与合并协作',
    highlights: ['继续接入博主并合并社区 PR，扩容流程稳定化。'],
    commits: ['0c40396 blogger', '58ad7cd merge']
  },
  {
    week: '2025 W31',
    period: '07-28 至 08-03',
    focus: '资料与展示信息补齐',
    highlights: ['README 展示信息补充，继续新增并修正博主头像资料。'],
    commits: ['eb0ee36 blogger', 'ecbcae4 README', 'cf98cb9 avatar']
  },
  {
    week: '2025 W32',
    period: '08-04 至 08-10',
    focus: '名录质量修复',
    highlights: ['集中修复语法/构建问题，更新多位博主信息与头像。'],
    commits: ['38b00cf Alex', 'e5d61fa fix build', 'd7b9caa Alex avatar']
  },
  {
    week: '2025 W33',
    period: '08-11 至 08-17',
    focus: 'TOB 页面信息增强',
    highlights: ['完善 TOB 合作伙伴、群体数据说明与浮窗体验。'],
    commits: ['c3c1cf3 TOB', 'd19d5a6 TOB tip']
  },
  {
    week: '2025 W36',
    period: '09-01 至 09-07',
    focus: '生态扩容收口',
    highlights: ['补充新博主条目，完成 v0.3.x 阶段收尾。'],
    commits: ['2dc4eee blogger']
  },
  {
    week: '2025 W45',
    period: '11-03 至 11-09',
    focus: '品牌与名录体系刷新',
    highlights: ['刷新统计和品牌展示，扩展名录并引入 KOL/KOC 标识。'],
    commits: ['82adcd0 stats', 'a36d845 roster', 'ca46967 badges']
  },
  {
    week: '2025 W46',
    period: '11-10 至 11-16',
    focus: '首页内容微调',
    highlights: ['调整首页内容组织，承接品牌刷新后的展示风格。'],
    commits: ['145d6e6 index']
  },
  {
    week: '2025 W48',
    period: '11-24 至 11-30',
    focus: '导航与学院重构',
    highlights: ['完成导航与联盟学院重构，学院内容转向真实工具和知识资源。', '品牌命名口径回收统一。'],
    commits: ['93d0a57 academy', '55dabab academy content', '7ef26a3 brand']
  },
  {
    week: '2025 W49',
    period: '12-01 至 12-07',
    focus: '首页统计交互优化',
    highlights: ['优化首页加载与统计卡片，提升二维码交互体验。'],
    commits: ['e0e476c perf', 'e2a00db stats card', 'd93b151 qrcode']
  },
  {
    week: '2025 W50',
    period: '12-08 至 12-14',
    focus: 'PV/UV 统计体系接入',
    highlights: ['接入 Busuanzi 统计，为首页提供统一 PV/UV 数据来源。'],
    commits: ['b686170 busuanzi']
  },
  {
    week: '2025 W51',
    period: '12-15 至 12-21',
    focus: '名录持续更新',
    highlights: ['新增博主并保持社区贡献节奏。'],
    commits: ['b60c766 blogger']
  },
  {
    week: '2025 W52',
    period: '12-22 至 12-28',
    focus: '年底扩容补充',
    highlights: ['继续新增博主条目，补强名录广度。'],
    commits: ['8192c0d blogger']
  },
  {
    week: '2025 W53',
    period: '12-29 至 01-04',
    focus: '年度收尾清理',
    highlights: ['品牌文案刷新并清理统计口径，为新年阶段迭代打底。'],
    commits: ['dbeeeb6 brand cleanup']
  },
  {
    week: '2026 W03',
    period: '01-12 至 01-18',
    focus: '服务页表格化',
    highlights: ['上线表格视图、筛选和排序，服务展示进入结构化阶段。'],
    commits: ['8e7441a table', '9332e22 docs']
  },
  {
    week: '2026 W04',
    period: '01-19 至 01-25',
    focus: '博主信息修正',
    highlights: ['修正博主资料与链接，完善“更多数据”及展示文案。'],
    commits: ['9b72703 info', '67efbea more data', 'c0bcfc8 copy']
  },
  {
    week: '2026 W06',
    period: '02-02 至 02-08',
    focus: 'TOB 子页面扩展',
    highlights: ['新增 TOB 服务子页面与 CPC 详情，服务结构进一步拆分。'],
    commits: ['4c0c445 services']
  },
  {
    week: '2026 W07',
    period: '02-09 至 02-15',
    focus: '服务展示细节优化',
    highlights: ['优化博主卡片头像与名称布局，提升服务页一致性。'],
    commits: ['ff66d41 layout', 'c773a1e copy']
  },
  {
    week: '2026 W09',
    period: '02-23 至 03-01',
    focus: '商业化口径统一',
    highlights: ['统一受众定位、结算与报告流程，并补充花名册下载。'],
    commits: ['f186f61 audience', '654e914 roster download']
  },
  {
    week: '2026 W11',
    period: '03-09 至 03-15',
    focus: '商单与矩阵能力集中上线',
    highlights: ['上线合作进度页与凭证解密流程，商单链路可控。', '接入矩阵联盟模块与 Why Us 页面，首页入口同步更新。'],
    commits: ['97ca696 deals', '8e3f88e decrypt', 'f98c6c1 matrix', 'e33ef5f why-us']
  },
  {
    week: '2026 W12',
    period: '03-16 至 03-22',
    focus: '案例与报告闭环建立',
    highlights: ['新增案例页、GEO 文案与加密推广报告流程。', '优化工作台与服务页布局，形成“案例-报告-服务”闭环。'],
    commits: ['70edb35 reports', 'dad1064 cases', 'f5b07cc GEO', 'a85535f workspace']
  },
  {
    week: '2026 W13',
    period: '03-23 至 03-29',
    focus: '年度报告入口补齐',
    highlights: ['更新加密商单与报告数据，补上年度报告模块入口。'],
    commits: ['f221fce data', '4985352 annual']
  },
  {
    week: '2026 W14',
    period: '03-30 至 04-05',
    focus: 'WebLLM 首次上线',
    highlights: ['工作台 WebGPU LLM 上线并完善知识库、生成流程与容错。'],
    commits: ['c7e139f WebLLM', 'a1c2d7a kb', 'daeb2ed flow fix', '9f4922a chat fix']
  },
  {
    week: '2026 W15',
    period: '04-06 至 04-12',
    focus: '加密链路与运行配置修复',
    highlights: ['完善 TOB 报告与加密载荷体验，并修复 WebLLM 运行配置。'],
    commits: ['dbaa5de tob', 'a616058 coep', '501a640 deps']
  },
  {
    week: '2026 W16',
    period: '04-13 至 04-19',
    focus: 'D1 迁移落地',
    highlights: ['完成 D1 迁移文档与实施收尾，新增 D1 管理页和健康检查。'],
    commits: ['55e0241 D1', 'f6c1f68 admin']
  },
  {
    week: '2026 W17',
    period: '04-20 至 04-26',
    focus: '内部访问安全加固',
    highlights: ['移除前端加密流程并增加访问锁定策略，收敛内部页安全边界。'],
    commits: ['3fa6496 remove frontend encrypt', '894a39c lockout']
  },
  {
    week: '2026 W18',
    period: '04-27 至 05-03',
    focus: '后台入口与结构整理',
    highlights: ['修复 Cloudflare worker 配置，调整内部页并合并矩阵入口到学院。'],
    commits: ['fb34966 worker fix', 'f4be231 internal', 'e7ef403 matrix entry']
  },
  {
    week: '2026 W19',
    period: '05-04 至 05-10',
    focus: '后台化改造启动',
    highlights: ['年报访问增加凭证保护，同步 WebLLM 视觉并新增后台入口。', '抽取 AppNav、清理死路由并推进服务页组件化拆分。'],
    commits: ['b05cb1c annual auth', 'e3ff76c WebLLM sync', 'cb3d50f AppNav', '5f5e10c split services']
  },
  {
    week: '2026 W20',
    period: '05-11 至 05-17',
    focus: '服务与案例信息架构升级',
    highlights: ['独立 /matrix 路由并优化后台入口卡片顺序。', '抽取服务总览组件，统一首页与服务页报价呈现。', '按类案例与服务专项页增强，导航与统计联动更新。'],
    commits: ['2f78c1b matrix route', 'c21d84e service overview', '2b11eda cases by category', '2159bad nav rename']
  },
  {
    week: '2026 W21',
    period: '05-18 至 05-24',
    focus: '报告分享能力上线',
    highlights: ['精简工作台导航并补充闭环报告抓取案例。', '上线安全报告分享页，支持更稳定的外部展示路径。'],
    commits: ['48e2030 nav', '809a307 showcase', '5beb46c sharing']
  },
  {
    week: '2026 W22',
    period: '05-25 至 05-31',
    focus: '后台经营能力与移动端交互增强',
    highlights: ['新增商单 owner、Excel 导入与进度状态简化，运营流程后台化。', '移动端交互优化，补齐 GEO 报告证据与分享动作。', '合作品牌轮播先上线，再单独拆页并接入后台入口。'],
    commits: ['0be662c ledger', 'c02551e mobile', '435b0c1 GEO evidence', '5583c98 share action', '7957550 carousel page']
  },
  {
    week: '2026 W23',
    period: '06-01 至 06-07',
    focus: '里程碑可视化沉淀',
    highlights: ['新增工作台更新日志，开始将版本演进结构化沉淀为长期资产。'],
    commits: ['0a801bb changelog']
  },
  {
    week: '2026 W24',
    period: '06-08 至 06-14',
    focus: '账号体系、工作台与数据架构',
    highlights: [
      '接入 Supabase 注册/登录/账号中心，正式站点统一为 https://blogger-alliance.cn/。',
      '内部数据访问改为角色权限控制，移除导航栏机器人入口与旧凭证解锁流程。',
      '注册邮箱验证、权限不足、登录失败等提示语全面中文化。',
      '工作台拆为公开/内部板块，统一命名并新增 SyncBlog 同步分发入口。',
      '明确 Supabase（账号/角色）与 D1（商单/报告/年度总览）分工：鉴权走 Supabase，业务数据仍存 D1，短期需保留双库。',
      'AppNav 顶部按 matchPrefix 高亮子页（/tob/services/*、/cases/*、/workspace/* 全程激活），删除未生效的 workspaceActive prop；/tob 统一重定向到 /，logo 默认指向 /。',
      '路由权限收敛为 meta.requires=auth/internal/admin 单一来源，废弃 AUTH_REQUIRED_PREFIXES 等三处前缀表。',
      '云自推广中控台：所有 planned 项目收进新增的「路线图」标签页，首屏只保留可执行操作。',
      '云自推广：选题预览稿 / CTA 片段 / 文案片段全部可编辑，复制前可直接微调，配「重置」按钮恢复模版渲染结果。',
      '云自推广：新增「全平台 UTM」一键 TSV 表格（juejin/csdn/zhihu/wechat/weibo/moment），可直接喂给 metrics:collect。',
      '云自推广：扫描 content/aliyun/published/**/meta.json 渲染已发布文章列表，空目录下展示登记模版。',
      '云自推广：模版侧栏切换后预览稿按新模版重新渲染，方便同选题对比不同呈现。',
      '云自推广：管理员页面挂载时注入 <meta name="robots" content="noindex,nofollow">。',
      '账号服务网络检测：登录/注册页主动探测 supabase.co 可达性，不通时给出代理/网络层面的中文排障提示；签到、注册、重发邮件接口统一捕获 Failed to fetch 类异常并替换为可读文案。',
      '更新日志时间线倒序展示，最新版本和当周条目置顶。'
    ],
    commits: ['supabase auth', 'role guard', 'c9001d1 workspace', 'nav prefix active', 'route meta guards', 'cloud-promo refactor', 'auth network probe', 'changelog reverse']
  }
]

const releaseMap = Object.fromEntries(releases.map((item) => [item.version, item]))
const weeklyMap = Object.fromEntries(weeklyProgress.map((item) => [item.week, item]))

const timelineOrder = [
  { type: 'minor', key: '2025 W25' },
  { type: 'major', key: 'v0.1.0' },
  { type: 'minor', key: '2025 W27' },
  { type: 'minor', key: '2025 W28' },
  { type: 'major', key: 'v0.2.0' },
  { type: 'minor', key: '2025 W29' },
  { type: 'minor', key: '2025 W30' },
  { type: 'minor', key: '2025 W31' },
  { type: 'minor', key: '2025 W32' },
  { type: 'minor', key: '2025 W33' },
  { type: 'minor', key: '2025 W36' },
  { type: 'major', key: 'v0.3.0' },
  { type: 'minor', key: '2025 W45' },
  { type: 'minor', key: '2025 W46' },
  { type: 'minor', key: '2025 W48' },
  { type: 'minor', key: '2025 W49' },
  { type: 'minor', key: '2025 W50' },
  { type: 'minor', key: '2025 W51' },
  { type: 'minor', key: '2025 W52' },
  { type: 'minor', key: '2025 W53' },
  { type: 'major', key: 'v0.4.0' },
  { type: 'minor', key: '2026 W03' },
  { type: 'minor', key: '2026 W04' },
  { type: 'minor', key: '2026 W06' },
  { type: 'minor', key: '2026 W07' },
  { type: 'minor', key: '2026 W09' },
  { type: 'major', key: 'v0.5.0' },
  { type: 'minor', key: '2026 W11' },
  { type: 'minor', key: '2026 W12' },
  { type: 'minor', key: '2026 W13' },
  { type: 'major', key: 'v0.6.0' },
  { type: 'minor', key: '2026 W14' },
  { type: 'minor', key: '2026 W15' },
  { type: 'minor', key: '2026 W16' },
  { type: 'minor', key: '2026 W17' },
  { type: 'minor', key: '2026 W18' },
  { type: 'major', key: 'v0.7.0' },
  { type: 'minor', key: '2026 W19' },
  { type: 'minor', key: '2026 W20' },
  { type: 'minor', key: '2026 W21' },
  { type: 'minor', key: '2026 W22' },
  { type: 'major', key: 'v0.8.0' },
  { type: 'minor', key: '2026 W23' },
  { type: 'minor', key: '2026 W24' },
  { type: 'major', key: 'v0.9.0' },
  { type: 'major', key: 'v0.10.0' },
  { type: 'major', key: 'v0.11.0' }
]

// 时间线倒序展示：最新的版本 / 周条目放最前面
const timelineItems = timelineOrder
  .slice()
  .reverse()
  .map((item) => {
    if (item.type === 'major') {
      const release = releaseMap[item.key]
      return release
        ? {
            type: 'major',
            marker: release.version,
            period: release.period,
            title: release.title,
            summary: release.summary,
            commits: release.commits
          }
        : null
    }

    const week = weeklyMap[item.key]
    return week
      ? {
          type: 'minor',
          marker: week.week,
          period: week.period,
          title: week.focus,
          highlights: week.highlights,
          commits: week.commits
        }
      : null
  })
  .filter(Boolean)
</script>

<template>
  <section class="mt-12 sm:mt-16" aria-labelledby="workspace-changelog-title">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Git changelog</p>
        <h2 id="workspace-changelog-title" class="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
          更新日志
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          基于 git 提交历史，将大版本里程碑与周进度统一到一条时间线，记录联盟工作台、服务页、案例、报告与数据底座的关键演进。
        </p>
      </div>
      <div class="rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
        最近同步：2026-06-10 · 站点 https://blogger-alliance.cn/
      </div>
    </div>

    <ol class="mt-8 space-y-4">
      <li
        v-for="item in timelineItems"
        :key="`${item.type}-${item.marker}`"
        class="relative rounded-lg border border-white/80 bg-white/90 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
      >
        <div class="grid gap-4 lg:grid-cols-[12rem_1fr] lg:gap-6">
          <div>
            <div
              class="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold"
              :class="item.type === 'major' ? 'bg-slate-950 text-white' : 'bg-indigo-100 text-indigo-700'"
            >
              {{ item.marker }}
            </div>
            <p class="mt-3 text-sm font-medium text-slate-500">{{ item.period }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-950">{{ item.title }}</h3>
            <p v-if="item.type === 'major'" class="mt-2 text-sm leading-6 text-slate-600">{{ item.summary }}</p>
            <ul v-else class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
              <li v-for="point in item.highlights" :key="point">{{ point }}</li>
            </ul>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="commit in item.commits"
                :key="commit"
                class="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600"
              >
                {{ commit }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>
