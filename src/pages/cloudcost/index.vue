<script setup>
import { onMounted, reactive, ref } from 'vue'
import CloudCostContactFab from '../../components/CloudCostContactFab.vue'
import { showToast } from '../../utils/toast.js'

const form = reactive({
  company: '',
  contactName: '',
  wechatOrPhone: '',
  cloudProvider: '',
  monthlySpend: '',
  needType: '',
  note: ''
})

const submitting = ref(false)
const submitted = ref(false)

const cloudProviders = [
  { value: 'aliyun', label: '阿里云' },
  { value: 'tencent', label: '腾讯云' },
  { value: 'huawei', label: '华为云' },
  { value: 'volcengine', label: '火山引擎' },
  { value: 'multi', label: '多云 / 正在选型' },
  { value: 'none', label: '尚未上云' }
]

const monthlySpendOptions = [
  { value: 'lt3k', label: '暂无或低于 ¥3,000 / 月' },
  { value: '3k-10k', label: '¥3,000 – ¥10,000 / 月' },
  { value: '10k-50k', label: '¥10,000 – ¥50,000 / 月' },
  { value: '50k-200k', label: '¥50,000 – ¥200,000 / 月' },
  { value: 'gt200k', label: '¥200,000+ / 月' }
]

const needTypes = [
  { value: 'audit', label: '免费云账单体检 / 成本优化' },
  { value: 'new', label: '创业团队首次上云' },
  { value: 'migrate', label: '自建机房 / 托管迁移上云' },
  { value: 'ai', label: '大模型 API / GPU 算力接入' },
  { value: 'other', label: '其他架构咨询' }
]

const steps = [
  {
    title: '提交需求',
    desc: '填写公司信息与当前云消费情况，或直接微信联系我们。',
    icon: '📝'
  },
  {
    title: '生成专属链接',
    desc: '由渠道顾问为你生成带归因的阿里云 / 腾讯云等官方充值链接。',
    icon: '🔗'
  },
  {
    title: '官方下单享优惠',
    desc: '通过专属链接充值或新购，享受渠道折扣；发票、售后均由云厂商官方提供。',
    icon: '✅'
  }
]

const benefits = [
  {
    title: '免费账单体检',
    desc: '月消费 ≥ ¥3,000 的团队可提交账单，技术侧出具优化建议报告（脱敏）。',
    tone: 'emerald'
  },
  {
    title: '多云中立选型',
    desc: '同时覆盖阿里云、腾讯云、华为云、火山引擎，不绑定单一厂商。',
    tone: 'sky'
  },
  {
    title: '开发者视角',
    desc: '博主联盟技术内容背书，用真实场景讲清选型与成本，不做「比官网便宜 50%」硬广。',
    tone: 'cyan'
  },
  {
    title: '官方合规链路',
    desc: '专属链接跳转云厂商官方页面；充值、合同、6% 增值税专票均由原厂开具。',
    tone: 'teal'
  }
]

const faqs = [
  {
    q: '为什么不能直接点链接购买？',
    a: '云渠道返利需要绑定你的账号与合伙人归因。联系顾问后，我们会按你的云厂商与账号情况生成专属链接，确保折扣生效且后续可追踪续费。'
  },
  {
    q: '和官网直购有什么区别？',
    a: '资源、发票、售后与官网一致；差异在于渠道侧可叠加折扣与顾问式账单优化建议。建议小单试水后逐步放大。'
  },
  {
    q: '适合个人开发者吗？',
    a: '本专题聚焦企业 / 团队采购（建议月云消费 ≥ ¥3,000）。个人轻量需求更适合直接在官网按量付费。'
  },
  {
    q: '账单体检真的免费吗？',
    a: '是的。提交脱敏账单后由合作渠道技术侧出具优化建议，不强制签约；是否采购由你自行决定。'
  }
]

function labelOf(options, value) {
  return options.find((item) => item.value === value)?.label || value || '未填写'
}

function buildLeadMessage() {
  return [
    '【大厂云服务 · CloudCost Lab 咨询】',
    `公司：${form.company.trim()}`,
    `联系人：${form.contactName.trim()}`,
    `微信/手机：${form.wechatOrPhone.trim()}`,
    `当前云厂商：${labelOf(cloudProviders, form.cloudProvider)}`,
    `月消费区间：${labelOf(monthlySpendOptions, form.monthlySpend)}`,
    `需求类型：${labelOf(needTypes, form.needType)}`,
    form.note.trim() ? `补充说明：${form.note.trim()}` : '',
    '',
    '请协助生成专属渠道链接，谢谢。'
  ]
    .filter(Boolean)
    .join('\n')
}

