<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-4 lg:gap-6">
            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>商单进度</span>
            </router-link>

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

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 md:p-8">
        <div class="mb-6 md:mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">查询商单进度</h1>
          <div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm md:text-base">
            当前页适读对象为博主联盟内部群成员，后续凭群聊共享口令进行查询。
          </div>
        </div>

        <div class="mb-5 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label class="block text-sm text-gray-500 mb-1">筛选服务类型</label>
            <select
              v-model="dealServiceFilter"
              class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部服务</option>
              <option v-for="item in dealServiceOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-500 mb-1">筛选状态</label>
            <select
              v-model="dealStatusFilter"
              class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部状态</option>
              <option v-for="item in dealStatusOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-500 mb-1">筛选年份</label>
            <select
              v-model="dealYearFilter"
              class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部年份</option>
              <option v-for="item in dealYearOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-500 mb-1">关键词</label>
            <input
              v-model="dealKeyword"
              type="text"
              placeholder="品牌名 / 服务名 / 分类 / 进度"
              class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-100">
          <table class="min-w-full text-sm">
            <thead class="bg-indigo-50/80 text-gray-700">
              <tr>
                <th class="px-4 py-3 text-left font-semibold">品牌/项目</th>
                <th class="px-4 py-3 text-left font-semibold">合作内容</th>
                <th class="px-4 py-3 text-left font-semibold">服务分类</th>
                <th class="px-4 py-3 text-left font-semibold">当前进度</th>
                <th class="px-4 py-3 text-left font-semibold">备注</th>
                <th class="px-4 py-3 text-left font-semibold">推荐人</th>
                <th class="px-4 py-3 text-left font-semibold">最近沟通时间</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filteredCommercialDeals"
                :key="row.id"
                class="border-t border-gray-100 hover:bg-gray-50/70"
              >
                <td class="px-4 py-3 font-medium text-gray-900">{{ row.brand }}</td>
                <td class="px-4 py-3 text-gray-700">{{ row.service }}</td>
                <td class="px-4 py-3 text-gray-700">{{ row.category || '-' }}</td>
                <td class="px-4 py-3 text-gray-700">{{ row.progress }}</td>
                <td class="px-4 py-3 text-gray-700">{{ row.remark || '-' }}</td>
                <td class="px-4 py-3 text-gray-700">{{ row.referrer || '-' }}</td>
                <td class="px-4 py-3 text-gray-500">{{ row.updatedAt }}</td>
              </tr>
              <tr v-if="filteredCommercialDeals.length === 0">
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">暂无匹配结果，请调整筛选条件。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 md:px-5 md:py-4 text-indigo-900 font-medium leading-relaxed">
          如果大家近期时间充裕、接单意愿较强，欢迎随时沟通。目前整体仍处在拓展阶段，也希望大家多多引荐合适的合作机会。
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const commercialDeals = ref([
  {
    id: 'finclip-cpc-1',
    brand: 'Finclip',
    service: '引流服务',
    category: 'CPC',
    progress: '持续计费 + 待结算',
    remark: '1 期',
    referrer: '安东尼',
    updatedAt: '2026.2.11'
  },
  {
    id: 'rollcode-cpc-1',
    brand: 'RollCode',
    service: '引流服务',
    category: 'CPC',
    progress: '持续计费 + 待结算',
    remark: '1 期',
    referrer: '安东尼',
    updatedAt: '2026.3.9'
  },
  {
    id: 'rollcode-ai-article-202603',
    brand: 'RollCode',
    service: '推文服务',
    category: 'AI写文',
    progress: '写文中',
    remark: '',
    referrer: '安东尼',
    updatedAt: '2026.3.9'
  },
  {
    id: 'chtsec-article',
    brand: '长亭科技',
    service: '推文服务',
    category: '品牌推文',
    progress: '需求沟通中',
    remark: '',
    referrer: '前端之虎陈随易',
    updatedAt: '2026.3.9'
  },
  {
    id: 'sunflower-ai-article',
    brand: '向日葵AI',
    service: '推文服务',
    category: '品牌推文',
    progress: '完成需求沟通，报价协商中',
    remark: '',
    referrer: '不如摸鱼去',
    updatedAt: '2026.3.4'
  },
  {
    id: 'moltbook-xhs',
    brand: 'moltbook.cn',
    service: '推文服务',
    category: '直发推文',
    progress: '对接验证闭环',
    remark: '已实现 1 单成交，更多需求沟通中',
    referrer: '安东尼',
    updatedAt: '2026.3.6'
  }
])

const dealServiceFilter = ref('all')
const dealStatusFilter = ref('all')
const dealYearFilter = ref('2026')
const dealKeyword = ref('')

const dealServiceOptions = computed(() => {
  return [...new Set(commercialDeals.value.map((item) => item.service))]
})

const dealStatusOptions = computed(() => {
  return [...new Set(commercialDeals.value.map((item) => item.progress))]
})

const dealYearOptions = computed(() => {
  const years = commercialDeals.value
    .map((item) => item.updatedAt?.split('.')?.[0])
    .filter(Boolean)
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
})

const filteredCommercialDeals = computed(() => {
  const keyword = dealKeyword.value.trim().toLowerCase()

  return commercialDeals.value.filter((item) => {
    const serviceMatch = dealServiceFilter.value === 'all' || item.service === dealServiceFilter.value
    const statusMatch = dealStatusFilter.value === 'all' || item.progress === dealStatusFilter.value
    const yearMatch = dealYearFilter.value === 'all' || (item.updatedAt?.split('.')?.[0] === dealYearFilter.value)

    const keywordMatch =
      keyword.length === 0 ||
      `${item.brand} ${item.service} ${item.category || ''} ${item.progress} ${item.remark || ''} ${item.referrer || ''}`.toLowerCase().includes(keyword)

    return serviceMatch && statusMatch && yearMatch && keywordMatch
  })
})
</script>
