<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-gray-900">
    <AppNav />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <router-link
        to="/cases"
        class="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:text-indigo-900"
      >
        ← 全部案例
      </router-link>
      <div class="mt-6 space-y-8 md:space-y-10">
        <slot />
      </div>
    </main>
  </div>
</template>