function validateForm() {
  if (!form.company.trim()) return '请填写公司名称'
  if (!form.contactName.trim()) return '请填写联系人'
  if (!form.wechatOrPhone.trim()) return '请填写微信或手机'
  if (!form.cloudProvider) return '请选择当前使用的云厂商'
  if (!form.monthlySpend) return '请选择月消费区间'
  if (!form.needType) return '请选择需求类型'
  return ''
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(textarea)
  return ok
}

async function handleSubmit() {
  const error = validateForm()
  if (error) {
    showToast(error, { type: 'info' })
    return
  }

  submitting.value = true
  const message = buildLeadMessage()

  try {
    const copied = await copyText(message)
    submitted.value = true
    showToast(
      copied
        ? '需求已复制到剪贴板，请微信发送给顾问'
        : '提交成功，请滚动至底部扫码联系顾问',
      { type: 'info', duration: 4500 }
    )
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } finally {
    submitting.value = false
  }
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  document.title = '大厂云服务 · CloudCost Lab | 博主联盟联运'
  const description =
    '面向技术团队的大厂云服务联运专题。阿里云 / 腾讯云 / 华为云 / 火山引擎多云选型、账单优化与专属充值归因链接。'

  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white text-slate-900">
    <header class="sticky top-0 z-40 border-b border-emerald-100/80 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-sm"
            aria-hidden="true"
          >
            CC
          </div>
          <div>
            <div class="text-sm font-semibold tracking-tight">大厂云服务</div>
            <div class="text-[11px] text-slate-500">CloudCost Lab · 博主联盟联运</div>
          </div>
        </div>
        <nav class="hidden items-center gap-5 text-sm text-slate-600 md:flex">
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('flow')">合作流程</button>
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('apply')">提交需求</button>
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('faq')">常见问题</button>
        </nav>
        <button
          type="button"
          class="inline-flex min-h-10 items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          @click="scrollTo('apply')"
        >
          获取专属链接
        </button>
      </div>
    </header>

    <main>
      <section class="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:pb-20">
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"></div>
          <div class="absolute right-0 top-10 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl"></div>
        </div>

        <div class="relative mx-auto max-w-6xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            博主联盟 × 多云渠道联运专题
          </div>

          <h1 class="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            技术团队的
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">云账单优化</span>
            与专属充值通道
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            已有云账号的企业团队，可先免费做账单体检；确认合作后，由顾问生成
            <strong class="font-semibold text-slate-800">阿里云 / 腾讯云 / 华为云 / 火山引擎</strong>
            专属渠道链接，官方充值、官方发票、官方售后不变。
          </p>

          <div class="mt-6 flex flex-wrap gap-2 text-xs">
            <span class="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-emerald-700">免费账单体检</span>
            <span class="rounded-full border border-sky-200 bg-white px-2.5 py-1 text-sky-700">专属链接归因</span>
            <span class="rounded-full border border-teal-200 bg-white px-2.5 py-1 text-teal-700">多云中立选型</span>
            <span class="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-amber-700">建议月消费 ≥ ¥3k</span>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-800"
              @click="scrollTo('apply')"
            >
              提交需求，获取专属链接
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              class="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
              @click="scrollTo('flow')"
            >
              了解合作流程
            </button>
          </div>

          <p class="mt-4 text-xs leading-6 text-slate-500">
            渠道折扣因云厂商、产品与消费量级而异，一般为官网净让利约 5%–15%；不承诺「躺赚续费」或固定 50% 优惠。
          </p>
        </div>
      </section>

      <section id="flow" class="scroll-mt-24 border-y border-emerald-100/80 bg-white/70 px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">三步完成专属链接开通</h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            返利归因必须在充值前绑定。请先联系我们，不要自行在官网大额充值后再来补链。
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <article
              v-for="(step, index) in steps"
              :key="step.title"
              class="relative rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-5"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl" aria-hidden="true">{{ step.icon }}</span>
                <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600">Step {{ index + 1 }}</span>
              </div>
              <h3 class="mt-3 text-lg font-semibold text-slate-900">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600">{{ step.desc }}</p>
            </article>
          </div>

          <div class="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 px-5 py-4 text-sm leading-7 text-amber-950">
            <span class="font-semibold">重要：</span>
            专属链接由渠道顾问人工生成，通常 1 个工作日内完成。生成后请使用该链接完成首次充值或新购，方可计入渠道优惠与归因。
          </div>
        </div>
      </section>

      <section class="px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">为什么选择这条链路</h2>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <article
              v-for="item in benefits"
              :key="item.title"
              class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 class="text-base font-semibold text-slate-900">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600">{{ item.desc }}</p>
            </article>
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="name in ['阿里云', '腾讯云', '华为云', '火山引擎']"
              :key="name"
              class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              {{ name }}
            </span>
          </div>
        </div>
      </section>

      <section id="apply" class="scroll-mt-24 border-t border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/40 px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-6xl">
          <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">提交需求 · 获取专属链接</h2>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                填写后系统会生成结构化咨询信息并复制到剪贴板，请微信发送给顾问
                <span class="font-medium text-slate-800">atar24</span>，或直接扫码联系。
              </p>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">公司名称 *</span>
                    <input
                      v-model="form.company"
                      type="text"
                      required
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-emerald-500/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      placeholder="例：深圳某某科技有限公司"
                    />
                  </label>
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">联系人 *</span>
                    <input
                      v-model="form.contactName"
                      type="text"
                      required
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      placeholder="您的姓名或称呼"
                    />
                  </label>
                </div>

                <label class="block text-sm">
                  <span class="mb-1.5 block font-medium text-slate-700">微信 / 手机 *</span>
                  <input
                    v-model="form.wechatOrPhone"
                    type="text"
                    required
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="方便顾问回访与发送专属链接"
                  />
                </label>

                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">当前云厂商 *</span>
                    <select
                      v-model="form.cloudProvider"
                      required
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option disabled value="">请选择</option>
                      <option v-for="item in cloudProviders" :key="item.value" :value="item.value">{{ item.label }}</option>
                    </select>
                  </label>
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">月消费区间 *</span>
                    <select
                      v-model="form.monthlySpend"
                      required
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option disabled value="">请选择</option>
                      <option v-for="item in monthlySpendOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
                    </select>
                  </label>
                </div>

                <label class="block text-sm">
                  <span class="mb-1.5 block font-medium text-slate-700">需求类型 *</span>
                  <select
                    v-model="form.needType"
                    required
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option disabled value="">请选择</option>
                    <option v-for="item in needTypes" :key="item.value" :value="item.value">{{ item.label }}</option>
                  </select>
                </label>

                <label class="block text-sm">
                  <span class="mb-1.5 block font-medium text-slate-700">补充说明（选填）</span>
                  <textarea
                    v-model="form.note"
                    rows="3"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="例如：主要跑 K8s + RDS，想先做账单体检；或计划下月新购 GPU 实例"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 sm:w-auto"
                  :disabled="submitting"
                >
                  {{ submitting ? '处理中…' : '生成咨询信息并复制' }}
                </button>

                <p v-if="submitted" class="text-sm text-emerald-700">
                  已复制咨询模板，请微信发送给顾问；若需账单体检，可一并说明方便提交账单的格式。
                </p>
              </form>
            </div>

            <div id="contact" class="scroll-mt-24 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900">微信联系顾问</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600">
                说明你的云厂商、账号 UID（如有）与月消费区间，我们会生成专属充值链接发给你。
              </p>
              <div class="mt-4 rounded-xl bg-slate-50 p-3">
                <img
                  src="../../img/qrcode1.jpg"
                  alt="微信二维码 atar24"
                  class="mx-auto w-full max-w-[220px] rounded-lg"
                />
              </div>
              <div class="mt-4 space-y-2 text-sm text-slate-600">
                <div><span class="font-medium text-slate-800">微信：</span>atar24</div>
                <div><span class="font-medium text-slate-800">响应：</span>1 个工作日内</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="scroll-mt-24 border-t border-slate-200 px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-3xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">常见问题</h2>
          <div class="mt-6 space-y-4">
            <details
              v-for="item in faqs"
              :key="item.q"
              class="group rounded-xl border border-slate-200 bg-white px-4 py-3 open:border-emerald-200 open:bg-emerald-50/30"
            >
              <summary class="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:content-none">
                {{ item.q }}
              </summary>
              <p class="mt-2 text-sm leading-7 text-slate-600">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200 bg-slate-900 px-4 py-10 text-slate-300 sm:px-6">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div class="text-sm font-semibold text-white">大厂云服务 · CloudCost Lab</div>
          <div class="mt-1 text-xs text-slate-400">博主联盟联运专题 · 阿里云 / 腾讯云 / 华为云 / 火山引擎</div>
        </div>
        <div class="text-sm">
          <a
            href="https://blogger-alliance.cn"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-300 hover:text-white"
          >
            @博主联盟
          </a>
        </div>
      </div>
    </footer>

    <CloudCostContactFab />
  </div>
</template>
