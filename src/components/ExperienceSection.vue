<script setup lang="ts">
import type { ResumeSection, TimelineItem } from '@/types/resume'
import { useResumeData } from '@/composables/useResumeData'
import SectionHeader from './SectionHeader.vue'
import SectionItem from './SectionItem.vue'

defineProps<{ section: ResumeSection }>()

const { config } = useResumeData()

function asTimeline(items: ResumeSection['items']): TimelineItem[] {
  return (items ?? []) as TimelineItem[]
}
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />

    <div class="flex flex-col gap-item-gap pl-1.5">
      <SectionItem
        v-for="item in asTimeline(section.items)"
        :key="item.designation + item.organization"
        :title="section.flipHierarchy ? item.designation : item.organization"
        :subtitle="section.flipHierarchy ? item.organization : item.designation"
        :url="item.url"
        :start-date="item.startDate"
        :end-date="item.endDate"
        :current="item.current"
        :show-duration="config?.showDuration ?? false"
        :date-locale="config?.dateLocale"
        :location="item.location"
        :show-location="config?.showLocation ?? true"
        :bullets="item.bullets"
        :bullet-marker="config?.bulletMarker ?? '>'"
      />
    </div>
  </section>
</template>
