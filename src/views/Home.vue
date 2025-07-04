<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
    <!-- 简洁统计条 -->
    <SimpleStatsBar />
    <!-- Hero 区域 -->
    <section class="flex-1 flex flex-col justify-center items-center section-mobile">
      <div class="container-mobile max-w-4xl mx-auto text-center">
        <h1 class="text-mobile-3xl sm:text-mobile-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          开发者博主联盟，连接产品与技术影响力
        </h1>
        <p class="text-mobile-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          我们致力于帮助产品方精准推广程序员向产品，也为技术博主/开发者提供联盟成长与工具资源。<br class="hidden sm:block">
          无论你是产品方，还是内容创作者，这里都能找到属于你的价值！
        </p>
        
        <!-- 统计显示 -->
        <!-- <div class="mb-8 w-full max-w-lg">
          <DetailedStats />
        </div> -->
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
          <!-- 推广产品卡片 -->
          <router-link 
            to="/tob" 
            class="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8 flex flex-col items-center group border-2 border-transparent hover:border-indigo-400 min-h-[280px] sm:min-h-[320px]"
            @click="handleButtonClick('推广产品卡片')"
          >
            <div class="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
            <h2 class="text-mobile-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">我要推广程序员方向的产品</h2>
            <p class="text-gray-600 mb-4 text-center text-mobile">精准触达开发者群体，提升产品曝光与转化</p>
            <span class="inline-block mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow group-hover:from-indigo-700 group-hover:to-purple-700 transition-all text-mobile">了解推广服务</span>
          </router-link>
          <!-- 加入联盟卡片 -->
          <router-link 
            to="/toc" 
            class="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8 flex flex-col items-center group border-2 border-transparent hover:border-green-400 min-h-[280px] sm:min-h-[320px]"
            @click="handleButtonClick('加入联盟卡片')"
          >
            <div class="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
            <h2 class="text-mobile-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">我想加入开发者博主联盟</h2>
            <p class="text-gray-600 mb-4 text-center text-mobile">结识同行、获取推广资源、联盟收益与成长机会</p>
            <span class="inline-block mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow group-hover:from-green-600 group-hover:to-blue-600 transition-all text-mobile">加入联盟</span>
          </router-link>
          <!-- 工具/项目卡片 -->
          <router-link 
            to="/tools" 
            class="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8 flex flex-col items-center group border-2 border-transparent hover:border-blue-400 min-h-[280px] sm:min-h-[320px] sm:col-span-2 lg:col-span-1"
            @click="handleButtonClick('工具项目卡片')"
          >
            <div class="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform">🛠️</div>
            <h2 class="text-mobile-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">我想使用开源工具或看看项目</h2>
            <p class="text-gray-600 mb-4 text-center text-mobile">发现精选开发工具，提升效率，探索优质项目</p>
            <span class="inline-block mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold shadow group-hover:from-blue-600 group-hover:to-indigo-600 transition-all text-mobile">浏览工具/项目</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 亮点/流程区块 -->
    <section class="section-mobile bg-white">
      <div class="container-mobile max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <!-- 产品推广亮点 -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow">
            <h3 class="text-lg sm:text-xl font-bold text-indigo-700 mb-4 flex items-center"><span class="mr-2">🚀</span>产品推广亮点</h3>
            <ul class="space-y-2 sm:space-y-3 text-gray-700 text-mobile">
              <li class="flex items-start">
                <span class="text-indigo-500 mr-2 mt-1">•</span>
                <span>技术博主真实测评与内容分发</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-500 mr-2 mt-1">•</span>
                <span>覆盖 10W+ 程序员受众</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-500 mr-2 mt-1">•</span>
                <span>多平台曝光（掘金、知乎、GitHub 等）</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-500 mr-2 mt-1">•</span>
                <span>数据追踪与效果反馈</span>
              </li>
            </ul>
          </div>
          <!-- 联盟权益亮点 -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow">
            <h3 class="text-lg sm:text-xl font-bold text-green-700 mb-4 flex items-center"><span class="mr-2">🤝</span>联盟权益亮点</h3>
            <ul class="space-y-2 sm:space-y-3 text-gray-700 text-mobile">
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">•</span>
                <span>联盟推广分成，提升收入</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">•</span>
                <span>资源共享，涨粉更快</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">•</span>
                <span>专属工具库，提升创作效率</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2 mt-1">•</span>
                <span>行业交流与成长机会</span>
              </li>
            </ul>
          </div>
          <!-- 工具/项目亮点 -->
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow">
            <h3 class="text-lg sm:text-xl font-bold text-blue-700 mb-4 flex items-center"><span class="mr-2">🛠️</span>工具/项目亮点</h3>
            <ul class="space-y-2 sm:space-y-3 text-gray-700 text-mobile">
              <li class="flex items-start">
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span>精选开源工具，助力开发提效</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span>丰富项目案例，开源共建</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span>一站式体验与学习</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span>持续更新，紧跟技术前沿</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选博主/工具/合作品牌（可选） -->
    <section class="section-mobile bg-gray-50">
      <div class="container-mobile max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <h4 class="text-lg font-bold text-gray-900 mb-4">部分联盟博主</h4>
            <div class="flex items-center gap-3 sm:gap-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-200" alt="博主1">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-200" alt="博主2">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-200" alt="博主3">
              <span class="ml-2 text-gray-500 text-mobile">等 50+ 技术博主</span>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <h4 class="text-lg font-bold text-gray-900 mb-4">精选工具库</h4>
            <div class="flex items-center gap-3 sm:gap-4">
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">🤖</span>
                <span class="text-xs text-gray-600">AI助手</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">📊</span>
                <span class="text-xs text-gray-600">推广分析</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">📝</span>
                <span class="text-xs text-gray-600">Markdown工具</span>
              </span>
              <span class="ml-2 text-gray-500 text-mobile">等 10+ 工具</span>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <h4 class="text-lg font-bold text-gray-900 mb-4">优质开源项目/合作品牌</h4>
            <div class="flex items-center gap-3 sm:gap-4">
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">🌟</span>
                <span class="text-xs text-gray-600">项目A</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">🚩</span>
                <span class="text-xs text-gray-600">项目B</span>
              </span>
              <span class="inline-flex flex-col items-center">
                <span class="text-xl sm:text-2xl">💡</span>
                <span class="text-xs text-gray-600">项目C</span>
              </span>
              <span class="ml-2 text-gray-500 text-mobile">等 5+ 项目/品牌</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 CTA -->
    <section class="py-8 sm:py-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
      <div class="container-mobile max-w-4xl mx-auto">
        <h2 class="text-mobile-2xl sm:text-2xl md:text-3xl font-bold mb-4">加入开发者博主联盟，开启你的影响力之旅！</h2>
        <p class="text-mobile-lg sm:text-lg mb-6 sm:mb-8">无论你是产品方还是技术博主，欢迎加入我们，共创技术新生态。</p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <router-link 
            to="/tob" 
            class="px-6 sm:px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition-all text-mobile"
            @click="handleButtonClick('底部产品推广合作')"
          >产品推广合作</router-link>
          <router-link 
            to="/toc" 
            class="px-6 sm:px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition-all text-mobile"
            @click="handleButtonClick('底部加入联盟')"
          >加入联盟</router-link>
          <router-link 
            to="/tools" 
            class="px-6 sm:px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition-all text-mobile"
            @click="handleButtonClick('底部浏览工具')"
          >浏览工具</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import SimpleStatsBar from '../components/SimpleStatsBar.vue'
import DetailedStats from '../components/DetailedStats.vue'
import { trackButtonClick, trackLinkClick } from '../utils/hybridStats.js'

// 跟踪按钮点击
const handleButtonClick = (buttonName) => {
  trackButtonClick(buttonName)
}

// 跟踪链接点击
const handleLinkClick = (linkText, linkUrl) => {
  trackLinkClick(linkText, linkUrl)
}
</script>  