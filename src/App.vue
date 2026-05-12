<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { sectionRegistry } from '@/utils/sectionRegistry'
import { useResumeData } from '@/composables/useResumeData'
import ContactItem from '@/components/ContactItem.vue'

const resume = useResumeData()
const { basics, sections, config } = resume

function downloadPdf() {
  window.print()
}

onMounted(() => {
  if (config?.accentColor) {
    document.documentElement.style.setProperty('--color-primary', config.accentColor)
  }
  if (config?.fontSize) {
    document.documentElement.style.fontSize = `${config.fontSize}px`
  }
})

useHead({
  title: `${basics.name} – ${basics.label}`,
  meta: [
    { name: 'description', content: basics.summary },
    { property: 'og:title', content: `${basics.name} – ${basics.label}` },
    { property: 'og:description', content: basics.summary },
  ],
  style: [{ innerHTML: `@page { size: ${config?.pageSize ?? 'A4'} portrait; }` }],
})
</script>

<template>
  <!-- Page shell — grey on screen, transparent in print -->
  <div class="min-h-screen bg-gray-100 py-8 px-4 print:bg-transparent print:p-0 print:m-0">
    <!-- A4 card -->
    <div id="resume" class="a4-card bg-background mx-auto px-8 py-8 text-text-main">
      <header class="mb-section-gap">
        <div class="flex items-start justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold leading-tight mb-1 text-text-main">{{ basics.name }}</h1>
            <p class="text-lg font-medium text-primary mb-3">{{ basics.label }}</p>
            <p class="text-sm text-text-muted leading-relaxed">{{ basics.summary }}</p>
          </div>

          <div class="flex flex-col gap-1.5 items-end shrink-0 ml-4">
            <ContactItem reverse icon="mail" :label="basics.email" :href="`mailto:${basics.email}`" />
            <ContactItem reverse icon="phone" :label="basics.phone" :href="`tel:${basics.phone}`" />
            <ContactItem reverse icon="map-pin" :label="`${basics.location.city}, ${basics.location.region}`" />
            <ContactItem
              v-for="link in basics.social"
              :key="link.network"
              reverse
              :icon="link.icon"
              :label="link.username ?? link.network"
              :href="link.url"
              :external="true"
            />
          </div>
        </div>

        <div class="mt-6 h-px w-full bg-border" role="separator" aria-hidden="true" />
      </header>

      <main>
        <div
          v-for="section in sections"
          :key="section.id"
          :class="{ 'print:break-inside-avoid': section.breakInside }"
        >
          <component
            :is="sectionRegistry[section.type]"
            :section="section"
          />
        </div>
      </main>
    </div>

    <!-- Download button — hidden in print -->
    <button
      class="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label="Download resume as PDF"
      @click="downloadPdf"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>Download PDF</span>
    </button>
  </div>
</template>

<style>
.a4-card {
  width: 210mm;
  min-height: 297mm;
  max-width: 210mm;
}
</style>
