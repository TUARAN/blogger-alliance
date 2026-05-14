<script setup>
import { casesHubItems } from '../../data/casesRegistry.js'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-gray-900">
    <AppNav />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      <header class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Cases</p>
        <h1 class="mt-3 text-3xl md:text-4xl font-bold text-gray-900">合作案例</h1>
        <p class="mt-4 text-sm md:text-base leading-7 text-gray-600">
          按服务类型查看呈现方式：<strong class="font-semibold text-gray-800">推文</strong>为当前站内真实示意图文；
          其余四类为<strong class="font-semibold text-gray-800">结构化示意案例</strong>，便于对齐交付与复盘口径，后续可替换为脱敏真实素材。
        </p>
      </header>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in casesHubItems"
          :key="item.slug"
          class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:border-indigo-200"
        >
          <router-link :to="item.path" class="group flex flex-1 flex-col text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
            <div class="flex items-start justify-between gap-2">
              <span class="text-2xl" aria-hidden="true">{{ item.emoji }}</span>
              <span
                v-if="item.isMock"
                class="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900"
              >
                示意案例
              </span>
              <span
                v-else
                class="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-900"
              >
                真实示意
              </span>
            </div>
            <h2 class="mt-4 text-lg font-bold text-gray-900 group-hover:text-indigo-800">
              {{ item.title }}
            </h2>
            <p class="mt-2 flex-1 text-sm leading-6 text-gray-600">
              {{ item.blurb }}
            </p>
            <span class="mt-4 text-sm font-medium text-indigo-700 group-hover:underline">查看案例 →</span>
          </router-link>
          <div class="mt-3 border-t border-slate-100 pt-3 text-sm">
            <router-link
              :to="item.servicePath"
              class="font-medium text-slate-600 transition-colors hover:text-indigo-700"
            >
              专项介绍
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
