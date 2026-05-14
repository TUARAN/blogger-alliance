<script setup>
import reportExplanationImage from '../../img/example/wechat_2026-03-16_113829_555.png'
import distributionFormImage from '../../img/example/image.png'
import geoShowcaseImage from '../../img/example/微信图片_2026-03-16_145503_945.png'

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
  <div class="space-y-8 md:space-y-10">
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
          <div
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
          >
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
          <img
            :src="distributionFormImage"
            alt="分发阶段填表情况示意图"
            class="max-h-[680px] w-full rounded-xl object-contain object-center"
          />
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
          <img
            :src="reportExplanationImage"
            alt="数据报告补充说明示意图"
            class="max-h-[680px] w-full rounded-xl object-contain object-center"
          />
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
          <img
            :src="geoShowcaseImage"
            alt="优化大模型检索结果 GEO 展示示意图"
            class="max-h-[680px] w-full rounded-xl object-contain object-center"
          />
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
  </div>
</template>
