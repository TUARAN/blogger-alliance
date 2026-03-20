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

      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          to="/tob/services"
          class="group rounded-3xl border border-white/70 bg-white/85 p-7 shadow-lg shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">🔥</span>
            <span class="text-sm font-semibold text-emerald-600">品牌合作</span>
          </div>
          <h2 class="mt-6 text-2xl font-bold text-gray-900">服务介绍</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600">
            查看常规服务与专题服务，目前包含推文、引流、社群和 AI Access 推广。
          </p>
          <div class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/tob/deals"
          class="group rounded-3xl border border-white/70 bg-white/85 p-7 shadow-lg shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">🧭</span>
            <span class="text-sm font-semibold text-indigo-600">内部查询</span>
          </div>
          <h2 class="mt-6 text-2xl font-bold text-gray-900">合作查询</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600">
            查看合作记录与相关明细，适合内部按项目、合作方或执行情况快速检索。
          </p>
          <div class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/matrix"
          class="group rounded-3xl border border-white/70 bg-white/85 p-7 shadow-lg shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">🧩</span>
            <span class="text-sm font-semibold text-purple-600">数据概览</span>
          </div>
          <h2 class="mt-6 text-2xl font-bold text-gray-900">矩阵看板</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600">
            汇总博主矩阵、内容分发和整体表现，用于快速浏览当前联盟的运营盘面。
          </p>
          <div class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>

        <router-link
          to="/academy"
          class="group rounded-3xl border border-white/70 bg-white/85 p-7 shadow-lg shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">📚</span>
            <span class="text-sm font-semibold text-blue-600">知识资源</span>
          </div>
          <h2 class="mt-6 text-2xl font-bold text-gray-900">联盟学院</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600">
            集中查看学习资料、工具资源和知识沉淀，方便成员持续复用和成长。
          </p>
          <div class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span>进入模块</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
