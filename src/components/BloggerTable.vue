<script setup>
defineProps({
  bloggers: { type: Array, required: true },
  availablePlatforms: { type: Array, required: true },
  fallbackAvatarFor: { type: Function, required: true },
  hasOnlyOnePlatform: { type: Function, required: true },
  getAccountByPlatform: { type: Function, required: true }
})

const emit = defineEmits(['link-click', 'request-platforms', 'avatar-error'])
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="w-56 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider select-none sticky left-0 bg-gray-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]"
            >
              博主信息
            </th>
            <th scope="col" class="w-40 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider select-none text-gray-400">
              粉丝基数
            </th>
            <th scope="col" class="w-80 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">擅长领域</th>
            <th scope="col" class="w-96 px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
              个人简介
            </th>
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
          <tr v-for="blogger in bloggers" :key="blogger.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap sticky left-0 bg-white group-hover:bg-gray-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img
                    class="h-10 w-10 rounded-full border border-gray-200 object-cover"
                    :src="blogger.avatar"
                    :alt="blogger.name"
                    :data-fallback-avatar="fallbackAvatarFor(blogger.name)"
                    @error="emit('avatar-error', $event)"
                  />
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
            <td v-for="platform in availablePlatforms" :key="platform" class="px-6 py-4 whitespace-nowrap">
              <template v-if="getAccountByPlatform(blogger, platform)">
                <div class="flex items-center gap-1.5">
                  <span class="text-lg">{{ getAccountByPlatform(blogger, platform).icon }}</span>
                  <a
                    :href="getAccountByPlatform(blogger, platform).url"
                    target="_blank"
                    class="text-sm text-indigo-400 hover:text-indigo-600 underline truncate max-w-[120px] transition-colors"
                    :title="getAccountByPlatform(blogger, platform).url"
                    @click="emit('link-click', {
                      platform: getAccountByPlatform(blogger, platform).platform,
                      url: getAccountByPlatform(blogger, platform).url,
                      bloggerName: blogger.name
                    })"
                  >
                    {{
                      getAccountByPlatform(blogger, platform).platform.includes(':')
                        ? getAccountByPlatform(blogger, platform).platform.split(':')[1]
                        : '点击查看'
                    }}
                  </a>

                  <button
                    v-if="hasOnlyOnePlatform(blogger)"
                    type="button"
                    class="text-xs text-indigo-500 hover:text-indigo-700 underline ml-1"
                    @click.stop="emit('request-platforms', blogger)"
                  >
                    平台补全中
                  </button>
                </div>
              </template>
              <span v-else class="text-gray-300 text-xs">-</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="bloggers.length === 0" class="p-8 text-center text-gray-500">没有找到匹配的博主，请尝试其他关键词。</div>
    </div>
    <div class="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-center text-gray-500">
      提示：您可以直接复制表格内容，并粘贴到 Excel、Notion 或飞书中。
    </div>
  </div>
</template>
