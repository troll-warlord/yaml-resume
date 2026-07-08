<script setup lang="ts">
import type { ResumeSection, ProjectItem } from '@/types/resume'
import { useTagSeparator } from '@/composables/useTagSeparator'
import SectionHeader from './SectionHeader.vue'
import SectionItem from './SectionItem.vue'

defineProps<{ section: ResumeSection }>()

const { separator } = useTagSeparator()

function asProjects(items: ResumeSection['items']): ProjectItem[] {
  return (items ?? []) as ProjectItem[]
}
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />

    <div class="flex flex-col gap-item-gap pl-1.5">
      <SectionItem
        v-for="project in asProjects(section.items)"
        :key="project.title"
        :title="project.title"
        :url="project.url"
        :description="project.description"
        :tags="project.tags"
        :separator="separator"
      />
    </div>
  </section>
</template>
