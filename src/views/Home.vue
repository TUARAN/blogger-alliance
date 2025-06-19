<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
    <!-- Hero 区域 -->
    <section class="flex-1 flex flex-col justify-center items-center py-20">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
        博主联盟，连接产品与技术影响力
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-center">
        我们致力于帮助产品方精准推广程序员向产品，也为技术博主/开发者提供联盟成长与工具资源。<br>
        无论你是产品方，还是内容创作者，这里都能找到属于你的价值！
      </p>
      <div class="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
        <!-- ToB 入口卡片 -->
        <router-link to="/tob" class="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center group border-2 border-transparent hover:border-indigo-400">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">我要推广产品</h2>
          <p class="text-gray-600 mb-4 text-center">技术博主联盟助力产品精准曝光，触达数万开发者用户</p>
          <span class="inline-block mt-auto px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow group-hover:from-indigo-700 group-hover:to-purple-700 transition-all">了解推广服务</span>
        </router-link>
        <!-- ToC 入口卡片 -->
        <router-link to="/toc" class="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center group border-2 border-transparent hover:border-green-400">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">我是技术博主/开发者</h2>
          <p class="text-gray-600 mb-4 text-center">加入联盟，获取推广资源、联盟收益和精选开发工具</p>
          <span class="inline-block mt-auto px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow group-hover:from-green-600 group-hover:to-blue-600 transition-all">加入联盟/浏览工具</span>
        </router-link>
      </div>
    </section>

    <!-- 亮点/流程区块 -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- ToB 亮点 -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow">
            <h3 class="text-xl font-bold text-indigo-700 mb-4 flex items-center"><span class="mr-2">🚀</span>产品推广服务</h3>
            <ul class="space-y-3 text-gray-700">
              <li>• 技术博主真实测评与内容分发</li>
              <li>• 覆盖 10W+ 程序员受众</li>
              <li>• 多平台曝光（掘金、知乎、GitHub 等）</li>
              <li>• 数据追踪与效果反馈</li>
            </ul>
          </div>
          <!-- ToC 亮点 -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow">
            <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center"><span class="mr-2">🤝</span>博主联盟权益</h3>
            <ul class="space-y-3 text-gray-700">
              <li>• 联盟推广分成，提升收入</li>
              <li>• 资源共享，涨粉更快</li>
              <li>• 专属工具库，提升创作效率</li>
              <li>• 行业交流与成长机会</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选博主/工具/合作品牌（可选） -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="text-lg font-bold text-gray-900 mb-4">部分联盟博主</h4>
            <div class="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" class="w-12 h-12 rounded-full border-2 border-indigo-200" alt="博主1">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" class="w-12 h-12 rounded-full border-2 border-indigo-200" alt="博主2">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" class="w-12 h-12 rounded-full border-2 border-indigo-200" alt="博主3">
              <span class="ml-2 text-gray-500">等 50+ 技术博主</span>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-900 mb-4">精选工具库</h4>
            <div class="flex items-center gap-4">
              <span class="inline-flex flex-col items-center">
                <span class="text-2xl">🤖</span>
                <span class="text-xs text-gray-600">AI助手</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-2xl">📊</span>
                <span class="text-xs text-gray-600">推广分析</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-2xl">📝</span>
                <span class="text-xs text-gray-600">Markdown工具</span>
              </span>
              <span class="ml-2 text-gray-500">等 10+ 工具</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 CTA -->
    <section class="py-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">加入博主联盟，开启你的影响力之旅！</h2>
      <p class="text-lg mb-8">无论你是产品方还是技术博主，欢迎加入我们，共创技术新生态。</p>
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <router-link to="/tob" class="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition-all">产品推广合作</router-link>
        <router-link to="/toc" class="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition-all">加入联盟/浏览工具</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// 首页无需复杂逻辑，全部为静态引导内容
</script>  