<script setup>
import CasePageShell from '../../components/cases/CasePageShell.vue'
import MockCaseBody from '../../components/cases/MockCaseBody.vue'
import { mockCaseModels } from '../../data/casesRegistry.js'

const model = mockCaseModels['enterprise-cloud']
</script>

<template>
  <CasePageShell>
    <MockCaseBody v-bind="model" />
    <div class="mt-6 flex flex-wrap gap-3">
      <a
        href="https://cloudcost.blogger-alliance.cn"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
      >
        打开联运落地页 →
      </a>
      <router-link to="/tob/services/cloud-cost" class="text-sm font-medium text-indigo-700 underline-offset-4 hover:underline">
        专项介绍 →
      </router-link>
    </div>
  </CasePageShell>
</template>
