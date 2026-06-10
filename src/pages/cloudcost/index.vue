<script setup>
import { onMounted, reactive, ref } from 'vue'
import CloudCostContactFab from '../../components/CloudCostContactFab.vue'
import { showToast } from '../../utils/toast.js'

const form = reactive({
  nickname: '',
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
  { value: 'multi', label: '还没想好，想对比看看' },
  { value: 'none', label: '还没用过云' }
]

const monthlySpendOptions = [
  { value: 'none', label: '还没开始花钱 / 刚注册试用' },
  { value: 'lt500', label: '每月大概 ¥500 以内' },
  { value: '500-3k', label: '每月大概 ¥500 – ¥3,000' },
  { value: '3k-10k', label: '每月大概 ¥3,000 – ¥1 万' },
  { value: 'gt10k', label: '每月 ¥1 万以上' }
]

const needTypes = [
  { value: 'new', label: '想买服务器 / 建站 / 部署项目' },
  { value: 'recharge', label: '已有账号，续费想便宜点' },
  { value: 'audit', label: '账单太贵，想帮看看哪里能省' },
  { value: 'ai', label: '想用 AI / GPU 跑模型' },
  { value: 'chat', label: '还没想好，想先聊聊' }
]

const steps = [
  {
    title: '告诉我们你的情况',
    desc: '填个简单表单，或直接微信说一声：用什么云、大概花多少。',
    icon: '📝'
  },
  {
    title: '拿到专属官方充值链接',
    desc: '顾问会根据你的云厂商和账号，生成一条带渠道归因的官方充值 / 新购链接。',
    icon: '🔗'
  },
  {
    title: '去官网下单就行',
    desc: '用这条链接在官网充值或购买，仍是官方账号、发票与售后，同时享受渠道价与按量返利。',
    icon: '✅'
  }
]

const benefits = [
  {
    title: '官方渠道价 + 按量返利',
    desc: '博主联盟即云厂商认证渠道，用多少消费、返多少；用量越大，返利阶梯越高。'
  },
  {
    title: '四家大厂云都能问',
    desc: '阿里云、腾讯云、华为云、火山引擎都支持，不知道选哪家可以先聊。'
  },
  {
    title: '账单贵可以帮你看',
    desc: '觉得每月扣费太多，可以把账单发给顾问，免费帮你看有没有买多了、买错了。'
  },
  {
    title: '还是官方那一套',
    desc: '充值、开发票、找客服都在云厂商官网完成，不是第三方代充。'
  }
]

const faqs = [
  {
    q: '为什么不能直接在这里付款？',
    a: '优惠要绑在你的云账号上。你先联系我们，顾问会按你的情况生成一条专属链接，再用这条链接去云厂商官网充值或购买，优惠才会生效。'
  },
  {
    q: '和自己去官网买有什么区别？',
    a: '买的还是同一家云、同样的服务，发票和售后也找官方。区别是博主联盟本身就是渠道商，能给你官方渠道价、按量返利，以及账单选型建议。'
  },
  {
    q: '个人开发者 / 学生能用吗？',
    a: '可以。自己建站、跑 side project、小团队创业都能用，用量不大也可以先问清楚再决定。'
  },
  {
    q: '帮看账单真的免费吗？',
    a: '是的，不收费。你看完建议自己决定要不要调整，没有强制消费。'
  }
]

function labelOf(options, value) {
  return options.find((item) => item.value === value)?.label || value || '未填写'
}

function buildLeadMessage() {
  return [
    '【大厂云服务咨询】',
    form.nickname.trim() ? `称呼/项目：${form.nickname.trim()}` : '',
    `怎么称呼：${form.contactName.trim()}`,
    `微信/手机：${form.wechatOrPhone.trim()}`,
    `用的云：${labelOf(cloudProviders, form.cloudProvider)}`,
    `大概花费：${labelOf(monthlySpendOptions, form.monthlySpend)}`,
    `想了解：${labelOf(needTypes, form.needType)}`,
    form.note.trim() ? `补充：${form.note.trim()}` : '',
    '',
    '麻烦帮我生成专属官方充值链接，谢谢～'
  ]
    .filter(Boolean)
    .join('\n')
}

function validateForm() {
  if (!form.contactName.trim()) return '请填写怎么称呼您'
  if (!form.wechatOrPhone.trim()) return '请填写微信或手机'
  if (!form.cloudProvider) return '请选择用的哪家云'
  if (!form.monthlySpend) return '请选择大概每月花费'
  if (!form.needType) return '请选择想了解什么'
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
        ? '已复制到剪贴板，微信发给 atar24 即可'
        : '好了，往下滚动扫码加微信',
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
  document.title = '大厂云服务 · 官方渠道充值 | 博主联盟'
  const description =
    '博主联盟是阿里云、腾讯云、华为云、火山引擎认证渠道，提供官方充值链接与按量返利。'

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
            <div class="text-[11px] text-slate-500">联盟即渠道 · 官方充值返利</div>
          </div>
        </div>
        <nav class="hidden items-center gap-5 text-sm text-slate-600 md:flex">
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('flow')">怎么用</button>
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('apply')">我要咨询</button>
          <button type="button" class="hover:text-emerald-700" @click="scrollTo('faq')">常见问题</button>
        </nav>
        <button
          type="button"
          class="inline-flex min-h-10 items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          @click="scrollTo('apply')"
        >
          领官方充值链接
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
            博主联盟 · 云服务官方渠道
          </div>

          <h1 class="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            买
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">阿里云 / 腾讯云</span>
            更划算一点
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            不管你是个人开发者、学生党 side project，还是小团队创业——博主联盟就是云厂商认证渠道，先联系我们拿
            <strong class="font-semibold text-slate-800">专属官方充值链接</strong>，
            再去官网充值或买服务器。还是官方账号、官方发票、官方客服，享受渠道价与按量返利。
          </p>

          <div class="mt-6 flex flex-wrap gap-2 text-xs">
            <span class="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-emerald-700">个人也能用</span>
            <span class="rounded-full border border-sky-200 bg-white px-2.5 py-1 text-sky-700">免费帮看账单</span>
            <span class="rounded-full border border-teal-200 bg-white px-2.5 py-1 text-teal-700">四家云都能问</span>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-800"
              @click="scrollTo('apply')"
            >
              我要领官方充值链接
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              class="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
              @click="scrollTo('flow')"
            >
              看看怎么用
            </button>
          </div>

          <p class="mt-4 text-xs leading-6 text-slate-500">
            具体能省多少，看云厂商和产品而定，买之前可以先问清楚。
          </p>
        </div>
      </section>

      <section id="flow" class="scroll-mt-24 border-y border-emerald-100/80 bg-white/70 px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">三步搞定，很简单</h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            优惠要在你充值之前绑定账号。所以请先找我们拿链接，再去官网购买服务。
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
            <span class="font-semibold">小提示：</span>
            链接需要顾问手动生成，一般 1 个工作日内发你。拿到后用它去充值或新购，优惠才会生效。
          </div>
        </div>
      </section>

      <section class="px-4 py-14 sm:px-6">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">为什么要走这里</h2>
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
              <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">填个表，领官方充值链接</h2>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                填好后会自动复制一段话，你微信发给
                <span class="font-medium text-slate-800">atar24</span>
                就行。嫌麻烦也可以直接扫码聊。
              </p>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">怎么称呼您 *</span>
                    <input
                      v-model="form.contactName"
                      type="text"
                      required
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      placeholder="例：阿燃 / 小王"
                    />
                  </label>
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">称呼 / 项目名（选填）</span>
                    <input
                      v-model="form.nickname"
                      type="text"
                      class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-emerald-500/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      placeholder="例：个人博客 / XX 工作室"
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
                    placeholder="方便发你官方充值链接"
                  />
                </label>

                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block text-sm">
                    <span class="mb-1.5 block font-medium text-slate-700">用的哪家云 *</span>
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
                    <span class="mb-1.5 block font-medium text-slate-700">大概每月花多少 *</span>
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
                  <span class="mb-1.5 block font-medium text-slate-700">想了解什么 *</span>
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
                  <span class="mb-1.5 block font-medium text-slate-700">还想补充一句（选填）</span>
                  <textarea
                    v-model="form.note"
                    rows="3"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="例如：想买个 2 核 4G 服务器建站；或者账单每月 200 多觉得贵"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 sm:w-auto"
                  :disabled="submitting"
                >
                  {{ submitting ? '处理中…' : '复制咨询内容' }}
                </button>

                <p v-if="submitted" class="text-sm text-emerald-700">
                  已复制好啦，微信发给 atar24 即可；想帮看账单的话，可以顺便说一下。
                </p>
              </form>
            </div>

            <div id="contact" class="scroll-mt-24 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900">直接微信聊</h3>
              <p class="mt-2 text-sm leading-7 text-slate-600">
                扫码加微信，说一下用的哪家云、大概花多少，我们发你官方充值链接。
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
          <div class="text-sm font-semibold text-white">大厂云服务</div>
          <div class="mt-1 text-xs text-slate-400">阿里云 · 腾讯云 · 华为云 · 火山引擎</div>
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
