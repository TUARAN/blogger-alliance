<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
    <AppNav />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="text-center mb-12 sm:mb-16">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          📚 联盟学院
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          汇聚学习资料与知识沉淀，为联盟成员提供可读、可归档的学习入口。
        </p>
      </div>

      <div class="relative">
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

        <div v-if="docsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
            <div class="h-32 sm:h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div
            v-for="doc in filteredDocs"
            :key="doc.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div class="relative h-32 sm:h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
              <img
                v-if="doc.cover"
                :src="doc.cover"
                :alt="doc.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 sm:top-4 left-3 sm:left-4 text-2xl sm:text-3xl">{{ doc.icon }}</div>
              <div class="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
                {{ doc.category }}
              </div>
            </div>

            <div class="p-4 sm:p-6">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{{ doc.title }}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ doc.description }}</p>

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

        <div v-if="!docsLoading && filteredDocs.length === 0" class="text-center py-12 sm:py-16">
          <div class="text-4xl sm:text-6xl mb-4">📖</div>
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">暂无相关文档</h3>
          <p class="text-gray-600">文档库正在建设中，敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { trackLinkClick } from '../../utils/stats.js'

const route = useRoute()
const router = useRouter()

/** Legacy tab values normalize to learning content; `/academy` without `tab` is unchanged. */
const validAcademyTabs = ['knowledge']

const needsAcademyTabNormalize = (tab) => {
  if (tab === undefined || tab === null || tab === '') return false
  const value = Array.isArray(tab) ? tab[0] : tab
  return !validAcademyTabs.includes(String(value))
}

watch(
  () => ({ path: route.path, tab: route.query.tab }),
  ({ path, tab }) => {
    if (path !== '/academy') return
    if (needsAcademyTabNormalize(tab)) {
      router.replace({ path: '/academy', query: { ...route.query, tab: 'knowledge' } })
    }
  },
  { immediate: true }
)

const docsData = [
  {
    id: 1,
    title: 'AI Agent 技术奥德赛',
    description: '面对AI Agent浪潮，普通开发者的成长跃迁指南。从基础到创新，再到影响力构建的系统化成长旅程。核心理念：AI Agent Developer = 技术纵深 × 系统创新 × 影响力构建。',
    category: 'AI/ML',
    tags: ['AI Agent', '技术成长', '系统化学习', '影响力构建'],
    icon: '🚀',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    updateTime: '2024-01-20',
    url: 'https://dev-odyssey.pages.dev/'
  }
]

const docsLoading = ref(true)
const docs = ref([])
const selectedDocCategory = ref('全部')

const docCategories = computed(() => ['全部', ...new Set(docs.value.map((doc) => doc.category))])
const filteredDocs = computed(() => {
  if (selectedDocCategory.value === '全部') return docs.value
  return docs.value.filter((doc) => doc.category === selectedDocCategory.value)
})

const handleDocClick = (docTitle, docUrl) => {
  trackLinkClick(docTitle, docUrl, '/academy')
}

onMounted(() => {
  setTimeout(() => {
    docs.value = docsData
    docsLoading.value = false
  }, 800)
})
</script>
