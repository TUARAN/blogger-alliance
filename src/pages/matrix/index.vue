<script setup>
const flowSteps = [
  {
    stage: '01',
    title: '需求承接',
    description: '品牌、产品或项目把增长目标提交进任务池，明确预算、周期、目标用户、交付标准和可复用素材。'
  },
  {
    stage: '02',
    title: '任务拆分',
    description: '把一条模糊需求拆成选题、脚本、文章、短内容、分发计划和数据指标，降低个人参与门槛。'
  },
  {
    stage: '03',
    title: '内容生产',
    description: '创作者按模板和部件库协作生产内容，AI 辅助完成草稿、改写、校对和平台适配。'
  },
  {
    stage: '04',
    title: '矩阵分发',
    description: '博主账号、垂类账号、社群和多平台渠道共同放大内容，让一套内容产生多次触达机会。'
  },
  {
    stage: '05',
    title: '闭环复盘',
    description: '曝光、互动、线索、搜索占位和 AI 问答可见度回流到项目，持续优化下一轮生产。'
  },
  {
    stage: '06',
    title: '收益结算',
    description: '参与者按任务交付、内容复用、分发贡献和结果表现获得透明分成，形成可持续共创。'
  }
]

const roleCards = [
  {
    role: '品牌方',
    title: '把增长需求变成可执行任务',
    detail: '不只买一篇推文，而是发布一个可被拆解、生产、分发和复盘的内容项目。'
  },
  {
    role: '任务拆解者',
    title: '把目标拆成可认领工单',
    detail: '负责理解产品、定义选题、分配内容形态，让更多人能参与其中。'
  },
  {
    role: '内容生产者',
    title: '提供文章、脚本和素材部件',
    detail: '即使没有大号，也能通过写作、改写、素材整理和模板化生产创造价值。'
  },
  {
    role: '分发放大者',
    title: '使用账号资产放大内容',
    detail: '延续博主联盟的核心能力，把内容发布到技术圈、社群和多平台矩阵。'
  },
  {
    role: '数据复盘者',
    title: '追踪效果并改进下一轮',
    detail: '分析平台表现、搜索占位、线索反馈和内容复用价值，让协作不是一次性投放。'
  },
  {
    role: '系统中枢',
    title: '沉淀规则、资产和结算',
    detail: '维护任务标准、资产目录、权限、风控和结算记录，保证协作可以长期运行。'
  }
]

const modules = [
  {
    name: '任务市场',
    description: '承接品牌需求、发布任务、申领任务，是协作链路的入口。'
  },
  {
    name: '内容工厂',
    description: '沉淀模板、部件、草稿和 AI 辅助流程，把创作从个人经验变成可复制能力。'
  },
  {
    name: '分发中心',
    description: '管理多平台、多账号和发布时间，让一套内容获得多次收益机会。'
  },
  {
    name: '数据分析',
    description: '追踪曝光、互动、线索和内容表现，形成品牌与创作者都能看的复盘。'
  },
  {
    name: '结算中心',
    description: '围绕任务费用、复用收益、分发贡献和对账记录建立透明结算。'
  },
  {
    name: '联盟中枢',
    description: '统一管理创作者档案、账号资产、内容资产、信用和协作关系。'
  },
  {
    name: '品牌合作',
    description: '把现有 AI 产品推广能力升级为完整的内容共创方案。'
  },
  {
    name: '创作工坊',
    description: '用于共学、互助、起号、选题训练和内容能力成长。'
  },
  {
    name: '增长引擎',
    description: '支撑投流监控、复用追踪、平台适配和长期可见度沉淀。'
  }
]

