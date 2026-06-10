<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { NETWORK_ERROR_COPY, probeSupabaseReachable } from '../utils/networkProbe.js'

const { isSupabaseConfigured, initialized } = useAuth()

const checking = ref(false)
const result = ref(null)

async function runProbe() {
  if (!isSupabaseConfigured.value) {
    result.value = null
    return
  }

  checking.value = true
  try {
    result.value = await probeSupabaseReachable({ timeout: 5000 })
  } finally {
    checking.value = false
  }
}

// 初始化完成后首次探测；如果尚未初始化，等 initialized 变 true 再触发。
onMounted(() => {
  if (initialized.value) {
    runProbe()
  }
})

watch(initialized, (val) => {
  if (val && !result.value && !checking.value) {
    runProbe()
  }
})
</script>

<template>
  <div
    v-if="checking"
    class="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
  >
    正在检测账号服务连通性...
  </div>

  <div
    v-else-if="result && !result.ok"
    class="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
  >
    <p class="font-semibold">账号服务连不上</p>
    <p class="mt-1 leading-6">
      {{ NETWORK_ERROR_COPY[result.reason] || NETWORK_ERROR_COPY.unknown }}
    </p>
    <button
      type="button"
      class="mt-3 inline-flex h-8 items-center rounded-lg border border-amber-300 bg-white px-3 text-xs font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-60"
      :disabled="checking"
      @click="runProbe"
    >
      重新检测
    </button>
  </div>
</template>
