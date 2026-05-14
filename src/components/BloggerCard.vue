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
  <div class="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300 flex flex-col h-full">
    <div class="relative p-5 xl:p-4 flex flex-col flex-1">
      <span
        v-if="isKol"
        class="absolute -top-2.5 -right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-medium tracking-wide shadow-sm"
      >
        <span>KOL</span>
      </span>
      <span
        v-else-if="isKoc"
        class="absolute -top-2.5 -right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-300 text-slate-700 text-[10px] font-medium tracking-wide shadow-sm"
      >
        <span>KOC</span>
      </span>

      <div class="mb-4">
        <div class="flex justify-center">
          <img
            :src="blogger.avatar"
            :alt="blogger.name"
            :data-fallback-avatar="fallbackAvatar"
            loading="lazy"
            decoding="async"
            @error="emit('avatar-error', $event)"
            class="w-14 h-14 rounded-full object-cover border border-slate-200 group-hover:border-slate-300 transition-colors"
          />
        </div>

        <div class="mt-3 min-w-0">
          <div class="w-full text-center">
            <span class="relative inline-block max-w-full">
              <span class="text-lg font-semibold text-slate-900 whitespace-normal break-words leading-snug transition-colors">
                {{ blogger.name }}
              </span>
              <span class="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 whitespace-nowrap tabular-nums">
                {{ blogger.followers }}
              </span>
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1 leading-snug line-clamp-3">{{ blogger.introduction }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 mt-4">
        <template v-for="account in blogger.socialAccounts" :key="account.platform">
          <a
            v-if="account && account.url && account.url.trim() !== ''"
            :href="account.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] text-slate-600 border border-slate-200 whitespace-nowrap hover:border-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            @click="emit('link-click', { platform: account.platform, url: account.url, bloggerName: blogger.name })"
          >
            <span class="mr-1 opacity-80">{{ account.icon }}</span>
            {{ account.platform }}
          </a>
          <span
            v-else
            class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] text-slate-400 border border-slate-100 whitespace-nowrap"
          >
            <span class="mr-1 opacity-80">{{ account.icon }}</span>
            {{ account.platform }}
          </span>
        </template>

        <button
          v-if="hasOnlyOnePlatform"
          type="button"
          class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] text-slate-500 border border-dashed border-slate-300 whitespace-nowrap hover:border-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          @click.stop="emit('request-platforms', blogger)"
        >
          平台补全中
        </button>
      </div>

      <button
        @click="emit('toggle-expanded', blogger.id)"
        class="mt-4 w-full py-2 px-3 text-sm text-slate-600 rounded-lg border border-slate-200 hover:border-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center"
      >
        <span>{{ expanded ? '收起详情' : '查看更多' }}</span>
        <svg
          class="ml-1.5 w-3.5 h-3.5 transform transition-transform"
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
      <div v-show="expanded" class="px-5 xl:px-4 pb-5 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
        <div class="pt-4 space-y-3 text-sm">
          <div>
            <h4 class="font-medium text-slate-900 mb-1.5 text-xs uppercase tracking-wider">专长领域</h4>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="specialty in blogger.expandedContent.specialties"
                :key="specialty"
                class="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md text-xs"
              >
                {{ specialty }}
              </span>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-slate-900 mb-1.5 text-xs uppercase tracking-wider">成就荣誉</h4>
            <ul class="space-y-1">
              <li
                v-for="achievement in blogger.expandedContent.achievements"
                :key="achievement"
                class="text-slate-600 flex items-start"
              >
                <span class="text-slate-400 mr-1.5">·</span>
                {{ achievement }}
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium text-slate-900 mb-1.5 text-xs uppercase tracking-wider">最近文章</h4>
            <ul class="space-y-1">
              <li
                v-for="post in blogger.expandedContent.recentPosts"
                :key="post"
                class="text-slate-600 flex items-start"
              >
                <span class="text-slate-400 mr-1.5">·</span>
                {{ post }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