const comparisons = [
  {
    label: '服务对象',
    blogger: 'AI / 科技品牌与技术博主',
    matrix: '品牌方、创作者、分发者、数据和运营参与者'
  },
  {
    label: '核心动作',
    blogger: '由 KOL 完成可信推广和开发者触达',
    matrix: '把需求拆成多人可参与的内容生产与分发流程'
  },
  {
    label: '价值来源',
    blogger: '账号影响力、技术内容理解和渠道关系',
    matrix: '任务拆解、内容部件、账号矩阵、数据闭环和复用收益'
  },
  {
    label: '最终形态',
    blogger: '技术博主增长服务',
    matrix: '人人可参与、贡献可计量、共创可盈利的内容操作系统'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900">
    <AppNav />

    <main>
      <section class="border-b border-slate-200 bg-slate-950 text-white">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100">
              <span class="h-2 w-2 rounded-full bg-amber-300"></span>
              矩阵联盟 · 建设中
            </div>
            <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              从博主推广，
              <span class="block text-cyan-200">升级为全民内容共创系统</span>
            </h1>
            <p class="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              博主联盟已经证明：AI 产品需要可信的开发者传播。矩阵联盟要继续往前走，把需求承接、任务拆分、内容生产、矩阵分发、数据闭环和收益结算连成一条开放链路，让不只有大号的人也能参与内容价值创造。
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link
                to="/matrix/earn"
                class="inline-flex min-h-11 items-center rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-200"
              >
                大学生/兼职参与入口
              </router-link>
              <a
                href="#workflow"
                class="inline-flex min-h-11 items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-50"
              >
                查看共创流程
              </a>
              <a
                href="#modules"
                class="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                迁移模块总览
              </a>
            </div>
          </div>

          <div class="rounded-xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
            <div class="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div class="text-sm text-slate-400">Upgrade Path</div>
                <h2 class="mt-1 text-2xl font-semibold">Blogger Alliance → Matrix Alliance</h2>
              </div>
              <span class="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950">内测筹备</span>
            </div>
            <div class="mt-5 space-y-4">
              <div class="rounded-lg border border-white/10 bg-slate-900/80 p-4">
                <div class="text-sm font-semibold text-cyan-200">现在</div>
                <p class="mt-2 text-sm leading-6 text-slate-300">
                  由技术博主承接 AI 产品推广，提供测评、推文、社群、GEO 和开发者触达。
                </p>
              </div>
              <div class="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4">
                <div class="text-sm font-semibold text-cyan-100">下一步</div>
                <p class="mt-2 text-sm leading-6 text-slate-200">
                  把推广任务拆成更多可参与工序：懂产品的人拆需求，会写的人做内容，有账号的人分发，会数据的人复盘。
                </p>
              </div>
              <div class="rounded-lg border border-emerald-300/30 bg-emerald-300/10 p-4">
                <div class="text-sm font-semibold text-emerald-100">目标</div>
                <p class="mt-2 text-sm leading-6 text-slate-200">
                  每一次贡献都能沉淀为内容资产、账号资产和结算凭证，让共创可以长期盈利。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-b border-slate-200 bg-amber-50">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <router-link
            to="/matrix/earn"
            class="group grid gap-6 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <div class="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                新入口 · 校园共创计划
              </div>
              <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                大学生、自由职业者、想兼职赚点饭钱的人，可以从这里参与
              </h2>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                不一定要有粉丝，也不一定一上来就写长文。资料整理、选题拆分、初稿、改写、分发协助、数据记录，都可以成为可计量的内容贡献。
              </p>
            </div>
            <div class="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors group-hover:bg-slate-800">
              查看怎么参与 →
            </div>
          </router-link>
        </div>
      </section>

      <section class="border-b border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div class="grid gap-5 md:grid-cols-4">
            <div
              v-for="item in comparisons"
              :key="item.label"
              class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div class="text-sm font-semibold text-slate-500">{{ item.label }}</div>
              <div class="mt-4 text-sm leading-6 text-slate-600">
                <div class="font-medium text-slate-900">博主联盟</div>
                <p class="mt-1">{{ item.blogger }}</p>
              </div>
              <div class="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
                <div class="font-medium text-cyan-700">矩阵联盟</div>
                <p class="mt-1">{{ item.matrix }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" class="scroll-mt-24 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="max-w-3xl">
            <div class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">Content OS Workflow</div>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">把内容创作与分发拆成可协作流水线</h2>
            <p class="mt-4 text-base leading-7 text-slate-600">
              matrix-alliance 的核心不是再做一个广告页，而是把“一个博主接一个单”的模式拆解为多人协作、资产沉淀、数据回流和收益分配。
            </p>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="step in flowSteps"
              :key="step.stage"
              class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div class="flex items-center gap-3">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                  {{ step.stage }}
                </span>
                <h3 class="text-lg font-semibold text-slate-950">{{ step.title }}</h3>
              </div>
              <p class="mt-4 text-sm leading-7 text-slate-600">{{ step.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-y border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Open Roles</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">所有人都能找到可贡献的位置</h2>
              <p class="mt-4 text-base leading-7 text-slate-600">
                过去，只有拥有粉丝和账号的人能直接参与推广。升级后，内容理解、任务拆解、写作、改写、素材整理、账号分发、数据复盘都可以成为贡献。
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <article
                v-for="card in roleCards"
                :key="card.role"
                class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div class="text-sm font-semibold text-emerald-700">{{ card.role }}</div>
                <h3 class="mt-2 text-lg font-semibold text-slate-950">{{ card.title }}</h3>
                <p class="mt-3 text-sm leading-6 text-slate-600">{{ card.detail }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" class="scroll-mt-24 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div class="max-w-3xl">
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">Matrix Modules</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">matrix-alliance 内容迁移为九个建设模块</h2>
              <p class="mt-4 text-base leading-7 text-slate-600">
                这些模块来自 matrix-alliance 的现有产品骨架，当前先作为建设中能力露出；后续再逐步接入真实任务、资产、数据和结算。
              </p>
            </div>
            <span class="inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
              功能建设中，暂不开放真实提现或任务交易
            </span>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="module in modules"
              :key="module.name"
              class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 class="text-lg font-semibold text-slate-950">{{ module.name }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ module.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-slate-950 text-white">
        <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div class="text-sm font-semibold text-cyan-200">建设原则</div>
              <h2 class="mt-3 text-3xl font-bold tracking-tight">先把协作链路跑通，再开放真实交易</h2>
              <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                矩阵联盟会复用博主联盟已有的品牌合作、内容服务和履约经验，但不会直接暴露未完成的钱包、提现和任务交易能力。当前页面用于说明方向、聚合入口和收集共创参与者。
              </p>
            </div>
            <router-link
              to="/tob/services"
              class="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-50"
            >
              先查看现有服务
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
