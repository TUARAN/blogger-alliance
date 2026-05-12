<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
    <AppNav workspace-active />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">联盟工作台</h1>
        <p class="mt-4 text-lg text-gray-600 leading-8">
          聚合联盟核心能力入口，统一承载服务介绍、数据查询、矩阵运营与知识资源，支持从流量获取到变现转化的完整链路快速访问。
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <router-link
          to="/tob/services"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">🔥</span>
            <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">品牌合作</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">服务介绍</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            推文、引流、社群和 AI Access 推广。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          :to="{ path: '/academy', query: { tab: 'knowledge' } }"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-blue-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">📚</span>
            <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">知识资源</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">联盟学院</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            学习资料、工具资源和知识沉淀。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/tob/internal"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">🗂️</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <span>内部数据</span>
            </span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">内部数据中心</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            合作进度、数据报告、年度总览统一台账，凭证共享。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/matrix"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-teal-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-2xl">🧩</span>
            <span class="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">矩阵运营</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">矩阵看板</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            按博主查看矩阵账号分布、平台覆盖与阅读／粉丝表现，支撑运营复盘与拓展决策。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <a
          href="https://md.tuaran666.workers.dev/"
          target="_blank"
          rel="noopener noreferrer"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-violet-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl">🔄</span>
            <span class="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">外部工具</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">博主联盟同步工具</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            在浏览器中同步与管理内容，新标签页打开。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
            <span>打开工具</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </a>

      </div>
    </section>
  </div>
</template>
