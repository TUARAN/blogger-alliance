<template>
  <section :id="sectionId" class="mb-10 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm scroll-mt-24">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <div class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">服务总览</div>
        <h2 class="mt-2 text-2xl font-bold text-gray-900">5 类合作 & 报价对比</h2>
      </div>
      <div class="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
        报价为参考区间，最终以合作方案为准
      </div>
    </div>
    <p class="mt-4 max-w-4xl text-sm leading-7 text-gray-600">
      按合作目标快速选型：要曝光走推文，要可量化点击走引流，要长期私域走社群；要持续内容资产 + 高提成转化，看 AI Access / 出海云访问 两个专题。各服务可单选，也可组合执行。
    </p>

    <div class="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th class="px-4 py-3 font-semibold whitespace-nowrap">服务</th>
            <th class="px-4 py-3 font-semibold whitespace-nowrap">类型</th>
            <th class="px-4 py-3 font-semibold">适合场景</th>
            <th class="px-4 py-3 font-semibold whitespace-nowrap">参考报价</th>
            <th class="px-4 py-3 font-semibold">主要效果</th>
            <th class="px-4 py-3 font-semibold whitespace-nowrap">周期</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <component :is="navLinkIs" v-bind="navLinkBind('tweet')" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-indigo-700 hover:underline">
                <span>✍️</span><span>推文服务</span>
              </component>
            </td>
            <td class="px-4 py-4 align-top">
              <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">想要快速曝光、内容种草和品牌心智</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>直发 ¥500–3k／篇／次（多平台辐射）</div>
              <div>测评 ¥1.5k–8k／篇／次（多平台辐射）</div>
              <div>深度测评 ¥5k–3w／篇／次（多平台辐射）</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">阅读量、关注转化、品牌可信度</td>
            <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">单次 / 排期</td>
          </tr>
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <component :is="navLinkIs" v-bind="navLinkBind('cpc')" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-emerald-700 hover:underline">
                <span>🔗</span><span>引流服务</span>
              </component>
            </td>
            <td class="px-4 py-4 align-top">
              <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">想要可量化点击、注册和试用线索</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>CPC ¥1–10／有效点击</div>
              <div class="text-xs text-gray-500">依品类与结算口径浮动</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">点击量、注册量、试用线索</td>
            <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">持续可投</td>
          </tr>
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <component :is="navLinkIs" v-bind="navLinkBind('community')" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-blue-700 hover:underline">
                <span>👥</span><span>社群服务</span>
              </component>
            </td>
            <td class="px-4 py-4 align-top">
              <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">常规</span>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">想要长期私域沉淀和稳定开发者关系</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>社群宣发 ¥2k–1w／项目</div>
              <div>建群项目 ¥3k–3w</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">入群人数、活跃度、长期触达资产</td>
            <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">项目制</td>
          </tr>
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <component :is="navLinkIs" v-bind="navLinkBind('ai-access')" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-orange-700 hover:underline">
                <span>🤖</span><span>AI Access</span>
              </component>
            </td>
            <td class="px-4 py-4 align-top">
              <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">专题</span>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">海外大模型 / AI 工具使用需求承接</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>高提成分佣</div>
              <div class="text-xs text-gray-500">参考 30%–60%，按成交结算</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">站点 / 仓库 / 社群资产 + 长期转化</td>
            <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">长期合作</td>
          </tr>
          <tr class="hover:bg-slate-50/60">
            <td class="px-4 py-4 align-top">
              <component :is="navLinkIs" v-bind="navLinkBind('oversea-cloud')" class="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-cyan-700 hover:underline">
                <span>🌐</span><span>出海云访问</span>
              </component>
            </td>
            <td class="px-4 py-4 align-top">
              <span class="inline-flex items-center justify-center min-w-[60px] rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">专题</span>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">出海云访问 / 跨境办公工具推广</td>
            <td class="px-4 py-4 align-top text-gray-700">
              <div>高提成分佣</div>
              <div class="text-xs text-gray-500">参考 30%–60%，按成交结算</div>
            </td>
            <td class="px-4 py-4 align-top text-gray-700">站点 / 导航 / 社群资产 + 长期转化</td>
            <td class="px-4 py-4 align-top text-gray-700 whitespace-nowrap">长期合作</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
        <span class="font-semibold text-slate-700">怎么选：</span>一次性发声 → 推文；持续要点击/线索 → 引流；想要长期沉淀 → 社群。
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
        <span class="font-semibold text-slate-700">可组合：</span>推文 + 引流追加 UTM 追踪、社群宣发承接专题流量都常见。
      </div>
      <div class="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
        <span class="font-semibold text-slate-700">专题优势：</span>由我们承担内容、站点、仓库与社群搭建，按成交分佣，零硬性投放预算。
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 设为非空时，服务列链接跳转到该路径下的对应 #锚点（用于首页等）；空字符串表示当前页 hash 锚点 */
  detailBasePath: {
    type: String,
    default: ''
  },
  sectionId: {
    type: String,
    default: 'overview'
  }
})

const navLinkIs = computed(() => (props.detailBasePath ? 'router-link' : 'a'))

function navLinkBind(hash) {
  if (props.detailBasePath) {
    return { to: { path: props.detailBasePath, hash: `#${hash}` } }
  }
  return { href: `#${hash}` }
}
</script>
