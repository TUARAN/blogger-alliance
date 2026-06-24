<script setup>
import qrcodeImage from '../../img/qrcode1.jpg'

const taskTypes = [
  {
    title: '资料整理',
    time: '20-40 分钟',
    reward: '¥10-30 / 份',
    description: '把产品官网、文档、案例和竞品信息整理成可读材料，帮助后续创作者快速理解。'
  },
  {
    title: '选题拆分',
    time: '30-60 分钟',
    reward: '¥20-60 / 组',
    description: '把一个推广需求拆成标题、角度、提纲、短内容脚本或平台版本。'
  },
  {
    title: '内容初稿',
    time: '60-120 分钟',
    reward: '¥80-300 / 篇',
    description: '根据模板写文章初稿、产品体验笔记、教程草稿或社群发布文案。'
  },
  {
    title: '平台改写',
    time: '30-90 分钟',
    reward: '¥30-120 / 版',
    description: '把一份内容改成适合公众号、知乎、掘金、小红书、X 等平台的版本。'
  },
  {
    title: '分发协助',
    time: '10-30 分钟',
    reward: '¥5-30 / 次',
    description: '协助发布、排期、评论区维护、社群同步和链接记录。'
  },
  {
    title: '数据记录',
    time: '15-30 分钟',
    reward: '¥5-20 / 条',
    description: '记录曝光、互动、收录、线索和截图，让项目能复盘、能结算。'
  }
]

const participationModels = [
  {
    title: '入门微任务',
    range: '¥5-60',
    suitable: '第一次参与、碎片时间、想熟悉流程',
    examples: '数据记录、社群同步、简单标题改写、链接整理'
  },
  {
    title: '标准交付任务',
    range: '¥60-500',
    suitable: '能按模板稳定交付，有基础写作或产品理解',
    examples: '资料包、选题包、文章初稿、平台改写、产品体验笔记'
  },
  {
    title: '项目协作任务',
    range: '¥300-1500+',
    suitable: '能负责一组内容或一个小项目的连续交付',
    examples: '整包内容生产、分发排期、复盘报告、专题协作'
  }
]

const researchModels = [
  {
    title: '开源 Bounty 模型',
    takeaway: '每个任务先写清楚问题、交付物、赏金和验收口径，完成并被确认后结算。'
  },
  {
    title: '社区贡献模型',
    takeaway: '不只认可“写完整文章”，资料、测试、设计、运营、文档和答疑都算贡献。'
  },
  {
    title: '赞助/基金模型',
    takeaway: '长期稳定贡献者可以进入更高阶任务池，获得持续任务、项目奖金或复用分成。'
  },
  {
    title: '报销/审核模型',
    takeaway: '金额、用途和状态可记录；敏感支付信息不公开，由管理员审核后处理。'
  }
]

const priceMatrix = [
  {
    level: 'L1',
    title: '记录与整理',
    range: '¥5-30',
    examples: '数据记录、截图归档、发布链接整理、评论区摘录'
  },
  {
    level: 'L2',
    title: '资料与调研',
    range: '¥20-80',
    examples: '产品资料包、竞品对比、功能亮点整理、用户问题收集'
  },
  {
    level: 'L3',
    title: '选题与脚本',
    range: '¥30-150',
    examples: '标题组、提纲、短视频脚本、社群话术、平台角度拆分'
  },
  {
    level: 'L4',
    title: '内容生产',
    range: '¥80-500',
    examples: '文章初稿、教程草稿、产品体验笔记、深度改写'
  },
  {
    level: 'L5',
    title: '分发与运营',
    range: '¥5-80 + 表现加成',
    examples: '平台发布、社群同步、评论维护、内容排期、效果记录'
  },
  {
    level: 'L6',
    title: '项目协作',
    range: '¥300-1500+',
    examples: '专题内容包、整组分发计划、复盘报告、持续协作项目'
  }
]

const settlementRules = [
  {
    title: '任务卡定价',
    description: '每个任务先标明范围、交付物、截止时间、验收标准和预算，避免只靠聊天记录。'
  },
  {
    title: '验收后记录',
    description: '交付通过后记录贡献类型、采用情况和应结金额；内测期先人工登记，后续接任务市场。'
  },
  {
    title: '复用收益',
    description: '同一内容被改写、分发或复用到更多平台时，原始贡献者可以参与二次收益分配。'
  },
  {
    title: '升级任务池',
    description: '稳定交付、少返工、表现好的参与者，会优先进入标准任务和项目协作任务池。'
  }
]

