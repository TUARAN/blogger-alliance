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
  <div class="mb-8 flex flex-col md:flex-row justify-between items-center gap-3">
    <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-500 whitespace-nowrap">筛选</span>
        <select
          :value="selectedPlatform"
          @change="emit('update:selectedPlatform', $event.target.value)"
          class="block w-36 pl-3 pr-8 h-9 text-sm border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 rounded-md border text-slate-700"
        >
          <option value="all">全部平台</option>
          <option v-for="platform in availablePlatforms" :key="platform" :value="platform">
            {{ platform }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-500 whitespace-nowrap">排序</span>
        <select
          :value="sortField"
          @change="onSortFieldChange"
          class="block w-36 md:w-40 pl-3 pr-8 h-9 text-sm border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 rounded-md border text-slate-700"
        >
          <option value="cooperationHeat">合作热度</option>
          <option value="recommended">合作推荐</option>
          <option value="followers">粉丝数</option>
        </select>
        <button
          v-if="!['cooperationHeat', 'recommended'].includes(sortField)"
          @click="toggleOrder(sortOrder)"
          class="flex items-center justify-center w-9 h-9 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md transition-colors bg-white"
          title="切换升序/降序"
        >
          <span class="text-sm leading-none">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
      <!-- 视图切换 (icon-only) -->
      <div class="flex border border-slate-200 rounded-md p-0.5 shrink-0 bg-white">
        <button
          @click="emit('update:viewMode', 'grid')"
          class="w-8 h-8 rounded transition-colors flex items-center justify-center"
          :class="viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'"
          title="卡片视图"
          aria-label="卡片视图"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M3 4.75A1.75 1.75 0 014.75 3h3.5A1.75 1.75 0 0110 4.75v3.5A1.75 1.75 0 018.25 10h-3.5A1.75 1.75 0 013 8.25v-3.5zm9 0A1.75 1.75 0 0113.75 3h3.5A1.75 1.75 0 0119 4.75v3.5A1.75 1.75 0 0117.25 10h-3.5A1.75 1.75 0 0112 8.25v-3.5zm-9 9A1.75 1.75 0 014.75 12h3.5A1.75 1.75 0 0110 13.75v3.5A1.75 1.75 0 018.25 19h-3.5A1.75 1.75 0 013 17.25v-3.5zm9 0A1.75 1.75 0 0113.75 12h3.5A1.75 1.75 0 0119 13.75v3.5A1.75 1.75 0 0117.25 19h-3.5A1.75 1.75 0 0112 17.25v-3.5z" /></svg>
        </button>
        <button
          @click="emit('update:viewMode', 'table')"
          class="w-8 h-8 rounded transition-colors flex items-center justify-center"
          :class="viewMode === 'table' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'"
          title="表格视图"
          aria-label="表格视图"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v3h4V5H5zm6 0v3h4V5h-4zM5 10v3h4v-3H5zm6 0v3h4v-3h-4zM5 15v0h4v0H5zm6 0v0h4v0h-4z" clip-rule="evenodd" /></svg>
        </button>
      </div>

      <!-- 工具按钮 (icon-only) -->
      <a
        :href="rosterFile"
        download="博主联盟花名册v20260106.xlsx"
        class="flex items-center justify-center w-9 h-9 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md bg-white transition-colors"
        title="下载博主联盟花名册"
        aria-label="下载花名册"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10 2a.75.75 0 01.75.75v8.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V2.75A.75.75 0 0110 2zM3.75 16a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H3.75z" clip-rule="evenodd" /></svg>
      </a>
      <button
        v-if="viewMode === 'table'"
        @click="emit('copy-table')"
        class="flex items-center justify-center w-9 h-9 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-md bg-white transition-colors"
        title="复制表格数据到剪贴板"
        aria-label="复制表格"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" /><path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" /></svg>
      </button>
    </div>
  </div>
</template>
