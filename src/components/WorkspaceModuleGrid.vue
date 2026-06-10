<script setup>
import { useAuth } from '../composables/useAuth.js'
import { WORKSPACE_CTA, WORKSPACE_SECTIONS } from '../data/workspaceRegistry.js'

defineProps({
  compact: { type: Boolean, default: false }
})

const { isInternal } = useAuth()

function canOpenModule(module) {
  if (module.external) {
    return !module.requiresInternal || isInternal.value
  }

  return true
}

function moduleCta(module) {
  return module.external ? WORKSPACE_CTA.open : WORKSPACE_CTA.enter
}
</script>

<template>
  <div class="space-y-12">
    <section
      v-for="section in WORKSPACE_SECTIONS"
      :key="section.id"
      :aria-labelledby="`workspace-section-${section.id}`"
    >
      <div class="max-w-3xl">
        <h2
          :id="`workspace-section-${section.id}`"
          class="text-2xl font-bold tracking-tight text-gray-900"
        >
          {{ section.title }}
        </h2>
        <p class="mt-2 text-sm leading-6 text-gray-600">
          {{ section.description }}
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <component
          :is="module.external ? 'a' : 'router-link'"
          v-for="module in section.modules"
          :key="module.id"
          :to="module.external || !module.to ? undefined : module.to"
          :href="module.external ? module.href : undefined"
          :target="module.external ? '_blank' : undefined"
          :rel="module.external ? 'noopener noreferrer' : undefined"
          :aria-disabled="module.locked && !canOpenModule(module) ? 'true' : undefined"
          class="group rounded-3xl border border-white/70 bg-white/90 shadow-lg transition-all duration-300"
          :class="[
            module.theme.shadow,
            compact ? 'p-5' : 'p-6',
            canOpenModule(module)
              ? 'hover:-translate-y-1 hover:shadow-2xl'
              : module.external
                ? 'cursor-not-allowed opacity-80'
                : 'hover:-translate-y-1 hover:shadow-2xl'
          ]"
          @click="module.external && !canOpenModule(module) && $event.preventDefault()"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="inline-flex items-center justify-center rounded-2xl text-2xl"
              :class="[module.theme.icon, compact ? 'h-11 w-11' : 'h-12 w-12']"
            >
              {{ module.icon }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
              :class="module.theme.tag"
            >
              <svg
                v-if="module.locked"
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <span>{{ module.tag }}</span>
            </span>
          </div>

          <h3 class="mt-5 font-bold text-gray-900" :class="compact ? 'text-lg' : 'text-xl'">
            {{ module.title }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">{{ module.description }}</p>

          <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold" :class="module.theme.cta">
            <svg
              v-if="module.external && !canOpenModule(module)"
              class="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span>{{ moduleCta(module) }}</span>
            <span v-if="module.external" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
            <span v-else class="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </component>
      </div>
    </section>
  </div>
</template>