const taskCardFields = [
  '任务目标',
  '交付格式',
  '参考价',
  '验收标准',
  '截止时间',
  '复用规则'
]

const steps = [
  {
    index: '01',
    title: '加入候选池',
    description: '留下你的擅长方向、可投入时间和过往样例。没有作品也可以先从整理类任务开始。'
  },
  {
    index: '02',
    title: '领取小任务',
    description: '从资料整理、选题拆分、初稿、改写、分发、数据记录里选择适合自己的任务。'
  },
  {
    index: '03',
    title: '按模板交付',
    description: '每类任务都会有格式、验收标准和参考样例，减少来回沟通。'
  },
  {
    index: '04',
    title: '复盘与结算',
    description: '任务验收后记录贡献；正式结算能力上线前，先以人工登记和内测名单为准。'
  }
]

const principles = [
  '不需要你有大号，写作、整理、改写、记录都可以参与。',
  '不做刷单、搬运号、虚假互动和灰色流量。',
  '不承诺固定收益，具体收益取决于任务难度、验收质量和项目预算。',
  '优先适合想练内容能力、想接触 AI 产品、想用碎片时间赚点饭钱的人。'
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <AppNav />

    <main>
      <section class="relative overflow-hidden border-b border-white/10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.22),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(251,191,36,0.18),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]"></div>
        <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <router-link
              to="/matrix"
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/15"
            >
              <span aria-hidden="true">←</span>
              返回矩阵联盟
            </router-link>
            <div class="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              校园共创计划 · 内测招募中
            </div>
            <h1 class="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              想用碎片时间
              <span class="block text-amber-200">赚点饭钱？</span>
            </h1>
            <p class="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              矩阵联盟正在把 AI 产品推广拆成很多小任务：整理资料、拆选题、写初稿、改平台版本、协助分发、记录数据。你不一定要有粉丝，也不一定要很会写，从一个小任务开始就能参与内容共创。
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a
                href="#tasks"
                class="inline-flex min-h-11 items-center rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-200"
              >
                看看能做什么
              </a>
              <a
                href="#join"
                class="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                申请加入候选池
              </a>
            </div>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur">
            <div class="rounded-xl bg-slate-950/80 p-5">
              <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div class="text-sm text-slate-400">Task Board Preview</div>
                  <h2 class="mt-1 text-2xl font-semibold">一份需求，可以拆成很多小任务</h2>
                </div>
                <span class="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-slate-950">建设中</span>
              </div>
              <div class="mt-5 space-y-3">
                <div class="rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold text-emerald-100">资料整理</span>
                    <span class="text-xs text-slate-300">20-40 min</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-slate-300">整理产品官网、文档、竞品和亮点。</p>
                </div>
                <div class="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold text-cyan-100">内容初稿</span>
                    <span class="text-xs text-slate-300">60-120 min</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-slate-300">按模板写出第一版文章或短内容。</p>
                </div>
                <div class="rounded-lg border border-amber-300/25 bg-amber-300/10 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold text-amber-100">数据记录</span>
                    <span class="text-xs text-slate-300">15-30 min</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-slate-300">记录发布链接、截图、曝光和互动。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tasks" class="scroll-mt-24 bg-white text-slate-950">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="max-w-3xl">
            <div class="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">What You Can Do</div>
            <h2 class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">不用一上来就写长文，先从小任务开始</h2>
            <p class="mt-4 text-base leading-7 text-slate-600">
              这些任务会围绕真实 AI 产品、开发者工具、云服务和内容增长项目展开。越能稳定交付，后续越容易接到更完整的任务。
            </p>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="task in taskTypes"
              :key="task.title"
              class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-lg font-semibold text-slate-950">{{ task.title }}</h3>
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{{ task.time }}</span>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ task.description }}</p>
              <div class="mt-5 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {{ task.reward }}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200 bg-amber-50 text-slate-950">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Reward Model</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">内测任务与结算模型 v0.1</h2>
              <p class="mt-4 text-base leading-7 text-slate-700">
                参考开源 bounty、社区贡献、赞助基金和费用审核几类成熟机制，我们先用“任务卡 + 验收 + 贡献记录”的轻量模型跑内测。
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <article
                v-for="model in participationModels"
                :key="model.title"
                class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm"
              >
                <div class="text-sm font-semibold text-amber-700">{{ model.title }}</div>
                <div class="mt-3 text-3xl font-bold text-slate-950">{{ model.range }}</div>
                <p class="mt-3 text-sm leading-6 text-slate-600">{{ model.suitable }}</p>
                <div class="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                  {{ model.examples }}
                </div>
              </article>
            </div>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="model in researchModels"
              :key="model.title"
              class="rounded-xl border border-amber-200 bg-white p-5 shadow-sm"
            >
              <h3 class="font-semibold text-slate-950">{{ model.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-slate-600">{{ model.takeaway }}</p>
            </article>
          </div>

          <div class="mt-10 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 class="text-2xl font-bold text-slate-950">任务价格参考表</h3>
                <p class="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  价格按任务复杂度、可复用程度和验收要求浮动。正式领取前会在任务卡里写清楚，不用猜。
                </p>
              </div>
              <span class="inline-flex w-fit rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-900">
                参考区间，非固定承诺
              </span>
            </div>

            <div class="mt-6 overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead>
                  <tr class="text-xs uppercase tracking-[0.16em] text-slate-500">
                    <th class="px-3 py-3 font-semibold">等级</th>
                    <th class="px-3 py-3 font-semibold">任务类型</th>
                    <th class="px-3 py-3 font-semibold">参考范围</th>
                    <th class="px-3 py-3 font-semibold">示例</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="item in priceMatrix" :key="item.level">
                    <td class="px-3 py-4 font-mono font-semibold text-amber-700">{{ item.level }}</td>
                    <td class="px-3 py-4 font-semibold text-slate-950">{{ item.title }}</td>
                    <td class="px-3 py-4 font-semibold text-emerald-700">{{ item.range }}</td>
                    <td class="px-3 py-4 leading-6 text-slate-600">{{ item.examples }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-10 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 class="text-2xl font-bold text-slate-950">钱从哪里来，怎么分</h3>
                <p class="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  矩阵联盟不是让大家无偿投稿，而是把品牌预算拆成可验收的小贡献。钱来自品牌项目预算、内容复用预算和项目表现奖金。
                </p>
              </div>
              <span class="inline-flex w-fit rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white">
                内测模型 · 建设中
              </span>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="field in taskCardFields"
                :key="field"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                任务卡包含：{{ field }}
              </span>
            </div>

            <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <article
                v-for="rule in settlementRules"
                :key="rule.title"
                class="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <h4 class="font-semibold text-slate-950">{{ rule.title }}</h4>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ rule.description }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200 bg-slate-50 text-slate-950">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">How It Works</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">参与流程尽量轻，不搞复杂后台</h2>
              <p class="mt-4 text-base leading-7 text-slate-600">
                现在还在建设中，所以先用候选池和小任务跑通流程。等任务市场、验收和结算中心稳定后，再逐步开放自助领取。
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <article
                v-for="step in steps"
                :key="step.index"
                class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">{{ step.index }}</div>
                <h3 class="mt-4 text-lg font-semibold text-slate-950">{{ step.title }}</h3>
                <p class="mt-3 text-sm leading-6 text-slate-600">{{ step.description }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white text-slate-950">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Before You Join</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">适合认真做内容的人，不适合想走捷径的人</h2>
              <div class="mt-8 grid gap-3">
                <div
                  v-for="item in principles"
                  :key="item"
                  class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  {{ item }}
                </div>
              </div>
            </div>

            <aside id="join" class="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
              <div class="text-sm font-semibold text-emerald-200">加入方式</div>
              <h2 class="mt-2 text-2xl font-bold">先加微信，备注“矩阵兼职”</h2>
              <p class="mt-3 text-sm leading-7 text-slate-300">
                目前是内测候选池，会先按可投入时间、擅长方向和任务匹配度邀请参与。后续任务市场上线后，会开放更标准的领取和结算流程。
              </p>
              <div class="mt-5 rounded-xl bg-white p-3">
                <img
                  :src="qrcodeImage"
                  alt="微信二维码"
                  class="w-full rounded-lg object-contain"
                />
              </div>
              <div class="mt-4 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                备注格式建议：矩阵兼职 + 学校/职业 + 每周可投入时间 + 擅长方向。
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
