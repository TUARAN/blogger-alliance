<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
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
            <router-link to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12 sm:mb-16">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          📚 联盟学院
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          知识共享平台与工具资源库，汇聚技术文档、学习资源、开发工具，助力开发者持续成长
        </p>
      </div>

      <!-- 移动端标签切换 -->
      <div class="lg:hidden flex justify-center mb-8">
        <div class="inline-flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200/50">
          <button
            @click="activeTab = 'knowledge'"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            :class="activeTab === 'knowledge' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-indigo-600'"
          >
            <span class="inline-flex items-center gap-2">
              <span>📖</span>
              <span>学习知识</span>
            </span>
          </button>
          <button
            @click="activeTab = 'tools'"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            :class="activeTab === 'tools' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-indigo-600'"
          >
            <span class="inline-flex items-center gap-2">
              <span>🛠️</span>
              <span>使用工具</span>
            </span>
          </button>
        </div>
      </div>

      <!-- 左侧悬浮页签（桌面端） -->
      <div class="hidden lg:block fixed left-6 top-32 z-30">
        <div class="flex flex-col gap-3 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-200/50">
          <!-- 导航标题 -->
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1">
            导航
          </div>
          <button
            @click="activeTab = 'knowledge'"
            class="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[120px]"
            :class="activeTab === 'knowledge' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'"
          >
            <span>📖</span>
            <span>学习知识</span>
          </button>
          <button
            @click="activeTab = 'tools'"
            class="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[120px]"
            :class="activeTab === 'tools' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'"
          >
            <span>🛠️</span>
            <span>使用工具</span>
          </button>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="relative">

      <!-- 学习知识部分 -->
      <div v-show="activeTab === 'knowledge'">
        <!-- 分类导航 -->
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button
              v-for="category in docCategories"
              :key="category"
              @click="selectedDocCategory = category"
              class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300"
              :class="selectedDocCategory === category 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm'"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Loading 状态 -->
        <div v-if="docsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
            <div class="h-32 sm:h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <!-- 文档卡片 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div
            v-for="doc in filteredDocs"
            :key="doc.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <!-- 文档封面 -->
            <div class="relative h-32 sm:h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
              <div class="absolute top-3 sm:top-4 left-3 sm:left-4 text-2xl sm:text-3xl">{{ doc.icon }}</div>
              <div class="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
                {{ doc.category }}
              </div>
              <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                <div class="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div class="text-xs text-gray-600">更新于 {{ doc.updateTime }}</div>
                </div>
              </div>
            </div>

            <!-- 文档信息 -->
            <div class="p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{{ doc.title }}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ doc.description }}</p>
              
              <!-- 标签 -->
              <div class="mb-4 sm:mb-6">
                <div class="flex flex-wrap gap-1 sm:gap-2">
                  <span
                    v-for="tag in doc.tags.slice(0, 3)"
                    :key="tag"
                    class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs sm:text-sm"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="doc.tags.length > 3" class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs sm:text-sm">
                    +{{ doc.tags.length - 3 }}
                  </span>
                </div>
              </div>

              <!-- 操作按钮 -->
              <a
                :href="doc.url"
                target="_blank"
                class="block w-full py-2 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-center transition-colors"
                @click="handleDocClick(doc.title, doc.url)"
              >
                查看文档
              </a>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="!docsLoading && filteredDocs.length === 0" class="text-center py-12 sm:py-16">
          <div class="text-4xl sm:text-6xl mb-4">📖</div>
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">暂无相关文档</h3>
          <p class="text-gray-600">文档库正在建设中，敬请期待</p>
        </div>
      </div>

      <!-- 使用工具部分 -->
      <div v-show="activeTab === 'tools'">
        <!-- 分类筛选 -->
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button
              v-for="category in toolCategories"
              :key="category"
              @click="selectedToolCategory = category"
              class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300"
              :class="selectedToolCategory === category 
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
                v-if="tool.cover"
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
              <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ tool.description }}</p>
              
              <!-- 功能特性 -->
              <div class="mb-4 sm:mb-6">
                <h4 class="font-semibold text-gray-900 mb-2 text-sm">主要功能</h4>
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
                class="block w-full py-2 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-center transition-colors"
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
          <p class="text-gray-600">请尝试选择其他分类或稍后再来查看</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { trackLinkClick } from '../../utils/hybridStats.js'
