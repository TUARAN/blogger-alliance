<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- 导航栏 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- 左侧：Logo -->
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀 开发者博主联盟
            </router-link>
          </div>
          
          <!-- 右侧：导航链接 -->
          <div class="flex items-center gap-6">
            <!-- 矩阵联盟 - 外部链接，颜色更醒目 -->
            <a
              href="https://matrix-alliance.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 transition-colors font-semibold text-base"
            >
              <span class="text-base leading-none">✴</span>
              <span>矩阵联盟</span>
            </a>
            
            <!-- 联盟学院 - 路由链接，颜色较淡 -->
            <router-link
              to="/academy"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">📚</span>
              <span>联盟学院</span>
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
            <span class="block">博主联盟</span>
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              连接产品与技术影响力
            </span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            我们聚合一批专业技术博主，突出一批面向程序员的优质产品，助你快速触达程序员受众<span class="inline-flex items-center ml-2 text-sm text-gray-500"><span class="inline-flex items-center justify-center w-5 h-5 bg-blue-50 text-blue-500 rounded-full text-xs font-bold mr-2">i</span>工信部数据显示，我国软件开发者数量已突破<span class="font-semibold text-blue-500 ml-1">940万</span></span>
          </p>
          
          <!-- CTA 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              @click="scrollToBloggerTeam"
              class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <span class="mr-2">🚀</span>
                我是品牌方，我想有效推广
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <a
              href="https://github.com/TUARAN/blogger-alliance"
              target="_blank"
              class="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                <span class="mr-2">🤝</span>
                我是个人博主，我想业余赚点钱
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          <!-- 统计信息 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-indigo-600 mb-2">{{ bloggerStats.bloggerCount }} 位+</div>
              <div class="text-gray-600">技术博主</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">{{ bloggerStats.formattedFollowers }}+</div>
              <div class="text-gray-600">覆盖程序员粉丝</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ bloggerStats.totalPosts }} 篇+</div>
              <div class="text-gray-600">累计投放推文</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600 mb-2">20 个+</div>
              <div class="text-gray-600">辐射社群</div>
            </div>
          </div>
          

          
          <!-- 合作品牌轮播 -->
          <div class="mt-12 max-w-4xl mx-auto">
            <h3 class="text-center text-lg font-semibold text-gray-700 mb-6">合作品牌</h3>
            <div class="relative overflow-hidden">
              <div class="flex animate-scroll">
                <div class="flex space-x-12 whitespace-nowrap">
                  <!-- 第一组品牌 -->
                  <div class="flex items-center space-x-8">
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/aws.png" alt="亚马逊科技" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">亚马逊科技</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/baidu.png" alt="百度文心大模型" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">百度文心大模型</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/bytedance.png" alt="字节火山引擎" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">字节火山引擎</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/finclip.png" alt="Finclip小程序" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">Finclip小程序</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/benq.png" alt="明基显示器" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">明基显示器</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/qintopia.png" alt="秦托邦社区" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">秦托邦社区</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/paddleocr.png" alt="PaddleOCR" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">PaddleOCR</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/miao.png" alt="秒哒" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">秒哒</span>
                    </div>
                  </div>
                  <!-- 第二组品牌（重复，用于无缝轮播） -->
                  <div class="flex items-center space-x-8">
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/aws.png" alt="亚马逊科技" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">亚马逊科技</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/baidu.png" alt="百度文心大模型" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">百度文心大模型</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/bytedance.png" alt="字节火山引擎" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">字节火山引擎</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/finclip.png" alt="Finclip小程序" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">Finclip小程序</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/benq.png" alt="明基显示器" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">明基显示器</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/qintopia.png" alt="秦托邦社区" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">秦托邦社区</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/paddleocr.png" alt="PaddleOCR" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">PaddleOCR</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                        <img src="/src/img/brand/miao.png" alt="秒哒" class="w-12 h-12 object-contain">
                      </div>
                      <span class="text-sm text-gray-600">秒哒</span>
                    </div>
                  </div>
                </div>
              </div>
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
    <section id="blogger-team" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          我们的博主团队名单
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          专业的技术博主团队，覆盖前端、后端、AI、移动开发等多个技术领域
        </p>

      </div>
      
      <!-- Loading 状态 -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <div
          v-for="blogger in bloggers"
          :key="blogger.id"
          class="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
          <!-- 博主基本信息 -->
          <div class="relative p-5 xl:p-4 flex flex-col flex-1">
            <span
              v-if="isKOL(blogger.followers)"
              class="absolute -top-3 -right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-amber-300/70 text-amber-600 text-xs font-semibold shadow-sm"
            >
              <span class="text-base leading-none">✨</span>
              <span class="pr-1">KOL</span>
            </span>
            <span
              v-else-if="isKOC(blogger.followers)"
              class="absolute -top-3 -right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-300/80 text-sky-600 text-xs font-semibold shadow-sm"
            >
              <span class="text-base leading-none">🌟</span>
              <span class="pr-1">KOC</span>
            </span>
            <div class="flex items-start mb-4 gap-3">
              <img
                :src="blogger.avatar"
                :alt="blogger.name"
                class="w-14 h-14 rounded-full object-cover border border-indigo-100 group-hover:border-indigo-300 transition-colors"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{{ blogger.name }}</h3>
                  <span class="text-sm font-medium text-indigo-600 whitespace-nowrap">{{ blogger.followers }}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1 leading-snug line-clamp-3">{{ blogger.introduction }}</p>
              </div>
            </div>

            <!-- 社交账号 -->
            <div class="flex flex-wrap gap-1.5 mt-auto">
              <template v-for="account in blogger.socialAccounts" :key="account.platform">
                <a
                  v-if="account && account.url && account.url.trim() !== ''"
                  :href="account.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                  @click="handleLinkClick(account.platform, account.url, blogger.name)"
                >
                  <span class="mr-1">{{ account.icon }}</span>
                  {{ account.platform }}
                </a>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-500 whitespace-nowrap opacity-60"
                >
                  <span class="mr-1">{{ account.icon }}</span>
                  {{ account.platform }}
                </span>
              </template>
            </div>

            <!-- 展开/收起按钮 -->
            <button
              @click="toggleExpanded(blogger.id)"
              class="mt-4 w-full py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white"
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
            <div v-show="expandedBloggers.includes(blogger.id)" class="px-5 xl:px-4 pb-5 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl">
              <div class="pt-4 space-y-3 text-sm">
                <!-- 专长领域 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">专长领域</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="specialty in blogger.expandedContent.specialties"
                      :key="specialty"
                      class="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                    >
                      {{ specialty }}
                    </span>
                  </div>
                </div>

                <!-- 成就荣誉 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">成就荣誉</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="achievement in blogger.expandedContent.achievements"
                      :key="achievement"
                      class="text-gray-600 flex items-center"
                    >
                      <span class="text-green-500 mr-1.5">✓</span>
                      {{ achievement }}
                    </li>
                  </ul>
                </div>

                <!-- 最近文章 -->
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">最近文章</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="post in blogger.expandedContent.recentPosts"
                      :key="post"
                      class="text-gray-600 flex items-center"
                    >
                      <span class="text-indigo-500 mr-1.5">📝</span>
                      {{ post }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
        
        <!-- 还有更多博主卡片 -->
        <div class="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-dashed border-indigo-200 hover:border-indigo-400 cursor-pointer">
          <div class="p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
              <span>✨</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">还有更多博主</h3>
            <p class="text-gray-600 mb-4">我们正在持续招募优秀的技术博主加入联盟</p>
            <div class="flex flex-wrap gap-2 justify-center mb-4">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">前端开发</span>
              <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">后端架构</span>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AI/ML</span>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">移动开发</span>
            </div>
            <a
              href="https://github.com/TUARAN/blogger-alliance"
              target="_blank"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span class="mr-2">🤝</span>
              加入我们
            </a>
          </div>
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
          {{ bloggerStats.bloggerCount }}+专业技术博主，助力您的产品精准推广
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
                <span>覆盖 {{ bloggerStats.formattedFollowers }}+ 程序员受众</span>
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
          我们的博主团队名单可以帮助你的产品快速触达技术人群，提升品牌知名度和用户转化率
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
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

    <!-- 右下角浮窗二维码 -->
    <div class="fixed bottom-6 right-6 z-50">
      <div class="relative group">
        <!-- 主悬浮区域 -->
        <div
          @click="toggleQRCode"
          class="relative cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <!-- 背景装饰 -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
          
          <!-- 主要内容 -->
          <div class="relative bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span class="text-2xl">💬</span>
              </div>
              <div class="text-left">
                <div class="text-sm font-bold text-gray-800">联系我们</div>
                <div class="text-xs text-gray-600">推广合作咨询</div>
              </div>
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <!-- 二维码卡片 -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-x-2"
          enter-to-class="opacity-100 scale-100 translate-x-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-x-0"
          leave-to-class="opacity-0 scale-95 translate-x-2"
        >
          <div
            v-if="showQRCode"
            class="absolute bottom-20 right-0 w-72 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6"
          >
            <div class="flex items-center justify-end mb-4">
              <button
                @click="toggleQRCode"
                class="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="text-center">
              <div class="bg-gray-50 p-4 rounded-2xl mb-4">
                <img 
                  src="/src/img/qrcode.jpg" 
                  alt="微信二维码" 
                  class="w-full h-auto rounded-xl object-contain"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <!-- 备用显示，如果图片加载失败 -->
                <div class="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center hidden">
                  <div class="text-center">
                    <div class="text-2xl mb-1">📱</div>
                    <div class="text-xs text-gray-500">二维码图片</div>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <p class="text-base font-bold text-gray-800">扫码添加微信：atar24</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>






  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bloggersData } from '../../data/bloggerInfo.js'
