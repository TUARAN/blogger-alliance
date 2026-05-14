<script setup>
import CasePageShell from '../../components/cases/CasePageShell.vue'
import MockCaseBody from '../../components/cases/MockCaseBody.vue'
import { mockCaseModels } from '../../data/casesRegistry.js'

const model = mockCaseModels['ai-access']
</script>

<template>
  <CasePageShell>
    <MockCaseBody v-bind="model" />
  </CasePageShell>
</template>
