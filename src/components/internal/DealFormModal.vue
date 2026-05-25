<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" @click.self="$emit('cancel')">
      <div class="w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 class="text-lg font-bold text-slate-900">{{ mode === 'create' ? '新增合作' : '编辑合作' }}</h3>
            <p class="text-xs text-slate-500 mt-0.5">合作编码 ID 将用于在报告中做关联，保存后无法轻易改动，请谨慎填写。</p>
          </div>
          <button class="text-slate-400 hover:text-slate-600" @click="$emit('cancel')">✕</button>
        </div>

        <div class="overflow-y-auto px-6 py-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">合作编码 ID <span class="text-red-500">*</span></span>
              <input
                v-model.trim="form.id"
                :disabled="mode === 'edit'"
                type="text"
                placeholder="BRAND-SERVICE-001"
                class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
              >
              <span class="block mt-1 text-[11px] text-slate-400">保存后作为合作的主键；编辑已有条目时不可修改。</span>
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">品牌 / 项目 <span class="text-red-500">*</span></span>
              <input v-model.trim="form.brand" type="text" placeholder="示例品牌" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">合作内容</span>
              <input v-model.trim="form.service" type="text" placeholder="公众号推文 / 引流 / AI Access" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">当前进度</span>
              <input v-model.trim="form.progress" type="text" placeholder="沟通中 / 执行中 / 待结算 / 已完成 / 暂停/作废" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" list="progress-options">
              <datalist id="progress-options">
                <option value="沟通中"></option>
                <option value="执行中"></option>
                <option value="待结算"></option>
                <option value="已完成"></option>
                <option value="暂停/作废"></option>
              </datalist>
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">推荐人</span>
              <input v-model.trim="form.referrer" type="text" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">承接人</span>
              <input v-model.trim="form.owner" type="text" placeholder="安东尼、浪里行舟、erpan" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">最近沟通时间</span>
              <input v-model.trim="form.updatedAt" type="text" placeholder="2026.04.24" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm">
              <span class="block mt-1 text-[11px] text-slate-400">格式 YYYY.MM.DD，用于按年份筛选与排序。</span>
            </label>
          </div>

          <label class="block">
            <span class="text-xs font-semibold text-slate-600">备注</span>
            <textarea v-model="form.remark" rows="2" placeholder="项目备注、里程碑等" class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </label>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-xs font-semibold text-slate-600">报告关联编码（别名）</span>
              <input v-model.trim="form.reportCooperationId" type="text" placeholder="留空则使用本合作编码" class="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm">
              <span class="block mt-1 text-[11px] text-slate-400">二期沿用一期报告时填此字段指向一期合作编码。</span>
            </label>
            <label class="flex items-center gap-2 mt-6">
              <input v-model="form.muted" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-slate-700">置灰显示（不再活跃）</span>
            </label>
          </div>

          <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>
        </div>

        <div class="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button
            v-if="mode === 'edit'"
            class="mr-auto h-9 px-3 rounded-lg border border-red-200 bg-white text-sm font-medium text-red-600 hover:bg-red-50"
            :disabled="isSaving"
            @click="$emit('delete')"
          >
            删除合作
          </button>
          <button class="h-9 px-4 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-100" :disabled="isSaving" @click="$emit('cancel')">取消</button>
          <button class="h-9 px-4 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60" :disabled="isSaving" @click="onSave">
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  deal: { type: Object, default: null },
  isSaving: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'cancel', 'delete'])

const mode = ref(props.deal?.id ? 'edit' : 'create')
const validationError = ref('')

function buildForm(source) {
  return {
    id: source?.id ?? '',
    brand: source?.brand ?? '',
    service: source?.service ?? '',
    progress: source?.progress ?? '',
    remark: source?.remark ?? '',
    referrer: source?.referrer ?? '',
    owner: source?.owner ?? '',
    updatedAt: source?.updatedAt ?? '',
    reportCooperationId: source?.reportCooperationId ?? '',
    category: source?.category ?? '',
    muted: source?.muted === true
  }
}

const form = reactive(buildForm(props.deal))

watch(() => props.deal, (next) => {
  Object.assign(form, buildForm(next))
  mode.value = next?.id ? 'edit' : 'create'
  validationError.value = ''
})

function onSave() {
  validationError.value = ''
  const id = String(form.id || '').trim()
  const brand = String(form.brand || '').trim()

  if (!id) {
    validationError.value = '合作编码 ID 不能为空。'
    return
  }

  if (!brand) {
    validationError.value = '品牌 / 项目不能为空。'
    return
  }

  const payload = {
    id: id.toUpperCase(),
    brand,
    service: String(form.service || '').trim(),
    progress: String(form.progress || '').trim(),
    remark: String(form.remark || '').trim(),
    referrer: String(form.referrer || '').trim(),
    owner: String(form.owner || '').trim(),
    updatedAt: String(form.updatedAt || '').trim()
  }

  const reportCoop = String(form.reportCooperationId || '').trim()
  if (reportCoop) {
    payload.reportCooperationId = reportCoop.toUpperCase()
  }

  const category = String(form.category || '').trim()
  if (category) {
    payload.category = category
  }

  if (form.muted) {
    payload.muted = true
  }

  emit('save', { mode: mode.value, deal: payload, originalId: props.deal?.id || null })
}
</script>
