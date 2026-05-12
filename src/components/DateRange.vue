<script setup lang="ts">
import { computed } from 'vue'
import ResumeIcon from './ResumeIcon.vue'

const props = defineProps<{
  startDate: string
  endDate?: string | null
  current?: boolean
  showDuration?: boolean
  dateLocale?: string
}>()

function parseDate(str: string): Date {
  const [year, month] = str.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1)
}

function fmt(str: string): string {
  return parseDate(str).toLocaleDateString(props.dateLocale ?? 'en-US', { month: 'short', year: 'numeric' })
}

function duration(start: string, end: string | null | undefined): string {
  const s = parseDate(start)
  const e = end ? parseDate(end) : new Date()
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  const yrs = Math.floor(months / 12)
  const mos = months % 12
  const parts: string[] = []
  if (yrs > 0) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`)
  if (mos > 0) parts.push(`${mos} mo${mos > 1 ? 's' : ''}`)
  return parts.join(' ') || '< 1 mo'
}

const displayStart = computed(() => fmt(props.startDate))
const displayEnd = computed(() =>
  props.current ? 'Present' : props.endDate ? fmt(props.endDate) : 'Present',
)
const displayDuration = computed(() =>
  duration(props.startDate, props.current ? null : props.endDate),
)
</script>

<template>
  <span class="inline-flex items-center gap-1.5 text-sm text-text-muted">
    <ResumeIcon name="calendar" :size="13" />
    <span>{{ displayStart }} – {{ displayEnd }}</span>
    <template v-if="showDuration">
      <span class="text-border">·</span>
      <span class="font-medium">{{ displayDuration }}</span>
    </template>
  </span>
</template>
