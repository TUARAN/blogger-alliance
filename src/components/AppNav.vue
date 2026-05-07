<script setup>
defineProps({
  logoTo: { type: String, default: '/tob' },
  workspaceActive: { type: Boolean, default: false }
})
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 gap-4">
        <div class="flex items-center min-w-0">
          <router-link
            :to="logoTo"
            class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate"
          >
            🚀开发者博主联盟
          </router-link>
        </div>

        <div class="flex items-center gap-4 lg:gap-6">
          <slot name="links">
            <router-link
              to="/workspace"
              class="inline-flex items-center gap-1.5 transition-colors font-medium text-base"
              :class="workspaceActive ? 'text-gray-700 font-semibold' : 'text-gray-500 hover:text-gray-700'"
            >
              <span class="text-base leading-none">🗂️</span>
              <span>联盟工作台</span>
            </router-link>
          </slot>
          <WebLlmNavBot />
        </div>
      </div>
    </div>
  </nav>
</template>
