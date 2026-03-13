<script setup>
const layers = [
  {
    title: '上游：基础能力层',
    description: '提供算力、模型与底层框架，是 AI 产业的技术起点。',
    accent: 'from-slate-500 to-indigo-600',
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    valueBg: 'bg-white/80',
    sections: [
      { label: '大模型', items: ['OpenAI', 'Anthropic', 'DeepSeek', 'Google'] },
      { label: '算力', items: ['NVIDIA', 'AMD', 'TPU'] },
      { label: '云平台', items: ['AWS', 'Azure', '阿里云', '腾讯云'] },
      { label: '基础框架', items: ['PyTorch', 'TensorFlow', 'CUDA'] }
    ],
    valueTitle: '核心价值',
    valueText: '提供算力与技术基础设施'
  },
  {
    title: '中游：产品工具层',
    description: '把底层能力封装成产品、工作流与开发范式，形成可直接使用的 AI 能力。',
    accent: 'from-violet-500 to-fuchsia-600',
    border: 'border-violet-200',
    bg: 'bg-violet-50',
    valueBg: 'bg-white/80',
    sections: [
      { label: 'AI 产品', items: ['ChatGPT', 'Claude', 'Gemini'] },
      { label: '开发工具', items: ['Copilot', 'Cursor', 'Windsurf'] },
      { label: 'Agent 框架', items: ['LangChain', 'OpenClaw', 'CrewAI'] },
      { label: 'AI SaaS', items: ['AI写作', 'AI设计', 'AI开发工具'] }
    ],
    valueTitle: '核心价值',
    valueText: '把技术能力产品化'
  },
  {
    title: '渠道：开发者传播网络',
    description: '连接产品与用户，靠内容传播、技术信任和持续曝光完成市场教育与需求激发。',
    accent: 'from-emerald-500 to-cyan-600',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    valueBg: 'bg-white/80',
    sections: [
      { label: '技术社区', items: ['Hacker News', 'Dev.to', '掘金'] },
      { label: '技术媒体', items: ['InfoQ', '极客时间'] },
      { label: '技术博主', items: ['KOL', '技术博客'] },
      { label: '内容平台', items: ['Newsletter', '技术周刊'] },
      { label: '📍 当前位置（你在这里）', items: ['开发者博主联盟'], featured: true }
    ],
    valueTitle: '核心价值',
    valueText: '技术内容传播 + 信任背书'
  },
  {
    title: '下游：用户与商业转化',
    description: '最终连接到真实客户与收入，验证整个生态链条的商业闭环。',
    accent: 'from-amber-500 to-orange-600',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    valueBg: 'bg-white/80',
    sections: [
      { label: '用户群体', items: ['开发者用户', '创业团队', '企业客户'] },
      { label: '商业行为', items: ['SaaS订阅', 'API调用', '企业采购'] }
    ],
    valueTitle: '核心价值',
    valueText: '形成真实收入'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 gap-4">
          <div class="flex items-center min-w-0">
            <router-link to="/tob" class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate">
              🚀开发者博主联盟
            </router-link>
          </div>

          <div class="flex items-center gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap">
            <router-link
              to="/tob/deals"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧭</span>
              <span>合作查询</span>
            </router-link>

            <router-link
              to="/matrix"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">🧩</span>
              <span>矩阵联盟</span>
            </router-link>

            <router-link
              to="/academy"
              class="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors font-medium text-base"
              active-class="text-gray-700 font-semibold"
            >
              <span class="text-base leading-none">📚</span>
              <span>联盟学院</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 min-h-[calc(100vh-4rem)]">
      <section class="bg-white rounded-2xl border border-indigo-100 shadow-sm px-4 py-3 md:px-5 md:py-4">
        <div class="max-w-5xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
            <span>🗺️</span>
            <span>连接技术产品生态中下游的增长分发网络</span>
          </div>
          <h1 class="mt-2 text-2xl md:text-3xl font-bold text-gray-900">开发者博主联盟在 AI 产业链中的位置</h1>
          <p class="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            这张图把 AI 生态分成基础能力、产品工具、传播渠道和商业转化四层。开发者博主联盟位于“开发者传播网络”这一关键通道，承担内容分发、信任建立与线索转化前置教育的角色。
          </p>
        </div>
      </section>

      <section class="mt-3">
        <div class="space-y-1.5">
        <div
          v-for="(layer, layerIndex) in layers"
          :key="layer.title"
          class="contents"
        >
          <div
            class="w-full rounded-2xl border shadow-sm px-3 py-2.5 md:px-4 md:py-3"
            :class="[layer.border, layer.bg]"
          >
            <div class="grid h-full gap-2 lg:grid-cols-[200px_minmax(0,1fr)_190px] lg:items-start">
              <div class="min-w-0">
                <div class="inline-flex max-w-full items-center rounded-xl px-2 py-1 text-[11px] font-semibold leading-snug text-white bg-gradient-to-r whitespace-normal break-words" :class="layer.accent">
                  {{ layer.title }}
                </div>
                <p class="mt-1 text-[11px] text-gray-600 leading-snug">{{ layer.description }}</p>
              </div>

              <div
                class="grid gap-2 content-start"
                :class="layer.sections.length > 4 ? 'grid-cols-2 xl:grid-cols-5' : 'grid-cols-2 xl:grid-cols-4'"
              >
              <div
                v-for="section in layer.sections"
                :key="section.label"
                class="min-w-0 rounded-xl border px-2.5 py-2"
                :class="section.featured
                  ? 'border-red-300 bg-red-50'
                  : 'border-white/70 bg-white/70'"
              >
                <div class="text-[11px] font-semibold leading-none" :class="section.featured ? 'text-red-700' : 'text-gray-800'">{{ section.label }}</div>
                <div
                  class="mt-1.5"
                  :class="section.featured ? 'grid grid-cols-1 gap-1.5' : 'flex flex-wrap gap-1.5'"
                >
                  <span
                    v-for="item in section.items"
                    :key="item"
                    class="inline-flex max-w-full items-center rounded-full px-2 py-0.5 text-[11px] leading-4"
                    :class="section.featured
                      ? item === '开发者博主联盟'
                        ? 'bg-white text-gray-500 border border-gray-200 whitespace-normal break-words text-center justify-center leading-snug font-medium'
                        : 'bg-white text-slate-700 border border-slate-200 whitespace-normal break-words text-center justify-center leading-snug'
                      : 'bg-slate-100 text-slate-700'"
                  >
                    <span v-if="item === '开发者博主联盟'" class="mr-1 leading-none">🚀</span>
                    {{ item }}
                  </span>
                </div>
              </div>
              </div>

              <div class="rounded-xl border border-dashed border-gray-300 px-3 py-2" :class="layer.valueBg">
                <div class="text-[11px] font-semibold text-gray-500">{{ layer.valueTitle }}</div>
                <div class="mt-1 text-sm font-bold leading-snug text-gray-900">{{ layer.valueText }}</div>
              </div>
            </div>
          </div>

          <div
            v-if="layerIndex < layers.length - 1"
            class="flex items-center justify-center text-indigo-500 leading-none"
            aria-hidden="true"
          >
            <div class="text-lg">↓</div>
          </div>
        </div>
        </div>
      </section>
    </main>
  </div>
</template>
