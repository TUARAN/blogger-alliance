<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto container-mobile">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">博</span>
            </div>
            <span class="text-lg sm:text-xl font-bold text-gray-900">博主联盟</span>
          </router-link>
        </div>

        <!-- Navigation Links - Desktop -->
        <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            首页
          </router-link>
          <router-link 
            to="/bloggers" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            博主列表
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            关于我们
          </router-link>
        </div>

        <!-- CTA Button - Desktop -->
        <div class="hidden md:flex items-center">
          <button class="btn-primary btn-mobile">
            加入联盟
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              :class="{ 'rotate-90': mobileMenuOpen }"
            >
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t border-gray-200 bg-white"
        @click.self="mobileMenuOpen = false"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-3 rounded-lg text-base font-medium transition-colors"
            @click="mobileMenuOpen = false"
            active-class="text-primary-600 bg-primary-50"
          >
            首页
          </router-link>
          <router-link 
            to="/bloggers" 
            class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-3 rounded-lg text-base font-medium transition-colors"
            @click="mobileMenuOpen = false"
            active-class="text-primary-600 bg-primary-50"
          >
            博主列表
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-3 rounded-lg text-base font-medium transition-colors"
            @click="mobileMenuOpen = false"
            active-class="text-primary-600 bg-primary-50"
          >
            关于我们
          </router-link>
          <div class="pt-4 pb-2">
            <button class="btn-primary btn-mobile w-full">
              加入联盟
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    const mobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    // 点击外部关闭菜单
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    // 监听路由变化，关闭移动端菜单
    const handleRouteChange = () => {
      if (mobileMenuOpen.value) {
        mobileMenuOpen.value = false
      }
    }

    return {
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      handleRouteChange
    }
  }
}
</script> 