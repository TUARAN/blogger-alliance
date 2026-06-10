<script setup>
import { EMAIL_PROVIDER } from '../utils/emailProvider.js'

defineProps({
  variant: {
    type: String,
    default: 'inline', // 'inline' | 'box'
    validator: (v) => ['inline', 'box'].includes(v)
  }
})

const isLossy = !EMAIL_PROVIDER.trustworthy
</script>

<template>
  <p
    v-if="variant === 'inline'"
    class="mt-3 text-xs leading-5"
    :class="isLossy ? 'text-amber-700' : 'text-slate-500'"
  >
    <span aria-hidden="true">📧</span>
    邮件由 <span class="font-semibold">{{ EMAIL_PROVIDER.name }}</span> 发送（发件地址 {{ EMAIL_PROVIDER.sender }}）。<br>
    限额：{{ EMAIL_PROVIDER.limit }}。
    <span v-if="isLossy">{{ EMAIL_PROVIDER.hint }}</span>
  </p>

  <div
    v-else
    class="mt-4 rounded-xl border px-4 py-3 text-xs leading-6"
    :class="isLossy
      ? 'border-amber-200 bg-amber-50/70 text-amber-900'
      : 'border-slate-200 bg-slate-50 text-slate-700'"
  >
    <p class="font-semibold">
      <span aria-hidden="true">📧</span>
      邮件由 {{ EMAIL_PROVIDER.name }} 发送
    </p>
    <p class="mt-1">发件地址：<span class="font-mono">{{ EMAIL_PROVIDER.sender }}</span></p>
    <p>限额：{{ EMAIL_PROVIDER.limit }}</p>
    <p v-if="isLossy" class="mt-1">{{ EMAIL_PROVIDER.hint }}</p>
  </div>
</template>
