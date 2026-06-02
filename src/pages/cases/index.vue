<script setup>
import { casesHubItems } from '../../data/casesRegistry.js'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-gray-900">
    <AppNav />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
      <header class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Cases</p>
        <h1 class="mt-3 text-3xl md:text-4xl font-bold text-gray-900">案例与交付证据中心</h1>
        <p class="mt-4 text-sm md:text-base leading-7 text-gray-600">
          技术产品推广不能只看曝光截图，更要看目标、渠道、内容、追踪和复盘是否能闭环。这里把真实推文呈现、可交付样张和复盘口径放在一起，方便品牌方判断合作后会拿到什么证据。
        </p>
      </header>

      <section class="grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
          <div class="text-sm font-semibold text-indigo-700">市场信号</div>
          <div class="mt-2 text-3xl font-bold text-gray-900 tabular-nums">84%</div>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            Stack Overflow 2025 显示，开发者已在使用或计划使用 AI 工具。AI 产品获客已经进入技术人群的真实工作流。
          </p>
        </div>
        <div class="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
          <div class="text-sm font-semibold text-rose-700">信任阻力</div>
          <div class="mt-2 text-3xl font-bold text-gray-900 tabular-nums">46%</div>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            同一调研中，46% 开发者明确不信任 AI 输出准确性。真实测评、接入示例和技术语境会直接影响试用意愿。
          </p>
        </div>
        <div class="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div class="text-sm font-semibold text-emerald-700">企业采用</div>
          <div class="mt-2 text-3xl font-bold text-gray-900 tabular-nums">88%</div>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            McKinsey State of AI 2025 显示，88% 组织已在至少一个业务功能使用 AI。内容渠道需要服务搜索、口碑和线索的长期争夺。
          </p>
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="grid gap-4 md:grid-cols-[1.15fr_1fr] md:items-start">
          <div>
            <h2 class="text-lg font-bold text-gray-900">我们建议品牌方看 4 类证据</h2>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              真实合作可按保密要求提供脱敏材料；当前站内的样张用于提前对齐交付格式和复盘口径。
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">发布链接 / 内容截图</div>
            <div class="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">曝光 / 点击 / 注册数据</div>
            <div class="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">搜索收录 / GEO 结果</div>
            <div class="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">结算对账 / 复盘建议</div>
          </div>
        </div>
      </section>

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
                {{ item.badge }}
              </span>
              <span
                v-else
                class="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-900"
              >
                {{ item.badge }}
              </span>
            </div>
            <h2 class="mt-4 text-lg font-bold text-gray-900 group-hover:text-indigo-800">
              {{ item.title }}
            </h2>
            <div class="mt-1 text-xs font-medium text-slate-500">{{ item.scenario }}</div>
            <p class="mt-2 flex-1 text-sm leading-6 text-gray-600">
              {{ item.blurb }}
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="point in item.proofPoints"
                :key="point"
                class="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
              >
                {{ point }}
              </span>
            </div>
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
