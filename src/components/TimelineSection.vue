<script setup lang="ts">
import type { ResumeSection, TimelineItem } from '@/types/resume'
import { useResumeData } from '@/composables/useResumeData'
import SectionHeader from './SectionHeader.vue'
import DateRange from './DateRange.vue'
import ResumeIcon from './ResumeIcon.vue'

defineProps<{ section: ResumeSection }>()

const { config } = useResumeData()

function asTimeline(items: ResumeSection['items']): TimelineItem[] {
  return (items ?? []) as TimelineItem[]
}
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />

    <div class="flex flex-col gap-item-gap">
      <article
        v-for="item in asTimeline(section.items)"
        :key="item.designation + item.organization"
        class="relative pl-5 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border"
      >
        <span class="absolute -left-0.75 top-1.75 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />

        <div class="flex flex-col gap-1">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-semibold leading-snug text-text-main">
                {{ section.flipHierarchy ? item.designation : item.organization }}
              </h3>
              <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-muted hover:text-primary mt-0.5"
                aria-label="View credential"
              >
                <ResumeIcon name="external-link" :size="12" />
              </a>
            </div>
            <DateRange
              :start-date="item.startDate"
              :end-date="item.endDate"
              :current="item.current"
              :show-duration="config?.showDuration ?? false"
              :date-locale="config?.dateLocale"
              class="shrink-0 mt-0.5"
            />
          </div>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <span class="text-sm font-medium italic text-text-muted">{{ section.flipHierarchy ? item.organization : item.designation }}</span>
            <template v-if="item.location && (config?.showLocation ?? true)">
              <span class="text-text-muted text-sm hidden sm:inline">·</span>
              <span class="flex items-center gap-1 text-sm text-text-muted">
                <ResumeIcon name="map-pin" :size="11" />
                {{ item.location }}
              </span>
            </template>
          </div>

          <ul v-if="item.bullets?.length" class="mt-2 flex flex-col gap-1">
            <li
              v-for="bullet in item.bullets"
              :key="bullet"
              class="flex gap-2 text-sm text-text-muted"
            >
              <span class="text-primary mt-0.5 shrink-0">{{ config?.bulletMarker ?? '>' }}</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