import { trackLinkClick } from '../../utils/hybridStats.js'
import { getBloggerStats } from '../../utils/analytics.js'

// 响应式数据
const loading = ref(true)
const bloggers = ref([])
const expandedBloggers = ref([])
const showQRCode = ref(false)
const bloggerStats = ref(getBloggerStats())

const parseFollowersValue = (followersStr) => {
  if (!followersStr) return 0
  const clean = followersStr.replace(/\s+/g, '').replace(/\+/g, '').toUpperCase()

  if (clean.includes('K')) {
    const num = parseFloat(clean.replace('K', ''))
    return Number.isNaN(num) ? 0 : num * 1000
  }

  if (clean.includes('W')) {
    const num = parseFloat(clean.replace('W', ''))
    return Number.isNaN(num) ? 0 : num * 10000
  }

  if (clean.includes('M')) {
    const num = parseFloat(clean.replace('M', ''))
    return Number.isNaN(num) ? 0 : num * 1000000
  }

  const num = parseFloat(clean)
  return Number.isNaN(num) ? 0 : num
}

const KOL_THRESHOLD = 5000

const isKOL = (followersStr) => parseFollowersValue(followersStr) > KOL_THRESHOLD
const isKOC = (followersStr) => {
  const value = parseFollowersValue(followersStr)
  return value > 0 && value <= KOL_THRESHOLD
}

// 切换展开状态
const toggleExpanded = (bloggerId) => {
  const index = expandedBloggers.value.indexOf(bloggerId)
  if (index > -1) {
    expandedBloggers.value.splice(index, 1)
  } else {
    expandedBloggers.value.push(bloggerId)
  }
}

// 切换二维码显示
const toggleQRCode = () => {
  showQRCode.value = !showQRCode.value
}

// 处理链接点击
const handleLinkClick = (platform, url, bloggerName) => {
  console.log('链接被点击:', platform, url, bloggerName)
  trackLinkClick(`${bloggerName}-${platform}`, url, '/tob')
}

// 滚动到博主团队部分
const scrollToBloggerTeam = () => {
  const element = document.getElementById('blogger-team')
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// 模拟加载数据
onMounted(() => {
  setTimeout(() => {
    bloggers.value = bloggersData
    loading.value = false
  }, 1000)
})
</script>

 