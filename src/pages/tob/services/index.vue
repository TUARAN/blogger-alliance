<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <AppNav />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">服务介绍</h1>
        <p class="mt-3 text-gray-600 max-w-3xl">
          博主联盟提供推文、引流、社群三类推广合作，AI Access 与出海云访问两类专题联运，以及单独一类大厂云服务渠道——联盟本身就是云厂商认证渠道，提供官方充值与按量返利。下方为报价与选型总览。
        </p>
      </header>

      <ServiceOverviewSection />

      <section class="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/40 px-5 py-4 text-sm leading-7 text-amber-950">
        <span class="font-semibold">说明：</span>AI Access、出海云访问为专题联运分佣；大厂云服务为渠道服务，联盟直接向客户提供云厂商官方充值与按量返利。
      </section>
    </main>

    <button
      type="button"
      class="fixed right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-gray-800 sm:right-6"
      style="bottom: max(1rem, env(safe-area-inset-bottom));"
      @click="qrModalOpen = true"
    >
      <span class="text-base leading-none">🤝</span>
      <span>联系合作</span>
    </button>

    <div v-if="qrModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" @click="qrModalOpen = false"></div>
      <div class="relative w-full max-w-sm rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl">
        <button
          type="button"
          class="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          @click="qrModalOpen = false"
          aria-label="关闭二维码弹窗"
        >
          <span class="text-lg leading-none">×</span>
        </button>
        <div class="text-center">
          <div class="text-base font-semibold text-gray-900">联系合作</div>
          <div class="mt-2 text-sm text-gray-500">扫码添加微信号 atar24</div>
        </div>
        <div class="mt-5 rounded-2xl bg-gray-50 p-3">
          <img
            :src="qrcodeImage"
            alt="微信二维码"
            class="w-full h-auto rounded-xl object-contain"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="hidden h-72 w-full items-center justify-center rounded-xl bg-gray-100">
            <div class="text-center">
              <div class="text-2xl">📱</div>
              <div class="mt-2 text-xs text-gray-500">二维码图片</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ServiceOverviewSection from '../../../components/ServiceOverviewSection.vue'
import qrcodeImage from '../../../img/qrcode1.jpg'

const qrModalOpen = ref(false)

/** 旧版 /tob/services# 锚点 → 专项页 */
const HASH_TO_PATH = {
  '#tweet': '/tob/services/tweet',
  '#cpc': '/tob/services/cpc',
  '#community': '/tob/services/community',
  '#ai-access': '/tob/services/ai-access',
  '#oversea-cloud': '/tob/services/oversea-cloud',
  '#cloud-cost': '/tob/services/cloud-cost',
  '#enterprise-cloud': '/tob/services/cloud-cost'
}

const route = useRoute()
const router = useRouter()

function redirectLegacyHash() {
  const target = HASH_TO_PATH[route.hash]
  if (target) router.replace({ path: target, query: route.query })
}

onMounted(redirectLegacyHash)
watch(() => route.hash, redirectLegacyHash)
</script>
