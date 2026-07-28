<template>
  <section class="mb-5" aria-labelledby="ledger-activity-title">
    <div class="mb-3">
      <h2 id="ledger-activity-title" class="text-lg font-bold text-slate-900 md:text-xl">
        台账活跃度
      </h2>
      <p class="mt-1 text-sm text-slate-500">近 12 个月每日新增的合作动态与数据报告。</p>
    </div>

    <div class="rounded-2xl border border-indigo-100 bg-white px-4 py-4 shadow-sm md:px-5 md:py-5">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm font-semibold text-slate-600">
          近 12 个月
          <span class="ml-1 font-normal text-slate-400">· {{ totalActivity }} 次动态</span>
        </p>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500" aria-hidden="true">
          <span class="inline-flex items-center gap-1.5">
            <span class="h-3.5 w-3.5 rounded-[3px] border-2 border-amber-500 bg-teal-50"></span>
            新报告上线
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span>少</span>
            <span
              v-for="level in [0, 1, 2, 3, 4]"
              :key="level"
              class="h-3.5 w-3.5 rounded-[3px]"
              :class="levelClass(level)"
            ></span>
            <span>多</span>
          </span>
        </div>
      </div>

      <div
        ref="scrollContainer"
        class="overflow-x-auto pb-1"
        tabindex="0"
        aria-label="台账活跃度日历，可横向滚动查看"
      >
        <div class="min-w-[760px]">
          <div class="mb-2 grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px]">
            <span
              v-for="(label, index) in monthLabels"
              :key="index"
              class="truncate text-[11px] text-slate-500"
            >
              {{ label }}
            </span>
          </div>

          <div class="grid grid-flow-col grid-rows-7 gap-[3px]">
            <span
              v-for="day in calendarDays"
              :key="day.key"
              class="aspect-square min-h-[11px] min-w-[11px] rounded-[3px] border"
              :class="cellClass(day)"
              :title="day.title"
              :aria-label="day.title"
              role="img"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps({
  deals: {
    type: Array,
    default: () => []
  },
  reports: {
    type: Array,
    default: () => []
  }
})

const WEEK_COUNT = 53
const DAYS_PER_WEEK = 7
const scrollContainer = ref(null)

function pad(value) {
  return String(value).padStart(2, '0')
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseDate(value) {
  const match = String(value || '').trim().match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})/)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) {
    return null
  }

  return date
}

function addDays(date, count) {
  const result = new Date(date)
  result.setDate(result.getDate() + count)
  return result
}

const today = computed(() => {
  const value = new Date()
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
})

const calendarStart = computed(() => {
  const startOfCurrentWeek = addDays(today.value, -today.value.getDay())
  return addDays(startOfCurrentWeek, -(WEEK_COUNT - 1) * DAYS_PER_WEEK)
})

const activityByDate = computed(() => {
  const map = new Map()

  function ensureDay(date) {
    const key = toDateKey(date)
    if (!map.has(key)) {
      map.set(key, { dealUpdates: 0, reportLaunches: 0 })
    }
    return map.get(key)
  }

  for (const deal of props.deals) {
    const date = parseDate(deal?.updatedAt)
    if (date) ensureDay(date).dealUpdates += 1
  }

  for (const report of props.reports) {
    const date = parseDate(report?.publishedAt)
    if (date) ensureDay(date).reportLaunches += 1
  }

  return map
})

const totalActivity = computed(() => {
  const startKey = toDateKey(calendarStart.value)
  const endKey = toDateKey(today.value)
  let total = 0

  for (const [key, activity] of activityByDate.value) {
    if (key >= startKey && key <= endKey) {
      total += activity.dealUpdates + activity.reportLaunches
    }
  }

  return total
})

const maxActivity = computed(() => {
  let max = 0
  for (const activity of activityByDate.value.values()) {
    max = Math.max(max, activity.dealUpdates + activity.reportLaunches)
  }
  return max
})

function activityLevel(count) {
  if (!count || maxActivity.value === 0) return 0
  return Math.max(1, Math.ceil((count / maxActivity.value) * 4))
}

const calendarDays = computed(() => (
  Array.from({ length: WEEK_COUNT * DAYS_PER_WEEK }, (_, index) => {
    const date = addDays(calendarStart.value, index)
    const key = toDateKey(date)
    const isFuture = date > today.value
    const activity = activityByDate.value.get(key) || { dealUpdates: 0, reportLaunches: 0 }
    const count = activity.dealUpdates + activity.reportLaunches
    const dateLabel = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    const detail = count
      ? `${count} 次动态（${activity.dealUpdates} 次合作更新，${activity.reportLaunches} 份报告上线）`
      : '暂无动态'

    return {
      key,
      isFuture,
      hasReport: activity.reportLaunches > 0,
      level: activityLevel(count),
      title: isFuture ? `${dateLabel}：尚未到达` : `${dateLabel}：${detail}`
    }
  })
))

const monthLabels = computed(() => {
  const labels = Array(WEEK_COUNT).fill('')

  for (let weekIndex = 0; weekIndex < WEEK_COUNT; weekIndex += 1) {
    const weekStart = addDays(calendarStart.value, weekIndex * DAYS_PER_WEEK)
    const days = Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => addDays(weekStart, dayIndex))
    const firstOfMonth = days.find((day) => day.getDate() === 1)

    if (firstOfMonth) {
      labels[weekIndex] = `${firstOfMonth.getMonth() + 1}月`
    } else if (weekIndex === 0) {
      labels[weekIndex] = `${weekStart.getMonth() + 1}月`
    }
  }

  return labels
})

function levelClass(level) {
  if (level === 4) return 'bg-teal-700'
  if (level === 3) return 'bg-teal-500'
  if (level === 2) return 'bg-teal-300'
  if (level === 1) return 'bg-teal-100'
  return 'bg-slate-100'
}

function cellClass(day) {
  if (day.isFuture) return 'border-slate-100 bg-slate-50'

  const outlineClass = day.hasReport
    ? 'border-amber-500 ring-1 ring-inset ring-amber-500'
    : day.level === 0
      ? 'border-slate-100'
      : 'border-transparent'

  return [levelClass(day.level), outlineClass]
}

onMounted(async () => {
  await nextTick()
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth
  }
})
</script>
