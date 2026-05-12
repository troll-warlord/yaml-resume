<script setup lang="ts">
import type { ResumeSection } from '@/types/resume'
import { useResumeData } from '@/composables/useResumeData'
import SectionHeader from './SectionHeader.vue'

defineProps<{ section: ResumeSection }>()

const { config } = useResumeData()
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />
    <ul class="space-y-2">
      <li
        v-for="(point, i) in section.bullets"
        :key="i"
        class="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed"
      >
        <span class="mt-0.75 shrink-0 text-primary font-bold leading-none">{{ config?.bulletMarker ?? '>' }}</span>
        <span>{{ point }}</span>
      </li>
    </ul>
  </section>
</template>
