<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const brands = [
  { name: 'BuildSOM', img: '/partners/buildsom.png' },
  { name: '向日葵AI', img: '/partners/sunflower-ai.png' },
  { name: 'Rollcode', img: '/partners/rollcode.png' }
]

const activeIndex = ref(0)
const touchStartX = ref(0)
const touchStartY = ref(0)
let autoPlayTimer = null

const currentBrand = computed(() => brands[activeIndex.value])

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + brands.length) % brands.length
}

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % brands.length
}

const goToSlide = (index) => {
  activeIndex.value = index
}

const startAutoPlay = () => {
  if (autoPlayTimer) return
  autoPlayTimer = setInterval(nextSlide, 3200)
}

const stopAutoPlay = () => {
  if (!autoPlayTimer) return
  clearInterval(autoPlayTimer)
  autoPlayTimer = null
}

const handleTouchStart = (event) => {
  const [touch] = event.touches
  if (!touch) return
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  stopAutoPlay()
}

const handleTouchEnd = (event) => {
  const [touch] = event.changedTouches
  if (!touch) return

  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value
  const threshold = 40

  // 只在横向滑动明显时触发切换，避免影响页面竖向滚动。
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
    if (deltaX < 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  startAutoPlay()
}

const handleTouchCancel = () => {
  startAutoPlay()
}

onMounted(startAutoPlay)
onBeforeUnmount(stopAutoPlay)
</script>

<template>
  <div
    class="swipe-area relative mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchCancel"
  >
    <Transition name="fade-slide" mode="out-in">
      <div :key="currentBrand.name" class="flex flex-col items-center gap-4">
        <div class="h-24 sm:h-28 w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 px-4">
          <img :src="currentBrand.img" :alt="`${currentBrand.name} logo`" class="max-h-full max-w-full object-contain" />
        </div>
        <p class="text-sm font-medium text-slate-600">{{ currentBrand.name }}</p>
      </div>
    </Transition>

    <div class="mt-4 flex items-center justify-center gap-2">
      <button
        v-for="(brand, index) in brands"
        :key="brand.name"
        type="button"
        class="h-2.5 w-2.5 rounded-full transition-all"
        :class="index === activeIndex ? 'bg-indigo-500 w-6' : 'bg-slate-300 hover:bg-slate-400'"
        :aria-label="`切换到 ${brand.name}`"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.swipe-area {
  touch-action: pan-y;
}
</style>
