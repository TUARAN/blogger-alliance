<script setup>
defineProps({
  active: {
    type: String,
    required: true,
    validator: (value) => ['login', 'register'].includes(value)
  }
})
</script>

<template>
  <div>
    <p class="text-sm font-medium text-slate-700">请选择登录或注册</p>
    <div class="mt-3 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="账号入口">
      <router-link
        to="/auth/login"
        role="tab"
        :aria-selected="active === 'login'"
        class="flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors"
        :class="active === 'login'
          ? 'bg-white text-indigo-700 shadow-sm'
          : 'text-slate-600 hover:text-slate-900'"
      >
        已有账号，登录
      </router-link>
      <router-link
        to="/auth/register"
        role="tab"
        :aria-selected="active === 'register'"
        class="flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors"
        :class="active === 'register'
          ? 'bg-white text-indigo-700 shadow-sm'
          : 'text-slate-600 hover:text-slate-900'"
      >
        新用户，注册
      </router-link>
    </div>
  </div>
</template>
