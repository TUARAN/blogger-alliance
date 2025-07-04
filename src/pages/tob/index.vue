<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- 导航栏 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀 开发者博主联盟
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/about" class="text-gray-600 hover:text-indigo-600 transition-colors">
              关于我们
            </router-link>
            <router-link to="/tools" class="text-gray-600 hover:text-indigo-600 transition-colors">
              工具项目
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero 区域 -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            开发者博主联盟
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              助你推广程序员向产品
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            我们拥有一个专业的技术开发者博主联盟，致力于帮助优秀的产品获得技术圈的精准曝光。
            通过我们的推广服务，让你的产品快速触达目标用户群体。
          </p>
          
          <!-- CTA 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              @click="showContactModal = true"
              class="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <span class="mr-2">💬</span>
                联系推广
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <a
              href="https://github.com/TUARAN/blogger-alliance"
              target="_blank"
              class="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <span class="mr-2">🤝</span>
                加入开发者博主联盟
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          <!-- 统计信息 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-indigo-600 mb-2">20+</div>
              <div class="text-gray-600">技术博主</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">20W+</div>
              <div class="text-gray-600">覆盖用户</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">100+</div>
              <div class="text-gray-600">成功案例</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 装饰性背景元素 -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>

    <!-- 博主团队展示 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          我们的博主团队
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          专业的技术博主团队，覆盖前端、后端、AI、移动开发等多个技术领域
        </p>
      </div>
      
      <!-- Loading 状态 -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div class="ml-4 flex-1">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <!-- 博主卡片 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="blogger in bloggers"
          :key="blogger.id"
          class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
        >
          <!-- 博主基本信息 -->
          <div class="p-6">
            <div class="flex items-center mb-4">
              <img
                :src="blogger.avatar"
                :alt="blogger.name"
                class="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 group-hover:border-indigo-300 transition-colors"
              />
              <div class="ml-4 flex-1">
                <h3 class="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ blogger.name }}</h3>
                <p class="text-indigo-600 font-medium">{{ blogger.followers }} 粉丝</p>
              </div>
            </div>
            
            <p class="text-gray-600 mb-4 leading-relaxed">{{ blogger.introduction }}</p>
            
            <!-- 社交账号 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <a
                v-for="account in blogger.socialAccounts"
                :key="account.platform"
                :href="account.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 whitespace-nowrap group-hover:bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                v-if="account && account.url && account.url.trim() !== ''"
              >
                <span class="mr-1">{{ account.icon }}</span>
                {{ account.platform }}
              </a>
              <span
                v-for="account in blogger.socialAccounts"
                :key="account.platform"
                class="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 whitespace-nowrap opacity-60"
                v-if="!account || !account.url || account.url.trim() === ''"
              >
                <span class="mr-1">{{ account.icon }}</span>
                {{ account.platform }}
              </span>
            </div>

            <!-- 展开/收起按钮 -->
            <button
              @click="toggleExpanded(blogger.id)"
              class="w-full py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white"
            >
              <span>{{ expandedBloggers.includes(blogger.id) ? '收起详情' : '查看更多' }}</span>
              <svg
                class="ml-2 w-4 h-4 transform transition-transform"
                :class="{ 'rotate-180': expandedBloggers.includes(blogger.id) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- 展开内容 -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="expandedBloggers.includes(blogger.id)" class="px-6 pb-6 border-t border-gray-100">
              <div class="pt-4 space-y-4">
                <!-- 专长领域 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">专长领域</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="specialty in blogger.expandedContent.specialties"
                      :key="specialty"
                      class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {{ specialty }}
                    </span>
                  </div>
                </div>

                <!-- 成就荣誉 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">成就荣誉</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="achievement in blogger.expandedContent.achievements"
                      :key="achievement"
                      class="text-gray-600 text-sm flex items-center"
                    >
                      <span class="text-green-500 mr-2">✓</span>
                      {{ achievement }}
                    </li>
                  </ul>
                </div>

                <!-- 最近文章 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">最近文章</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="post in blogger.expandedContent.recentPosts"
                      :key="post"
                      class="text-gray-600 text-sm flex items-center"
                    >
                      <span class="text-indigo-500 mr-2">📝</span>
                      {{ post }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- 服务亮点展示 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          为什么选择我们？
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          20+专业技术博主，助力您的产品精准推广
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 产品推广亮点 -->
        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-xl font-bold text-indigo-700 mb-4">产品推广亮点</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2 mt-1">•</span>
              <span>技术博主真实测评与内容分发</span>
            </li>
                          <li class="flex items-start">
                <span class="text-indigo-500 mr-2 mt-1">•</span>
                <span>覆盖 20W+ 程序员受众</span>
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
        <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">🤝</div>
          <h3 class="text-xl font-bold text-green-700 mb-4">联盟权益亮点</h3>
          <ul class="space-y-3 text-gray-700">
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
        <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-4xl mb-4">🛠️</div>
          <h3 class="text-xl font-bold text-blue-700 mb-4">工具/项目亮点</h3>
          <ul class="space-y-3 text-gray-700">
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
    </section>

    <!-- 底部 CTA 区域 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          想要获得技术圈推广？
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          我们的博主团队可以帮助你的产品快速触达技术人群，提升品牌知名度和用户转化率
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="showContactModal = true"
            class="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="flex items-center">
              <span class="mr-2">💬</span>
              立即联系推广
            </span>
          </button>
          <a
            href="https://github.com/TUARAN/blogger-alliance"
            target="_blank"
            class="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="flex items-center">
              <span class="mr-2">🤝</span>
              加入博主联盟
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- 悬浮引导卡片 -->
    <div class="fixed bottom-6 right-6 z-50">
      <div class="relative">
        <!-- 主悬浮按钮 -->
        <button
          @click="toggleFloatingCard"
          class="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <span class="text-2xl">🛠️</span>
        </button>
        
        <!-- 悬浮卡片 -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="showFloatingCard"
            class="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">发现更多精彩</h3>
              <button
                @click="toggleFloatingCard"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="space-y-4">
              <router-link
                to="/tools"
                class="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors group"
              >
                <span class="text-2xl mr-3">🛠️</span>
                <div>
                  <div class="font-semibold text-gray-900 group-hover:text-indigo-600">精选开发工具</div>
                  <div class="text-sm text-gray-600">提升开发效率的实用工具</div>
                </div>
              </router-link>
              
              <a
                href="https://github.com/TUARAN/blogger-alliance"
                target="_blank"
                class="flex items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:from-green-100 hover:to-blue-100 transition-colors group"
              >
                <span class="text-2xl mr-3">🌟</span>
                <div>
                  <div class="font-semibold text-gray-900 group-hover:text-green-600">优质开源项目</div>
                  <div class="text-sm text-gray-600">发现和学习优秀项目</div>
                </div>
              </a>
              
              <div class="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <span class="text-2xl mr-3">📊</span>
                <div>
                  <div class="font-semibold text-gray-900">推广数据分析</div>
                  <div class="text-sm text-gray-600">实时监控推广效果</div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-100">
              <p class="text-sm text-gray-500 text-center">
                更多功能正在开发中...
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 联系方式 Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showContactModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="showContactModal = false"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all"
          @click.stop
        >
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">联系我们</h3>
            <p class="text-gray-600 mb-6">
              请通过以下方式联系我们，我们会尽快回复您的推广需求
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <span class="text-2xl mr-3">📧</span>
                <div class="text-left">
                  <p class="font-semibold text-gray-900">邮箱</p>
                  <p class="text-indigo-600">tuaran666@gmail.com</p>
                </div>
              </div>
              
              <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <span class="text-2xl mr-3">💬</span>
                <div class="text-left">
                  <p class="font-semibold text-gray-900">微信</p>
                  <p class="text-indigo-600">atar24 或 wx_k21vin</p>
                </div>
              </div>
            </div>
            
            <button
              @click="showContactModal = false"
              class="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bloggersData } from '../../data/mockData.js'

// 响应式数据
const loading = ref(true)
const bloggers = ref([])
const expandedBloggers = ref([])
const showContactModal = ref(false)
const showFloatingCard = ref(false)

// 切换展开状态
const toggleExpanded = (bloggerId) => {
  const index = expandedBloggers.value.indexOf(bloggerId)
  if (index > -1) {
    expandedBloggers.value.splice(index, 1)
  } else {
    expandedBloggers.value.push(bloggerId)
  }
}

// 切换悬浮卡片
const toggleFloatingCard = () => {
  showFloatingCard.value = !showFloatingCard.value
}

// 模拟加载数据
onMounted(() => {
  setTimeout(() => {
    bloggers.value = bloggersData
    loading.value = false
  }, 1000)
})
</script> 