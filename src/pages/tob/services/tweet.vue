<template>
  <ServiceDetailPageLayout>
    <section class="space-y-6">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">推文服务</h1>
        <p class="mt-3 text-gray-600">
          面向技术受众的内容分发合作，提供从「直发」到「深度测评」的不同强度推文方案，兼顾速度、可信度与转化质量。可在掘金 / 知乎 / 小红书 / 公众号 / X 等多平台同时分发，快速形成话题密度。
        </p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs">
          <span class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-emerald-700">5 大平台同发</span>
          <span class="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-amber-700">直发 / 测评 / 深度测评 三档可选</span>
        </div>
      </header>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">什么是「推文合作」</div>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">以博主账号在内容平台发布图文/长图/短文等形式的产品内容。可以是甲方提供的稿件直发，也可以是基于真实试用体验的测评推文。</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">适合谁</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>希望快速触达开发者受众，获得曝光与心智</span></li>
              <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>开发者工具、SaaS、AI 产品、技术课程、硬件外设等</span></li>
              <li class="flex items-start"><span class="text-indigo-600 mr-2">•</span><span>需要「内容可信度」来提升点击与转化</span></li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">不适合谁</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>只追求硬广口播，不接受基本的内容合规与体验验证</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>无法提供可试用账号、素材、卖点信息</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>产品与开发者受众不匹配</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">推文类型（3 选 1 / 可组合）</h2>
        <p class="mt-2 text-sm text-gray-600">三种类型的核心差异：投入时间 vs 内容可信度 vs 转化质量。</p>
        <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="relative rounded-xl border border-gray-200 bg-indigo-50/40 p-4">
            <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-indigo-200 text-indigo-700 text-xs font-semibold">1</div>
            <div class="pl-10 text-sm font-semibold text-gray-900">直发推文</div>
            <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">甲方提供成稿/海报/要点，博主按约定格式直接发布。</p>
          </div>
          <div class="relative rounded-xl border border-gray-200 bg-emerald-50/40 p-4">
            <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs font-semibold">2</div>
            <div class="pl-10 text-sm font-semibold text-gray-900">常规测评推文</div>
            <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">基于试用体验写常规产品测评，覆盖亮点、适用人群、上手成本与使用建议。</p>
          </div>
          <div class="relative rounded-xl border border-gray-200 bg-sky-50/40 p-4">
            <div class="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-xs font-semibold">3</div>
            <div class="pl-10 text-sm font-semibold text-gray-900">深度测评推文</div>
            <p class="mt-2 pl-10 text-sm text-gray-600 leading-relaxed">带一点开发性质的测评，例如接入 Demo、API 调用、工作流对接和 Benchmark。</p>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">交付清单（可按需求定制）</h2>
        <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">基础交付</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>1 条推文发布（按约定平台与时间）</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>素材规范：标题、正文、配图、链接、引导语</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>发布后链接回传与基础数据截图</span></li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">测评增强</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>测评结构：痛点、方案、亮点、适用人群、建议</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>同类对比和选型建议</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>评论区基础互动</span></li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">深度内容加项</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>Demo、接入示例、简单 Benchmark</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>踩坑点与解决思路</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>可选二次分发或站外同步</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">合作流程</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 1 步</div><div class="mt-1 text-sm font-semibold text-gray-900">需求对齐</div><div class="mt-1 text-sm text-gray-600">目标、受众、类型与排期确认。</div></div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 2 步</div><div class="mt-1 text-sm font-semibold text-gray-900">素材/试用准备</div><div class="mt-1 text-sm text-gray-600">成稿、卖点、素材包或试用账号和技术对接人。</div></div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 3 步</div><div class="mt-1 text-sm font-semibold text-gray-900">撰写与确认</div><div class="mt-1 text-sm text-gray-600">直发快速确认；测评根据体验完成初稿与修改。</div></div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4"><div class="text-xs font-semibold text-gray-500">第 4 步</div><div class="mt-1 text-sm font-semibold text-gray-900">发布与复盘</div><div class="mt-1 text-sm text-gray-600">按排期发布，回传链接和数据，复盘优化方向。</div></div>
        </div>
      </section>

      <div class="flex flex-wrap gap-3 pt-2">
        <router-link
          to="/cases/tweet"
          class="text-sm font-medium text-indigo-700 underline-offset-4 hover:underline"
        >
          查看合作案例 →
        </router-link>
      </div>
    </section>
  </ServiceDetailPageLayout>
</template>

<script setup>
import ServiceDetailPageLayout from '../../../components/ServiceDetailPageLayout.vue'
</script>
