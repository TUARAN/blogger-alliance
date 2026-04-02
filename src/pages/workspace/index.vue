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
          to="/tob/deals"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">🧭</span>
            <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">内部查询</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">合作查询</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            合作记录、项目明细与执行检索。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/matrix"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-purple-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">🧩</span>
            <span class="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">数据概览</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">矩阵看板</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            博主矩阵、账号分布与运营表现概览。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/annual-report-2025"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-rose-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-2xl">📈</span>
            <span class="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">年度复盘</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">25年报告</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            2025 年合作投放、传播表现与品牌合作总览。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/academy"
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
          to="/workspace/web-llm"
          class="group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-amber-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">🧠</span>
            <span class="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">本地推理</span>
          </div>
          <h2 class="mt-5 text-xl font-bold text-gray-900">大模型问答</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            浏览器端 WebGPU 模型加载、流式问答与本地会话。
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
