<template>
  <ServiceDetailPageLayout>
    <section class="space-y-6">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">大厂云服务</h1>
        <p class="mt-3 text-lg text-gray-600 leading-relaxed">
          博主联盟本身就是阿里云、腾讯云、华为云、火山引擎的认证渠道商，提供<strong class="font-semibold text-gray-800">云服务采购渠道</strong>：联系顾问拿到专属官方充值链接，在官网下单，享受渠道折扣与按量返利。
        </p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs">
          <span class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-emerald-700">渠道服务</span>
          <span class="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-slate-700">四大云厂商 · 中立选型</span>
          <span class="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-amber-700">用多少 · 返多少 · 阶梯加码</span>
        </div>
      </header>

      <section class="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
        <h2 class="text-lg font-semibold text-gray-900">和其他 5 类服务的区别</h2>
        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="rounded-xl border border-white/80 bg-white/90 p-4">
            <div class="text-sm font-semibold text-slate-700">推广合作（推文 / 引流 / 社群等）</div>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              联盟帮品牌做内容分发、点击获客或社群运营，按篇、按点击或按项目交付，核心是「帮别人传播」。
            </p>
          </div>
          <div class="rounded-xl border border-emerald-200 bg-white p-4">
            <div class="text-sm font-semibold text-emerald-800">渠道服务（大厂云服务）</div>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              联盟自己就是云厂商渠道，直接向客户提供官方充值入口与返利政策，核心是「帮客户买云更划算」。
            </p>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">渠道怎么运作</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">1. 联系联盟顾问</div>
            <p class="mt-2 text-sm text-gray-600">说明云厂商、月消费与需求，个人开发者与企业团队均可咨询。</p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">2. 获取专属官方链接</div>
            <p class="mt-2 text-sm text-gray-600">顾问生成带渠道归因的充值 / 新购链接，仍跳转云厂商官网。</p>
          </div>
          <div class="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div class="text-sm font-semibold text-gray-900">3. 官方充值 & 按量返利</div>
            <p class="mt-2 text-sm text-gray-600">用多少消费、拿多少返利；用量越大，可进入更高返利阶梯。</p>
          </div>
        </div>
      </section>

      <section class="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900">适合谁</h2>
        <ul class="mt-4 space-y-2 text-sm text-gray-600">
          <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>个人开发者、创业团队、企业 IT —— 有真实上云 / 续费需求</span></li>
          <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>希望走官方渠道价，拿长期返利与账单优化建议</span></li>
          <li class="flex items-start"><span class="text-emerald-600 mr-2">•</span><span>愿意通过专属链接在官网充值，享受长期返利与账单优化建议</span></li>
        </ul>
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

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <a
          href="https://cloudcost.blogger-alliance.cn"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-10 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800"
        >
          领取官方充值链接 →
        </a>
        <router-link
          to="/cases/enterprise-cloud"
          class="inline-flex min-h-10 items-center text-sm font-medium text-indigo-700 underline-offset-4 hover:underline"
        >
          查看渠道服务说明 →
        </router-link>
        <router-link
          to="/cloudcost"
          class="inline-flex min-h-10 items-center text-sm font-medium text-slate-600 underline-offset-4 hover:underline"
        >
          站内预览 →
        </router-link>
      </div>
    </section>
  </ServiceDetailPageLayout>
</template>

<script setup>
import ServiceDetailPageLayout from '../../../components/ServiceDetailPageLayout.vue'
</script>
