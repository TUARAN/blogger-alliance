<script setup>
defineProps({
  blogger: { type: Object, required: true },
  expanded: { type: Boolean, default: false },
  isKol: { type: Boolean, default: false },
  isKoc: { type: Boolean, default: false },
  hasOnlyOnePlatform: { type: Boolean, default: false },
  fallbackAvatar: { type: String, required: true }
})

const emit = defineEmits(['toggle-expanded', 'link-click', 'request-platforms', 'avatar-error'])
</script>

<template>
  <div class="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
    <div class="relative p-5 xl:p-4 flex flex-col flex-1">
      <span
        v-if="isKol"
        class="absolute -top-3 -right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-amber-300/70 text-amber-600 text-xs font-semibold shadow-sm"
      >
        <span class="text-base leading-none">✨</span>
        <span class="pr-1">KOL</span>
      </span>
      <span
        v-else-if="isKoc"
        class="absolute -top-3 -right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-sky-300/80 text-sky-600 text-xs font-semibold shadow-sm"
      >
        <span class="text-base leading-none">🌟</span>
        <span class="pr-1">KOC</span>
      </span>

      <div class="mb-4">
        <div class="flex justify-center">
          <img
            :src="blogger.avatar"
            :alt="blogger.name"
            :data-fallback-avatar="fallbackAvatar"
            @error="emit('avatar-error', $event)"
            class="w-14 h-14 rounded-full object-cover border border-indigo-100 group-hover:border-indigo-300 transition-colors"
          />
        </div>

        <div class="mt-3 min-w-0">
          <div class="w-full text-center">
            <span class="relative inline-block max-w-full">
              <span class="text-lg font-semibold text-gray-900 whitespace-normal break-words leading-snug group-hover:text-indigo-600 transition-colors">
                {{ blogger.name }}
              </span>
              <span class="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600 whitespace-nowrap">
                {{ blogger.followers }}
              </span>
            </span>
          </div>
          <p class="text-xs text-gray-500 mt-1 leading-snug line-clamp-3">{{ blogger.introduction }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 mt-4">
        <template v-for="account in blogger.socialAccounts" :key="account.platform">
          <a
            v-if="account && account.url && account.url.trim() !== ''"
            :href="account.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
            @click="emit('link-click', { platform: account.platform, url: account.url, bloggerName: blogger.name })"
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
          v-if="hasOnlyOnePlatform"
          type="button"
          class="inline-flex items-center px-2.5 py-1 bg-gray-100 rounded-full text-xs text-indigo-600 whitespace-nowrap hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
          @click.stop="emit('request-platforms', blogger)"
        >
          平台补全中
        </button>
      </div>

      <button
        @click="emit('toggle-expanded', blogger.id)"
        class="mt-4 w-full py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white"
      >
        <span>{{ expanded ? '收起详情' : '查看更多' }}</span>
        <svg
          class="ml-2 w-4 h-4 transform transition-transform"
          :class="{ 'rotate-180': expanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="expanded" class="px-5 xl:px-4 pb-5 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl">
        <div class="pt-4 space-y-3 text-sm">
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
</template>
