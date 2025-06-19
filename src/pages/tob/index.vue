<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀 博主联盟
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题和简介 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          博主联盟，助你推广程序员向产品
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          我们拥有一个专业的技术博主联盟，致力于帮助优秀的产品获得技术圈的精准曝光。
          通过我们的推广服务，让你的产品快速触达目标用户群体。
        </p>
      </div>

      <!-- 博主团队展示 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
          我们的博主团队
        </h2>
        
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
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- 博主基本信息 -->
            <div class="p-6">
              <div class="flex items-center mb-4">
                <img
                  :src="blogger.avatar"
                  :alt="blogger.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                />
                <div class="ml-4 flex-1">
                  <h3 class="text-xl font-semibold text-gray-900">{{ blogger.name }}</h3>
                  <p class="text-indigo-600 font-medium">{{ blogger.followers }} 粉丝</p>
                </div>
              </div>
              
              <p class="text-gray-600 mb-4 leading-relaxed">{{ blogger.introduction }}</p>
              
              <!-- 社交账号 -->
              <div class="flex space-x-3 mb-4">
                <a
                  v-for="account in blogger.socialAccounts"
                  :key="account.platform"
                  :href="account.url"
                  target="_blank"
                  class="flex items-center px-3 py-1 bg-gray-100 hover:bg-indigo-100 rounded-full text-sm text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  <span class="mr-1">{{ account.icon }}</span>
                  {{ account.platform }}
                </a>
              </div>

              <!-- 展开/收起按钮 -->
              <button
                @click="toggleExpanded(blogger.id)"
                class="w-full py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors flex items-center justify-center"
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
      </div>

      <!-- CTA 区域 -->
      <div class="text-center bg-white rounded-2xl shadow-lg p-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          想要获得技术圈推广？
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          我们的博主团队可以帮助你的产品快速触达技术人群，提升品牌知名度和用户转化率
        </p>
        <button
          @click="showContactModal = true"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <span class="mr-2">💬</span>
          我想让你们帮我推广
        </button>
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
                  <p class="text-indigo-600">contact@blogger-alliance.com</p>
                </div>
              </div>
              
              <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <span class="text-2xl mr-3">💬</span>
                <div class="text-left">
                  <p class="font-semibold text-gray-900">微信</p>
                  <p class="text-indigo-600">blogger_alliance</p>
                </div>
              </div>
              
              <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <span class="text-2xl mr-3">📱</span>
                <div class="text-left">
                  <p class="font-semibold text-gray-900">电话</p>
                  <p class="text-indigo-600">400-123-4567</p>
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

// 切换展开状态
const toggleExpanded = (bloggerId) => {
  const index = expandedBloggers.value.indexOf(bloggerId)
  if (index > -1) {
    expandedBloggers.value.splice(index, 1)
  } else {
    expandedBloggers.value.push(bloggerId)
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