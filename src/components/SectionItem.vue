<script setup lang="ts">
import DateRange from './DateRange.vue'
import ResumeIcon from './ResumeIcon.vue'

defineProps<{
  title: string
  url?: string
  subtitle?: string
  startDate?: string
  endDate?: string | null
  current?: boolean
  showDuration?: boolean
  dateLocale?: string
  location?: string
  showLocation?: boolean
  bullets?: string[]
  bulletMarker?: string
  description?: string
  tags?: string[]
  separator?: string | null
}>()
</script>

<template>
  <article
    class="relative pl-5 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border"
  >
    <span class="absolute -left-0.75 top-1.75 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />

    <div class="flex flex-col gap-1">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-2">
          <h3 class="text-base font-semibold leading-snug text-text-main">{{ title }}</h3>
          <a
            v-if="url"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-muted hover:text-primary mt-0.5"
            aria-label="Open link"
          >
            <ResumeIcon name="external-link" :size="12" />
          </a>
        </div>
        <DateRange
          v-if="startDate"
          :start-date="startDate"
          :end-date="endDate"
          :current="current"
          :show-duration="showDuration"
          :date-locale="dateLocale"
          class="shrink-0 mt-0.5"
        />
      </div>

      <div v-if="subtitle" class="flex flex-wrap items-center gap-x-3 gap-y-0.5">
        <span class="text-sm font-medium italic text-text-muted">{{ subtitle }}</span>
        <template v-if="location && (showLocation ?? true)">
          <span class="text-text-muted text-sm hidden sm:inline">·</span>
          <span class="flex items-center gap-1 text-sm text-text-muted">
            <ResumeIcon name="map-pin" :size="11" />
            {{ location }}
          </span>
        </template>
      </div>

      <ul v-if="bullets?.length" class="mt-2 flex flex-col gap-1">
        <li v-for="bullet in bullets" :key="bullet" class="flex gap-2 text-sm text-text-muted">
          <span class="text-primary mt-0.5 shrink-0">{{ bulletMarker ?? '>' }}</span>
          <span>{{ bullet }}</span>
        </li>
      </ul>

      <p v-if="description" class="text-sm text-text-muted">{{ description }}</p>

      <div v-if="tags?.length" class="flex flex-wrap gap-1.5 mt-1">
        <template v-if="separator">
          <span class="text-sm text-text-muted">{{ tags.join(separator) }}</span>
        </template>
        <template v-else>
          <span
            v-for="tag in tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-muted border border-border"
            >{{ tag }}</span
          >
        </template>
      </div>
    </div>
  </article>
</template>
