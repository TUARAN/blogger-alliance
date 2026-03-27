<script setup>
import annualDashboardImage from '../../img/example/wechat_2026-03-16_104619_761.png'
import annualCloudImage from '../../img/example/wechat_2026-03-16_104632_010.png'

const partnerBrands = ['秒哒', 'FinClip', '亚马逊云科技', '火山引擎', '明基', '秦托邦']
const summaryCards = [
  { label: '合作品牌', value: '8+', accent: 'from-indigo-500 to-blue-500' },
  { label: '累计投放', value: '376 篇', accent: 'from-fuchsia-500 to-violet-500' },
  { label: '覆盖平台', value: '11+', accent: 'from-emerald-500 to-cyan-500' },
  { label: '社群辐射', value: '20+', accent: 'from-amber-500 to-orange-500' }
]

const reportHighlights = [
  '以技术内容分发为核心，持续帮助品牌建立开发者认知',
  '合作内容覆盖掘金、CSDN、知乎、公众号、头条、博客园等平台',
  '配合社群扩散与矩阵号联动，形成更稳定的传播放大效果'
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
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
              to="/workspace"
              class="inline-flex items-center gap-1.5 text-gray-700 transition-colors font-semibold text-base"
            >
              <span class="text-base leading-none">🗂️</span>
              <span>联盟工作台</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <section class="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
        <div class="max-w-3xl">
          <p class="text-sm uppercase tracking-[0.24em] text-indigo-200">Annual Review</p>
          <h1 class="mt-3 text-3xl md:text-4xl font-bold">2025 年报告</h1>
          <p class="mt-3 text-sm md:text-base leading-7 text-slate-300">
            2025 年，我们与 <span class="font-semibold text-white">{{ partnerBrands.join('、') }}</span> 等品牌完成合作，围绕技术内容分发、平台种草、社群扩散和数据复盘，持续帮助品牌建立开发者认知。
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
      </section>

      <section class="mt-8 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <article class="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">
          <div class="border-b border-indigo-100 px-6 py-5">
            <h2 class="text-xl font-bold text-gray-900">年度合作数据看板</h2>
            <p class="mt-1 text-sm text-gray-500">全年累计投放、平台分布与内容数量概览。</p>
          </div>
          <img :src="annualDashboardImage" alt="2025 合作数据看板" class="w-full object-cover" />
        </article>

        <article class="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-6 shadow-lg">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Report Focus</p>
          <h2 class="mt-3 text-2xl font-bold text-gray-900">年度重点</h2>
          <div class="mt-5 space-y-3">
            <div
              v-for="highlight in reportHighlights"
              :key="highlight"
              class="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 text-sm leading-6 text-gray-700 shadow-sm"
            >
              {{ highlight }}
            </div>
          </div>
        </article>
      </section>

      <section class="mt-8 overflow-hidden rounded-3xl border border-fuchsia-100 bg-white shadow-lg">
        <div class="border-b border-fuchsia-100 px-6 py-5">
          <h2 class="text-xl font-bold text-gray-900">品牌与博主词云</h2>
          <p class="mt-1 text-sm text-gray-500">品牌方与开发者博主合作网络的可视化展示。</p>
        </div>
        <div class="flex min-h-[360px] items-center justify-center bg-slate-50 px-4 py-6">
          <img :src="annualCloudImage" alt="2025 品牌与博主合作词云" class="max-h-[560px] w-full object-contain object-center" />
        </div>
      </section>
    </main>
  </div>
</template>
