<script setup>
import { ref } from 'vue'
import qrcodeImage from '../img/qrcode1.jpg'

const hidden = ref(false)
const collapsed = ref(false)
</script>

<template>
  <div v-if="!hidden" class="fixed bottom-6 right-6 z-50">
    <div class="relative animate-float">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>

      <div class="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-1.5 w-40 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div class="mb-0.5">
          <div class="relative">
            <div class="h-6 flex items-center justify-center gap-1 pr-12 text-xs font-bold text-gray-800">
              <span class="text-sm leading-none" aria-hidden="true">🔥</span>
              <span>我要合作</span>
            </div>
            <div class="absolute right-0 top-0 h-6 flex items-center gap-0.5">
              <button
                type="button"
                class="inline-flex items-center justify-center w-5 h-5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                :title="collapsed ? '展开' : '收缩'"
                @click.stop="collapsed = !collapsed"
              >
                <span class="text-sm leading-none">{{ collapsed ? '+' : '−' }}</span>
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center w-5 h-5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title="关闭"
                @click.stop="hidden = true"
              >
                <span class="text-sm leading-none">×</span>
              </button>
            </div>
          </div>
          <div v-if="!collapsed" class="text-center text-[10px] leading-tight text-gray-500 px-0.5">微信扫码 · atar24</div>
        </div>

        <div v-if="!collapsed" class="bg-gray-50 p-0.5 rounded-lg">
          <img
            :src="qrcodeImage"
            alt="微信二维码"
            class="w-full h-auto rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .animate-float {
    animation: none;
  }
}
</style>
