<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeSection, SkillGroup } from '@/types/resume'
import { useResumeData } from '@/composables/useResumeData'
import SectionHeader from './SectionHeader.vue'

defineProps<{ section: ResumeSection }>()

const { config } = useResumeData()

const tagStyle = computed(() => config?.tagStyle ?? 'dot')

const separator = computed(() => {
  if (tagStyle.value === 'dot') return ' · '
  if (tagStyle.value === 'slash') return ' / '
  if (tagStyle.value === 'comma') return ', '
  return null
})

function asSkillGroups(items: ResumeSection['items']): SkillGroup[] {
  return (items ?? []) as SkillGroup[]
}
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />

    <div class="flex flex-col pl-1.5 gap-item-gap">
      <div
        v-for="group in asSkillGroups(section.items)"
        :key="group.group"
        class="relative gap-4 pl-5 gap-item-gap before:absolute before:left-0 before:bottom-0 before:top-2 before:w-px before:bg-border"
      >
        <span class="absolute -left-0.75 top-1.75 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
        <span class="items-start min-w-60 shrink-0 text-sm font-semibold text-text-main pt-0.5">{{ group.group }}</span>

        <div class="flex flex-wrap gap-1.5">
          <template v-if="separator">
            <span class="text-sm text-text-muted">{{ group.tags.join(separator) }}</span>
          </template>
          <template v-else>
            <span
              v-for="tag in group.tags"
              :key="tag"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-muted border border-border"
              >{{ tag }}</span
            >
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
