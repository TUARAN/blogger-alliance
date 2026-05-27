<script setup>
import { ref, onMounted } from 'vue'
import qrcodeImage from '../img/qrcode1.jpg'

const hidden = ref(false)
const collapsed = ref(true)
const mounted = ref(false)

onMounted(() => {
  setTimeout(() => { mounted.value = true }, 1800)
})
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="mounted && !hidden"
      class="fixed right-4 z-50 sm:right-5"
      style="bottom: max(1rem, env(safe-area-inset-bottom));"
    >
      <!-- Collapsed pill -->
      <button
        v-if="collapsed"
        type="button"
        class="group inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 text-white pl-3.5 pr-4 py-2.5 text-sm font-medium shadow-lg hover:bg-slate-800 transition-colors"
        @click="collapsed = false"
        aria-label="展开二维码"
      >
        <span class="text-base leading-none" aria-hidden="true">🤝</span>
        <span>联系合作</span>
      </button>

      <!-- Expanded card -->
      <div
        v-else
        class="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-2 w-44"
      >
        <div class="flex items-center justify-between pl-1 pr-0.5">
          <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <span aria-hidden="true">🤝</span>
            <span>联系合作</span>
          </div>
          <div class="flex items-center gap-0.5">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="收起"
              aria-label="收起二维码"
              @click.stop="collapsed = true"
            >
              <span class="text-base leading-none">−</span>
            </button>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="关闭"
              aria-label="关闭二维码"
              @click.stop="hidden = true"
            >
              <span class="text-sm leading-none">×</span>
            </button>
          </div>
        </div>
        <div class="text-center text-[10px] leading-tight text-slate-500 mt-0.5">微信扫码 · atar24</div>
        <div class="mt-1.5 bg-slate-50 p-0.5 rounded-lg">
          <img
            :src="qrcodeImage"
            alt="微信二维码"
            class="w-full h-auto rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
