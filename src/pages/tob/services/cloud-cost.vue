<template>
  <ServiceDetailPageLayout>
    <section class="space-y-6">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">大厂云服务 推广</h1>
        <p class="mt-3 text-lg text-gray-600">
          聚焦阿里云、腾讯云、华为云、火山引擎等头部云厂商的渠道联运：以技术内容、多云选型、账单体检与开发者社群承接长期分佣，引导用户联系后生成官方归因专属充值链接。
        </p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs">
          <span class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-emerald-700">四大云厂商 · 中立选型</span>
          <span class="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-amber-700">按成交分佣</span>
        </div>
      </header>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">核心说明区</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">这项服务在做什么</div>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
              搭建大厂云服务联运落地页（CloudCost Lab），用「免费云账单体检 + 多云选型内容」获取技术团队线索；用户联系后由渠道顾问生成带归因的专属充值链接，跳转云厂商官方页面完成下单。
            </p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">适合谁</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>头部云厂商渠道代理 / 云 MSP：需技术信任背书与内容获客</span></li>
              <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>有上云需求的企业 / 创业技术团队</span></li>
              <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>愿意按长期成交分佣合作，而非一次性硬广</span></li>
            </ul>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white/70 p-4">
            <div class="text-sm font-semibold text-gray-900">我们的现有资产</div>
            <ul class="mt-2 space-y-1.5 text-sm text-gray-600">
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>cloudcost.blogger-alliance.cn 联运落地页</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>技术博主矩阵 + 独立调研背书</span></li>
              <li class="flex items-start"><span class="text-gray-500 mr-2">•</span><span>开发者社群与 GEO / SEO 长尾内容承接</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">覆盖云厂商</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="name in ['阿里云', '腾讯云', '华为云', '火山引擎']"
            :key="name"
            class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            {{ name }}
          </span>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">转化流程</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">1. 内容获客</div>
            <p class="mt-2 text-sm text-gray-600">落地页 / 推文 / 社群引导提交需求或微信联系</p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">2. 生成专属链接</div>
            <p class="mt-2 text-sm text-gray-600">渠道顾问按云厂商与账号情况生成官方充值归因链接</p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">3. 官方下单 & 分佣</div>
            <p class="mt-2 text-sm text-gray-600">客户官方充值享渠道折扣；联盟按成交结算联运分佣</p>
          </div>
        </div>
      </section>

      <div class="flex flex-wrap gap-3 pt-2">
        <a
          href="https://cloudcost.blogger-alliance.cn"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
        >
          打开联运落地页 →
        </a>
        <router-link to="/cases/enterprise-cloud" class="text-sm font-medium text-indigo-700 underline-offset-4 hover:underline">
          查看合作案例 →
        </router-link>
        <router-link to="/cloudcost" class="text-sm font-medium text-slate-600 underline-offset-4 hover:underline">
          站内预览 →
        </router-link>
      </div>
    </section>
  </ServiceDetailPageLayout>
</template>

<script setup>
import ServiceDetailPageLayout from '../../../components/ServiceDetailPageLayout.vue'
</script>
