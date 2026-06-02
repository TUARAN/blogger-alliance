<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  headline: { type: String, required: true },
  intro: { type: String, required: true },
  steps: {
    type: Array,
    required: true
  },
  panels: {
    type: Array,
    required: true
  },
  theme: {
    type: String,
    default: 'slate'
  }
})

const stepThemes = {
  amber: 'bg-amber-600',
  emerald: 'bg-emerald-600',
  violet: 'bg-violet-600',
  sky: 'bg-sky-600',
  slate: 'bg-slate-600'
}

const panelBorder = {
  amber: 'border-amber-100',
  emerald: 'border-emerald-100',
  violet: 'border-violet-100',
  sky: 'border-sky-100',
  slate: 'border-slate-200'
}

const panelBg = {
  amber: 'bg-amber-50/50',
  emerald: 'bg-emerald-50/50',
  violet: 'bg-violet-50/50',
  sky: 'bg-sky-50/50',
  slate: 'bg-slate-50'
}

const accentText = {
  amber: 'text-amber-600',
  emerald: 'text-emerald-600',
  violet: 'text-violet-600',
  sky: 'text-sky-600',
  slate: 'text-slate-600'
}

const badgeBg = {
  amber: 'bg-amber-100 text-amber-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
  sky: 'bg-sky-100 text-sky-800',
  slate: 'bg-slate-100 text-slate-800'
}
</script>

<template>
  <div class="space-y-8 md:space-y-10">
    <section class="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em]" :class="accentText[theme]">{{ eyebrow }}</p>
          <h1 class="mt-3 text-2xl md:text-3xl font-bold text-gray-900">{{ headline }}</h1>
          <p class="mt-3 text-sm md:text-base leading-7 text-gray-600">{{ intro }}</p>
        </div>
        <span
          class="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold"
          :class="badgeBg[theme]"
        >
          交付样张
        </span>
      </div>

      <div class="mt-8 overflow-x-auto pb-2">
        <article
          v-for="(step, index) in steps"
          :key="step.title"
          class="inline-block w-[220px] align-top mr-4 last:mr-0 xl:w-[calc((100%-5rem)/6)] rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm"
        >
          <div
            class="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
            :class="stepThemes[theme]"
          >
            {{ index + 1 }}
          </div>
          <h2 class="mt-4 text-base font-semibold text-gray-900">{{ step.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-gray-600">{{ step.description }}</p>
        </article>
      </div>
    </section>

    <section
      v-for="(panel, idx) in panels"
      :key="idx"
      class="rounded-3xl border bg-white px-6 py-8 shadow-sm md:px-8 md:py-10"
      :class="panelBorder[theme]"
    >
      <div class="max-w-4xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em]" :class="accentText[theme]">{{ panel.kicker }}</p>
        <h2 class="mt-3 text-xl md:text-2xl font-bold text-gray-900">{{ panel.title }}</h2>
        <p class="mt-2 text-sm leading-7 text-gray-600">{{ panel.subtitle }}</p>
      </div>

      <div
        class="mt-6 rounded-2xl border border-dashed p-5 md:p-6"
        :class="[panelBorder[theme], panelBg[theme]]"
      >
        <template v-if="panel.metrics && panel.metrics.length">
          <div class="grid gap-3 sm:grid-cols-3">
            <div
              v-for="m in panel.metrics"
              :key="m.label"
              class="rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm"
            >
              <p class="text-xs font-medium uppercase tracking-wide text-gray-500">{{ m.label }}</p>
              <p class="mt-1 text-xl font-bold tabular-nums text-gray-900">{{ m.value }}</p>
            </div>
          </div>
        </template>
        <ul v-if="panel.lines && panel.lines.length" class="space-y-2 text-sm text-gray-700">
          <li
            v-for="(line, li) in panel.lines"
            :key="li"
            class="rounded-lg border border-white/60 bg-white/80 px-3 py-2 font-mono text-[13px] text-gray-800"
          >
            {{ line }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
