<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14 gap-3">
          <router-link
            to="/tob#cooperation-services"
            class="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            ← 返回 TOB
          </router-link>

          <div class="flex items-center gap-2">
            <router-link
              to="/tob/services/tweet"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/tweet' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              推文
            </router-link>
            <router-link
              to="/tob/services/cpc"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/cpc' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              引流
            </router-link>
            <router-link
              to="/tob/services/community"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              :class="$route.path === '/tob/services/community' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
            >
              社群
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">社群推广</h1>
        <p class="mt-3 text-gray-600">此页面用于进一步介绍“社群”类合作服务（内容预留）。</p>
      </header>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="text-sm text-gray-600">
          这里后续可放：社群宣传与建立社群的玩法、周期、交付与沉淀方式等。
        </div>
      </section>
    </main>
  </div>
</template>
