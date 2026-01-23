<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- 导航栏 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <!-- 左侧：Logo -->
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀开发者博主联盟
            </router-link>
          </div>
          
          <!-- 右侧：导航链接 -->
          <div class="flex items-center gap-4 lg:gap-6">
            <!-- 矩阵联盟 - 外部链接，颜色更醒目 -->
            <a
              href="https://matrix-alliance.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-semibold text-base"
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
          

          <!-- 统计信息 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-indigo-600 mb-2">
                {{ bloggerStats.bloggerCount }} 位+
                <button
                  @click="scrollToBloggerTeam"
                  class="ml-1.5 text-xl hover:scale-125 transition-transform duration-300 animate-bounce cursor-pointer"
                  title="查看博主团队"
                >
                  👇
                </button>
              </div>
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
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">我们的博主团队名单</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">专业的技术博主团队，覆盖前端、后端、AI、移动开发等多个技术领域</p>
      </div>

      <!-- 控制栏：筛选与视图切换 -->
      <div class="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <!-- 左侧：筛选器 -->
        <div class="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <!-- 平台筛选 -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 whitespace-nowrap">筛选平台:</span>
            <select
              v-model="selectedPlatform"
              class="block w-40 pl-3 pr-10 h-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
            >
              <option value="all">全部平台</option>
              <option v-for="platform in availablePlatforms" :key="platform" :value="platform">
                {{ platform }}
              </option>
            </select>
          </div>

          <!-- 排序筛选 (统一交互) -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 whitespace-nowrap">排序:</span>
            <select
              v-model="sortField"
              @change="sortOrder = 'desc'"
              class="block w-32 pl-3 pr-10 h-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
            >
              <option value="default">默认</option>
              <option value="followers">粉丝数</option>
              <option value="name">姓名</option>
            </select>
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-indigo-600 border border-gray-300 rounded-md transition-colors bg-white shadow-sm"
              title="切换升序/降序"
              v-if="sortField !== 'default'"
            >
              <span class="text-lg leading-none">{{ sortOrder === "asc" ? "⬆️" : "⬇️" }}</span>
            </button>
          </div>
        </div>

        <!-- 右侧：全局操作 -->
        <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <!-- 导出/复制按钮 (仅在表格模式下显示) -->
          <button
            v-if="viewMode === 'table'"
            @click="copyTableToClipboard"
            class="inline-flex items-center px-4 h-10 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            title="复制当前表格数据到剪贴板，可直接粘贴到Excel"
          >
            <span class="mr-2">📋</span>
            复制表格数据
          </button>

          <div class="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

          <!-- 视图切换按钮 -->
          <div class="flex bg-gray-100 p-1 rounded-lg shrink-0">
            <button
              @click="viewMode = 'grid'"
              class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1"
              :class="viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <span>📷</span>
              <span class="hidden sm:inline">卡片</span>
            </button>
            <button
              @click="viewMode = 'table'"
              class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1"
              :class="viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              <span>📋</span>
              <span class="hidden sm:inline">表格</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 视图内容 -->

      <!-- 1. 卡片视图 (Grid View) -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <div
          v-for="blogger in filteredAndSortedBloggers"
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
            <div class="flex flex-wrap gap-1.5 mt-4">
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

              <button
                v-if="hasOnlyOnePlatform(blogger)"
                type="button"
                class="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs text-indigo-600 whitespace-nowrap hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                @click.stop="openMoreDataModal(blogger)"
              >
                平台补全中
              </button>
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

      <!-- 2. 表格视图 (Table View) -->
      <div v-else class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-fixed">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="w-56 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 select-none sticky left-0 bg-gray-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]"
                  @click="toggleSort('name')"
                >
                  博主信息
                  <span v-if="sortField === 'name'" class="ml-1">{{ sortOrder === "asc" ? "⬆" : "⬇" }}</span>
                </th>
                <th scope="col" class="w-40 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider select-none text-gray-400">
                  粉丝基数
                </th>
                <th scope="col" class="w-80 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">擅长领域</th>
                <th scope="col" class="w-96 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  个人简介
                </th>
                <!-- 动态生成平台表头 -->
                <th
                  v-for="platform in availablePlatforms"
                  :key="platform"
                  scope="col"
                  class="w-64 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-100"
                >
                  {{ platform }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="blogger in filteredAndSortedBloggers" :key="blogger.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap sticky left-0 bg-white group-hover:bg-gray-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full border border-gray-200 object-cover" :src="blogger.avatar" :alt="blogger.name" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        <span>{{ blogger.name }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-bold text-indigo-600">{{ blogger.followers }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(specialty, idx) in blogger.expandedContent.specialties.slice(0, 3)"
                      :key="idx"
                      class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700"
                    >
                      {{ specialty }}
                    </span>
                    <span v-if="blogger.expandedContent.specialties.length > 3" class="text-xs text-gray-400">...</span>
                  </div>
                </td>
                <td class="px-6 py-4 hidden md:table-cell">
                  <div class="text-sm text-gray-500 line-clamp-2 max-w-xs" :title="blogger.introduction">
                    {{ blogger.introduction }}
                  </div>
                </td>
                <!-- 动态生成平台数据 -->
                <td v-for="platform in availablePlatforms" :key="platform" class="px-6 py-4 whitespace-nowrap">
                  <div v-if="getAccountByPlatform(blogger, platform)" class="flex items-center gap-1.5">
                    <span class="text-lg">{{ getAccountByPlatform(blogger, platform).icon }}</span>
                    <a
                      :href="getAccountByPlatform(blogger, platform).url"
                      target="_blank"
                      class="text-sm text-indigo-400 hover:text-indigo-600 underline truncate max-w-[120px] transition-colors"
                      :title="getAccountByPlatform(blogger, platform).url"
                      @click="
                        handleLinkClick(getAccountByPlatform(blogger, platform).platform, getAccountByPlatform(blogger, platform).url, blogger.name)
                      "
                    >
                      {{
                        getAccountByPlatform(blogger, platform).platform.includes(":")
                          ? getAccountByPlatform(blogger, platform).platform.split(":")[1]
                          : "点击查看"
                      }}
                    </a>

                    <button
                      v-if="hasOnlyOnePlatform(blogger)"
                      type="button"
                      class="text-xs text-indigo-500 hover:text-indigo-700 underline ml-1"
                      @click.stop="openMoreDataModal(blogger)"
                    >
                      平台补全中
                    </button>
                  </div>
                  <span v-else class="text-gray-300 text-xs">-</span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 空状态提示 -->
          <div v-if="filteredAndSortedBloggers.length === 0" class="p-8 text-center text-gray-500">没有找到匹配的博主，请尝试其他关键词。</div>
        </div>
        <div class="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-center text-gray-500">
          提示：您可以直接复制表格内容，并粘贴到 Excel、Notion 或飞书中。
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center text-xs text-gray-500">
      <span v-if="trafficStats.loading">流量统计加载中...</span>
      <span v-else>总PV {{ trafficStats.pv }} · 总UV {{ trafficStats.uv }} · 本页PV {{ trafficStats.pagePv }}</span>
    </div>

    <!-- 右下角二维码 -->
    <div class="fixed bottom-6 right-6 z-50">
      <div class="relative animate-float">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
        
        <!-- 二维码卡片 -->
        <div class="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4 w-52 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div class="text-center mb-2">
            <div class="text-sm font-bold text-gray-800 mb-0.5">合作与共创</div>
            <div class="text-xs text-gray-500">扫码/添加微信号atar24</div>
          </div>
          
          <div class="bg-gray-50 p-2 rounded-xl mb-2">
            <img 
              src="/src/img/qrcode1.jpg" 
              alt="微信二维码" 
              class="w-full h-auto rounded-lg object-contain"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <!-- 备用显示，如果图片加载失败 -->
            <div class="w-full h-36 bg-gray-100 rounded-lg flex items-center justify-center hidden">
              <div class="text-center">
                <div class="text-xl mb-1">📱</div>
                <div class="text-xs text-gray-500">二维码图片</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="moreDataModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="closeMoreDataModal"></div>
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <div class="text-base font-semibold text-gray-900 mb-2">提示</div>
        <div class="text-sm text-gray-600 leading-relaxed">
          该博主尚未补全其他平台主页链接。补齐后即可展示更完整的影响力画像与覆盖人数。
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            @click="closeMoreDataModal"
          >
            知道了
          </button>
        </div>
      </div>
    </div>






  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { bloggersData } from '../../data/bloggerInfo.js'
import { trackLinkClick } from '../../utils/hybridStats.js'
import { getBloggerStats } from '../../utils/analytics.js'
import { getRealTimeStats, recordPageView } from '../../utils/statsService.js'

// 响应式数据 - 直接初始化数据，无需加载状态
const bloggers = ref(bloggersData)
const expandedBloggers = ref([])
const bloggerStats = ref(getBloggerStats())
const trafficStats = computed(() => getRealTimeStats())

const moreDataModalOpen = ref(false)
const openMoreDataModal = () => {
  moreDataModalOpen.value = true
}
const closeMoreDataModal = () => {
  moreDataModalOpen.value = false
}
const hasOnlyOnePlatform = (blogger) => (blogger?.socialAccounts?.length ?? 0) === 1

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

const hasExplicitAvatar = (blogger) => {
  const avatar = blogger?.avatar
  if (typeof avatar !== 'string') return false
  const trimmed = avatar.trim()
  if (!trimmed) return false
  // dicebear 是占位头像，不算“明确头像”
  return !trimmed.includes('dicebear.com')
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

// --- 列表/表格视图与筛选排序逻辑 ---
const viewMode = ref("grid"); // 'grid' | 'table'
const selectedPlatform = ref("all"); // 平台筛选
const sortField = ref("default"); // 'default' | 'followers' | 'name'
const sortOrder = ref("desc"); // 'asc' | 'desc'

const bloggerOrderIndex = new Map(bloggersData.map((blogger, index) => [blogger.id, index]))
const getBloggerOriginalIndex = (blogger) => bloggerOrderIndex.get(blogger.id) ?? Number.MAX_SAFE_INTEGER

// 静态定义的常用平台，用于表头排序
const staticPlatforms = ["掘金", "GitHub", "CSDN", "知乎", "微信公众号"];

// 计算所有出现在数据中的唯一平台（分组处理）
const availablePlatforms = computed(() => {
  const platforms = new Set();
  bloggersData.forEach((blogger) => {
    blogger.socialAccounts.forEach((acc) => {
      let p = acc.platform;
      if (p.includes("微信公众号")) p = "微信公众号";
      if (p.includes("腾讯云")) p = "腾讯云";
      platforms.add(p);
    });
  });

  const list = Array.from(platforms);
  return list.sort((a, b) => {
    const idxA = staticPlatforms.indexOf(a);
    const idxB = staticPlatforms.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
});

// 根据平台名称获取博主的账号信息（支持模糊匹配分组后的平台）
const getAccountByPlatform = (blogger, platformName) => {
  return blogger.socialAccounts.find((acc) => {
    if (platformName === "微信公众号") return acc.platform.includes("微信公众号");
    if (platformName === "腾讯云") return acc.platform.includes("腾讯云");
    return acc.platform === platformName;
  });
};

// 复制表格数据到剪贴板 (TSV格式，方便粘贴到Excel)
const copyTableToClipboard = () => {
  const headers = ["博主姓名", "粉丝基数", "擅长领域", "个人简介", ...availablePlatforms.value];

  const rows = filteredAndSortedBloggers.value.map((blogger) => {
    const rowData = [
      blogger.name,
      blogger.followers,
      blogger.expandedContent.specialties.join(", "),
      blogger.introduction.replace(/\n|\r/g, " "), // 简介放到领域后
    ];

    // 平台链接
    availablePlatforms.value.forEach((p) => {
      const acc = getAccountByPlatform(blogger, p);
      rowData.push(acc ? acc.url : "-");
    });

    return rowData.join("\t");
  });

  const tsvHeader = headers.join("\t");
  const tsvBody = rows.join("\n");
  const finalContent = `${tsvHeader}\n${tsvBody}`;

  navigator.clipboard
    .writeText(finalContent)
    .then(() => {
      alert("✅ 表格数据已复制！\n\n您现在可以直接在 Excel、飞书或 Notion 中粘贴。");
    })
    .catch((err) => {
      console.error("复制失败:", err);
      alert("复制失败，请重试");
    });
};

// 计算属性：筛选和排序后的博主列表
const filteredAndSortedBloggers = computed(() => {
  let result = [...bloggersData];

  // 1. 平台筛选
  if (selectedPlatform.value !== "all") {
    result = result.filter((blogger) => getAccountByPlatform(blogger, selectedPlatform.value));
  }

  // 2. 排序
  if (sortField.value === "default") {
    // 默认排序：明确头像优先；有头像时 KOL 在前、KOC 在后（组内保持原顺序）；无明确头像按粉丝量降序
    result.sort((a, b) => {
      const hasA = hasExplicitAvatar(a)
      const hasB = hasExplicitAvatar(b)

      if (hasA !== hasB) return hasA ? -1 : 1

      if (hasA && hasB) {
        const tierA = isKOL(a.followers) ? 0 : isKOC(a.followers) ? 1 : 2
        const tierB = isKOL(b.followers) ? 0 : isKOC(b.followers) ? 1 : 2
        if (tierA !== tierB) return tierA - tierB
        return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
      }

      const followersDiff = parseFollowersValue(b.followers) - parseFollowersValue(a.followers)
      if (followersDiff !== 0) return followersDiff
      return getBloggerOriginalIndex(a) - getBloggerOriginalIndex(b)
    })
  } else {
    result.sort((a, b) => {
      let valA, valB;

      if (sortField.value === "followers") {
        valA = parseFollowersValue(a.followers);
        valB = parseFollowersValue(b.followers);
      } else if (sortField.value === "name") {
        valA = a.name;
        valB = b.name;
      }

      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    })
  }

  return result
})

// 处理排序点击
const toggleSort = (field) => {
  if (sortField.value === field) {
    // 切换顺序
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    // 切换字段，默认降序
    sortField.value = field;
    sortOrder.value = "desc";
  }
}

// 页面加载时记录访问
onMounted(() => {
  recordPageView()
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>

 