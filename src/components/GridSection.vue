<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeSection, SkillGroup, ProjectItem } from '@/types/resume'
import SectionHeader from './SectionHeader.vue'
import ResumeIcon from './ResumeIcon.vue'

const props = defineProps<{ section: ResumeSection }>()

const isSkillGroups = computed(() => {
  const first = props.section.items?.[0]
  return first != null && 'group' in first
})

function asSkillGroups(items: ResumeSection['items']): SkillGroup[] {
  return (items ?? []) as SkillGroup[]
}
function asProjects(items: ResumeSection['items']): ProjectItem[] {
  return (items ?? []) as ProjectItem[]
}
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />

    <div v-if="isSkillGroups" class="flex flex-col divide-y divide-border">
      <div
        v-for="group in asSkillGroups(section.items)"
        :key="group.group"
        class="flex items-start gap-4 py-2.5"
      >
        <span class="w-xs shrink-0 text-xs font-semibold uppercase tracking-widest text-text-muted pt-0.5">
          {{ group.group }}
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in group.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-muted border border-border"
          >{{ tag }}</span>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col divide-y divide-border">
      <article
        v-for="project in asProjects(section.items)"
        :key="project.title"
        class="py-3"
      >
        <div class="flex items-center gap-2 mb-1">
          <h3 class="text-sm font-semibold text-text-main">{{ project.title }}</h3>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-muted hover:text-primary"
            aria-label="Open project"
          >
            <ResumeIcon name="external-link" :size="12" />
          </a>
        </div>
        <p class="text-sm text-text-muted mb-2">{{ project.description }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-muted border border-border"
          >{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