import { toolsData } from '../../data/bloggerInfo.js'

// 标签切换
const activeTab = ref('knowledge')

// 文档相关
const docsLoading = ref(true)
const docs = ref([])
const selectedDocCategory = ref('全部')

// 工具相关
const toolsLoading = ref(true)
const tools = ref([])
const selectedToolCategory = ref('全部')

// 示例文档数据
const docsData = [
  {
    id: 1,
    title: '前端开发最佳实践',
    description: '涵盖现代前端开发的核心技术栈、工程化实践和性能优化方案',
    category: '前端开发',
    tags: ['Vue', 'React', '性能优化'],
    icon: '🎨',
    updateTime: '2024-01-15',
    url: '#'
  },
  {
    id: 2,
    title: '后端架构设计指南',
    description: '从微服务到分布式系统，深入浅出讲解后端架构设计原则',
    category: '后端开发',
    tags: ['微服务', '分布式', '架构'],
    icon: '🏗️',
    updateTime: '2024-01-10',
    url: '#'
  },
  {
    id: 3,
    title: 'AI/ML 应用实战',
    description: '机器学习实战案例，从理论到应用的全流程指南',
    category: 'AI/ML',
    tags: ['机器学习', '深度学习', '实战'],
    icon: '🤖',
    updateTime: '2024-01-08',
    url: '#'
  },
  {
    id: 4,
    title: 'DevOps 自动化实践',
    description: 'CI/CD、容器化、监控告警等 DevOps 核心实践教程',
    category: 'DevOps',
    tags: ['CI/CD', 'Docker', 'K8s'],
    icon: '⚙️',
    updateTime: '2024-01-05',
    url: '#'
  },
  {
    id: 5,
    title: '开源项目贡献指南',
    description: '如何参与开源项目，贡献代码并建立技术影响力',
    category: '开源',
    tags: ['GitHub', '开源', '协作'],
    icon: '🌟',
    updateTime: '2024-01-03',
    url: '#'
  },
  {
    id: 6,
    title: '技术写作技巧',
    description: '如何写出高质量的技术文章，建立个人技术品牌',
    category: '写作',
    tags: ['写作', '博客', '影响力'],
    icon: '✍️',
    updateTime: '2024-01-01',
    url: '#'
  }
]

// 计算属性
const docCategories = computed(() => {
  const cats = ['全部', ...new Set(docs.value.map(doc => doc.category))]
  return cats
})

const filteredDocs = computed(() => {
  if (selectedDocCategory.value === '全部') {
    return docs.value
  }
  return docs.value.filter(doc => doc.category === selectedDocCategory.value)
})

const toolCategories = computed(() => {
  const cats = ['全部', ...new Set(tools.value.map(tool => tool.category))]
  return cats
})

const filteredTools = computed(() => {
  if (selectedToolCategory.value === '全部') {
    return tools.value
  }
  return tools.value.filter(tool => tool.category === selectedToolCategory.value)
})

// 处理文档点击
const handleDocClick = (docTitle, docUrl) => {
  trackLinkClick(docTitle, docUrl, '/academy')
}

// 处理工具点击
const handleToolClick = (toolName, toolUrl) => {
  trackLinkClick(toolName, toolUrl, '/academy')
}

// 模拟加载数据
onMounted(() => {
  // 加载文档数据
  setTimeout(() => {
    docs.value = docsData
    docsLoading.value = false
  }, 800)

  // 加载工具数据
  setTimeout(() => {
    tools.value = toolsData
    toolsLoading.value = false
  }, 1000)
})
</script>