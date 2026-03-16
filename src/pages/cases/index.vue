<script setup>
import { ref } from 'vue'
import annualDashboardImage from '../../img/example/wechat_2026-03-16_104619_761.png'
import annualCloudImage from '../../img/example/wechat_2026-03-16_104632_010.png'
import reportExplanationImage from '../../img/example/wechat_2026-03-16_113829_555.png'
import distributionFormImage from '../../img/example/image.png'
import geoShowcaseImage from '../../img/example/微信图片_2026-03-16_145503_945.png'

const activeTab = ref('tweet')

const caseTabs = [
  { key: 'tweet', label: '推文案例', icon: '✍️' },
  { key: 'overview', label: '25年总览', icon: '📊' }
]

const partnerBrands = [
  '秒哒',
  'FinClip',
  '亚马逊云科技',
  '火山引擎',
  '明基',
  '秦托邦'
]

const summaryCards = [
  { label: '合作品牌', value: '8+', accent: 'from-indigo-500 to-blue-500' },
  { label: '累计投放', value: '376 篇', accent: 'from-fuchsia-500 to-violet-500' },
  { label: '覆盖平台', value: '11+', accent: 'from-emerald-500 to-cyan-500' },
  { label: '社群辐射', value: '20+', accent: 'from-amber-500 to-orange-500' }
]

const advantages = [
  {
    title: '技术出身',
    description: '博主和运营团队都理解技术产品的表达方式，能快速把产品亮点翻译成开发者听得懂的内容。',
    icon: '🧠'
  },
  {
    title: '快速响应',
    description: '需求确认后即可同步选题、排期和协作节点，尽量减少品牌侧的沟通成本和等待时间。',
    icon: '⚡'
  },
  {
    title: '矩阵辐射',
    description: '同一轮合作可以覆盖技术社区、内容平台、公众号和社群，实现多触点扩散。',
    icon: '🕸️'
  },
  {
    title: '社区文化',
    description: '长期深耕开发者社区，更清楚哪些表达能建立信任，哪些话题真正能触发讨论。',
    icon: '🏘️'
  },
  {
    title: '社群文化',
    description: '内容发布之外还能联动社群问答、二次扩散和用户沉淀，帮助品牌延长传播周期。',
    icon: '🤝'
  }
]

