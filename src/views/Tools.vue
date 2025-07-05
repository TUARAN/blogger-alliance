<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀 开发者博主联盟
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
    <div class="container-mobile max-w-7xl mx-auto py-8 sm:py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12 sm:mb-16">
        <h1 class="text-mobile-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          精选开发工具与项目
        </h1>
        <p class="text-mobile-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          发现优质的技术工具和开源项目，提升开发效率，解决工作中的各种问题
        </p>
      </div>

      <!-- 分类筛选 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-mobile"
            :class="selectedCategory === category 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm'"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading 状态 -->
      <div v-if="toolsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
          <div class="h-32 sm:h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      <!-- 工具卡片 -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <!-- 工具封面 -->
          <div class="relative h-32 sm:h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
            <img
              :src="tool.cover"
              :alt="tool.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-3 sm:top-4 left-3 sm:left-4 text-2xl sm:text-3xl">{{ tool.icon }}</div>
            <div class="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
              {{ tool.category }}
            </div>
          </div>

          <!-- 工具信息 -->
          <div class="p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{{ tool.name }}</h3>
            <p class="text-gray-600 mb-4 leading-relaxed text-mobile">{{ tool.description }}</p>
            
            <!-- 功能特性 -->
            <div class="mb-4 sm:mb-6">
              <h4 class="font-semibold text-gray-900 mb-2 text-mobile">主要功能</h4>
              <div class="flex flex-wrap gap-1 sm:gap-2">
                <span
                  v-for="feature in tool.features.slice(0, 3)"
                  :key="feature"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs sm:text-sm"
                >
                  {{ feature }}
                </span>
                <span v-if="tool.features.length > 3" class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs sm:text-sm">
                  +{{ tool.features.length - 3 }}
                </span>
              </div>
            </div>

            <!-- 跳转按钮 -->
            <a
              :href="tool.url"
              target="_blank"
              class="block w-full py-2 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-center transition-colors text-mobile"
              @click="handleToolClick(tool.name, tool.url)"
            >
              立即体验
            </a>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!toolsLoading && filteredTools.length === 0" class="text-center py-12 sm:py-16">
        <div class="text-4xl sm:text-6xl mb-4">🔍</div>
        <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">暂无相关工具</h3>
        <p class="text-gray-600 text-mobile">请尝试选择其他分类或稍后再来查看</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { toolsData } from '../data/mockData.js'
import { trackLinkClick } from '../utils/hybridStats.js'

// 响应式数据
const toolsLoading = ref(true)
const tools = ref([])
const selectedCategory = ref('全部')

// 计算属性
const categories = computed(() => {
  const cats = ['全部', ...new Set(tools.value.map(tool => tool.category))]
  return cats
})

const filteredTools = computed(() => {
  if (selectedCategory.value === '全部') {
    return tools.value
  }
  return tools.value.filter(tool => tool.category === selectedCategory.value)
})

// 处理工具点击
const handleToolClick = (toolName, toolUrl) => {
  trackLinkClick(toolName, toolUrl, '/tools')
}

// 模拟加载工具数据
onMounted(() => {
  setTimeout(() => {
    tools.value = toolsData
    toolsLoading.value = false
  }, 1000)
})
</script> 