<script setup>
defineProps({
  viewMode: { type: String, required: true },
  selectedPlatform: { type: String, required: true },
  sortField: { type: String, required: true },
  sortOrder: { type: String, required: true },
  availablePlatforms: { type: Array, required: true },
  rosterFile: { type: String, required: true }
})

const emit = defineEmits([
  'update:viewMode',
  'update:selectedPlatform',
  'update:sortField',
  'update:sortOrder',
  'copy-table'
])

const onSortFieldChange = (e) => {
  emit('update:sortField', e.target.value)
  emit('update:sortOrder', 'desc')
}

const toggleOrder = (current) => emit('update:sortOrder', current === 'asc' ? 'desc' : 'asc')
</script>

<template>
  <div class="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <div class="flex flex-wrap items-center gap-4 w-full md:w-auto">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500 whitespace-nowrap">筛选平台:</span>
        <select
          :value="selectedPlatform"
          @change="emit('update:selectedPlatform', $event.target.value)"
          class="block w-40 pl-3 pr-10 h-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
        >
          <option value="all">全部平台</option>
          <option v-for="platform in availablePlatforms" :key="platform" :value="platform">
            {{ platform }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500 whitespace-nowrap">排序:</span>
        <select
          :value="sortField"
          @change="onSortFieldChange"
          class="block w-40 md:w-44 pl-3 pr-10 h-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
        >
          <option value="cooperationHeat">合作热度</option>
          <option value="recommended">合作推荐</option>
          <option value="followers">粉丝数</option>
        </select>
        <button
          v-if="!['cooperationHeat', 'recommended'].includes(sortField)"
          @click="toggleOrder(sortOrder)"
          class="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-indigo-600 border border-gray-300 rounded-md transition-colors bg-white shadow-sm"
          title="切换升序/降序"
        >
          <span class="text-lg leading-none">{{ sortOrder === 'asc' ? '⬆️' : '⬇️' }}</span>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
      <div class="flex bg-gray-100 p-1 rounded-lg shrink-0">
        <a
          :href="rosterFile"
          download="博主联盟花名册v20260106.xlsx"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 bg-white text-indigo-600 shadow-sm hover:text-indigo-700"
          title="下载博主联盟花名册到本地"
        >
          <span>⬇️</span>
          <span class="hidden sm:inline">下载到本地</span>
        </a>

        <button
          v-if="viewMode === 'table'"
          @click="emit('copy-table')"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 text-gray-500 hover:text-green-700"
          title="复制当前表格数据到剪贴板，可直接粘贴到Excel"
        >
          <span>📋</span>
          <span class="hidden sm:inline">复制表格数据</span>
        </button>
      </div>

      <div class="flex bg-gray-100 p-1 rounded-lg shrink-0">
        <button
          @click="emit('update:viewMode', 'grid')"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1"
          :class="viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        >
          <span>📷</span>
          <span class="hidden sm:inline">卡片</span>
        </button>
        <button
          @click="emit('update:viewMode', 'table')"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1"
          :class="viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        >
          <span>📋</span>
          <span class="hidden sm:inline">表格</span>
        </button>
      </div>
    </div>
  </div>
</template>