const writingFlow = [
  {
    title: '发布需求',
    description: '品牌方提交合作背景、传播目标、核心卖点和基础素材，明确本轮合作方向。'
  },
  {
    title: '博主承接',
    description: '根据项目调性与受众匹配合适博主，确认承接人选、排期与执行方式。'
  },
  {
    title: '写文审核',
    description: '博主完成内容初稿后，由品牌与联盟共同审核，保证信息准确、表达自然。'
  },
  {
    title: '分发活跃',
    description: '按分发表单统一推进发布与活跃动作，同步跟踪链接、平台和执行状态。'
  },
  {
    title: '数据报告',
    description: '整理阅读、互动、平台表现与关键反馈，输出结构化报告供品牌复盘查看。'
  },
  {
    title: '结算沉淀',
    description: '完成对账与结算，并将优质内容继续沉淀为长期可复用的传播与 GEO 资产。'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-gray-900">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center min-w-0">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap">
            <router-link
              to="/tob"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🏠</span>
              <span>回到首页</span>
            </router-link>

            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>合作查询</span>
            </router-link>

            <router-link
              to="/matrix"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧩</span>
              <span>矩阵看板</span>
            </router-link>

            <router-link
              to="/academy"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">📚</span>
              <span>联盟学院</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8 md:space-y-10">

      <section class="rounded-2xl border border-indigo-100 bg-white/90 p-2 shadow-sm backdrop-blur-sm">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in caseTabs"
            :key="tab.key"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
            :class="activeTab === tab.key
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'"
            @click="activeTab = tab.key"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </section>

      <template v-if="activeTab === 'overview'">
      <section class="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-[0.24em] text-indigo-200">2025 年合作情况</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold">年度合作分发与传播画像</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-slate-300">
            2025 年，我们与 <span class="font-semibold text-white">{{ partnerBrands.join('、') }}</span> 等品牌完成合作，围绕技术内容分发、平台种草、社群扩散和数据复盘，持续帮助品牌建立开发者认知。
          </p>
          <p class="mt-3 text-sm md:text-base leading-7 text-slate-300">
            这一年里，我们的内容主要分发在掘金、CSDN、知乎、公众号、头条、博客园、腾讯云开发者社区等平台，并通过社群和矩阵号持续放大传播声量。
          </p>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="card in summaryCards"
            :key="card.label"
            class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm"
          >
            <div class="inline-flex rounded-xl bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white" :class="card.accent">
              {{ card.label }}
            </div>
            <div class="mt-4 text-3xl font-bold text-white">{{ card.value }}</div>
          </article>
        </div>

        <div class="mt-6 grid gap-5 xl:grid-cols-2">
          <article class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <div class="border-b border-white/10 px-5 py-4">
              <h3 class="text-lg font-semibold">数据看板</h3>
              <p class="mt-1 text-sm text-slate-300">全年累计投放、平台分布与内容数量概览</p>
            </div>
            <img :src="annualDashboardImage" alt="2025 合作数据看板" class="w-full object-cover" />
          </article>

          <article class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <div class="border-b border-white/10 px-5 py-4">
              <h3 class="text-lg font-semibold">品牌与博主词云</h3>
              <p class="mt-1 text-sm text-slate-300">品牌方与开发者博主合作网络的可视化展示</p>
            </div>
            <div class="flex min-h-[320px] items-center justify-center bg-slate-950/30">
              <img :src="annualCloudImage" alt="2025 品牌与博主合作词云" class="max-h-[520px] w-full object-contain object-center" />
            </div>
          </article>
        </div>
      </section>

      <section class="rounded-3xl border border-indigo-100 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Why us</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">我们的优势</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">
            我们不是泛流量分发团队，而是更懂技术内容、更懂开发者场景的合作伙伴，重点帮助品牌把传播做得可信、可追踪、可沉淀，并逐步形成真实有效的 GEO 结果。
          </p>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="item in advantages"
            :key="item.title"
            class="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm"
          >
            <div class="text-2xl">{{ item.icon }}</div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-gray-600">{{ item.description }}</p>
          </article>
        </div>

        <div class="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4 text-sm leading-7 text-emerald-900">
          除了短期传播，我们也关注内容在搜索结果、社区问答和技术检索场景中的长期沉淀，让一次合作逐步延伸为真实有效的 GEO 资产。
        </div>
      </section>
      </template>

      <template v-else>
      <section class="rounded-3xl border border-blue-100 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Tweet Case</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">推文案例：写文流程</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">
            在推文合作里，我们更关注内容是否像“技术分享”而不是“广告文案”。案例中的写文流程会先解决信息准确，再保证表达自然，最后通过审核与发布节奏保证效果和稳定性。
          </p>
        </div>

        <div class="mt-8 overflow-x-auto pb-2">
          <article
            v-for="(step, index) in writingFlow"
            :key="step.title"
            class="inline-block w-[220px] align-top mr-4 last:mr-0 xl:w-[calc((100%-5rem)/6)] rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {{ index + 1 }}
            </div>
            <h3 class="mt-4 text-base font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-gray-600">{{ step.description }}</p>
          </article>
        </div>
      </section>

      <section class="rounded-3xl border border-amber-100 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Distribution Stage</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">分发阶段填表展示</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">
            在进入分发阶段后，我们会统一收集发布链接、平台信息、博主排期与执行状态，通过标准化表单推进协作，保证矩阵分发过程透明、可追踪、可复盘。
          </p>
        </div>

        <div class="mt-6 overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/40 shadow-sm">
          <div class="border-b border-amber-100 px-5 py-4">
            <h3 class="text-lg font-semibold text-gray-900">分发表单示意图</h3>
            <p class="mt-1 text-sm text-gray-500">展示案例执行过程中，分发阶段的信息收集与协作表单。</p>
          </div>
          <div class="flex items-center justify-center bg-white p-4 md:p-6">
            <img :src="distributionFormImage" alt="分发阶段填表情况示意图" class="max-h-[680px] w-full rounded-xl object-contain object-center" />
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-violet-100 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Report Sample</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">数据报告案例展示</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">
            在合作收尾阶段，我们会输出结构化的数据报告，统一汇总发布时间、投放平台、阅读与互动反馈，帮助品牌快速理解本轮内容传播效果，并为下一轮合作提供复盘依据。
          </p>
        </div>

        <div class="mt-6 overflow-hidden rounded-2xl border border-violet-100 bg-slate-50 shadow-sm">
          <div class="border-b border-violet-100 px-5 py-4">
            <h3 class="text-lg font-semibold text-gray-900">报告示意图</h3>
            <p class="mt-1 text-sm text-gray-500">补充展示数据报告在实际合作中的呈现方式。</p>
          </div>
          <div class="flex items-center justify-center bg-white p-4 md:p-6">
            <img :src="reportExplanationImage" alt="数据报告补充说明示意图" class="max-h-[680px] w-full rounded-xl object-contain object-center" />
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-fuchsia-100 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-600">Case Showcase</p>
          <h2 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">优化大模型检索结果 GEO 展示</h2>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">
            这是案例中的另一类优质展示方式：通过更直观的页面呈现，把检索结果优化、展示逻辑和内容组织效果集中展示出来，便于品牌侧快速理解输出质量与传播价值。
          </p>
        </div>

        <div class="mt-6 overflow-hidden rounded-2xl border border-fuchsia-100 bg-fuchsia-50/40 shadow-sm">
          <div class="border-b border-fuchsia-100 px-5 py-4">
            <h3 class="text-lg font-semibold text-gray-900">GEO 展示示意图</h3>
            <p class="mt-1 text-sm text-gray-500">补充展示案例中的检索结果优化与展示效果。</p>
          </div>
          <div class="flex items-center justify-center bg-white p-4 md:p-6">
            <img :src="geoShowcaseImage" alt="优化大模型检索结果 GEO 展示示意图" class="max-h-[680px] w-full rounded-xl object-contain object-center" />
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div class="grid gap-5 lg:grid-cols-3">
          <article class="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-2">
            <p class="text-sm font-semibold text-emerald-700">交付重点</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">让技术内容既能看懂，也愿意转发</h3>
            <p class="mt-3 text-sm leading-7 text-gray-600">
              我们在写文类合作里，会更强调“真实体验 + 明确场景 + 易传播标题”。这样既能兼顾品牌信息准确度，也更符合技术平台的阅读习惯。
            </p>
          </article>

          <article class="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <p class="text-sm font-semibold text-emerald-700">适合内容</p>
            <ul class="mt-3 space-y-2 text-sm text-gray-600">
              <li>产品功能解读</li>
              <li>工具实测体验</li>
              <li>开发接入教程</li>
              <li>行业场景案例</li>
            </ul>
          </article>
        </div>
      </section>
      </template>
    </main>
  </div>
</template>