import type { SectionType } from '@/types/resume'
import type { Component } from 'vue'
import TimelineSection from '@/components/TimelineSection.vue'
import GridSection from '@/components/GridSection.vue'
import TextSection from '@/components/TextSection.vue'
import ListSection from '@/components/ListSection.vue'

export const sectionRegistry: Record<SectionType, Component> = {
  timeline: TimelineSection,
  grid: GridSection,
  text: TextSection,
  list: ListSection,
}
