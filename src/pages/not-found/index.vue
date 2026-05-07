<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav />

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">404</p>
      <h1 class="mt-3 text-4xl md:text-5xl font-bold text-gray-900">页面找不到了</h1>
      <p class="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
        你访问的链接可能已经迁移、改名或暂时下线。可以从下面的入口回到主站点。
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <router-link
          to="/tob"
          class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <span>🏠</span>
          <span>回到首页</span>
        </router-link>
        <router-link
          to="/workspace"
          class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold text-indigo-700 bg-white border border-indigo-200 shadow-sm hover:shadow-md transition-all"
        >
          <span>🗂️</span>
          <span>联盟工作台</span>
        </router-link>
        <router-link
          to="/cases"
          class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
        >
          <span>📘</span>
          <span>案例介绍</span>
        </router-link>
      </div>
    </main>
  </div>
</template>
