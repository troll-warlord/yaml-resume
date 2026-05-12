<script setup lang="ts">
import type { ResumeSection } from '@/types/resume'
import SectionHeader from './SectionHeader.vue'

defineProps<{ section: ResumeSection }>()
</script>

<template>
  <section class="mb-section-gap">
    <SectionHeader :title="section.title" />
    <p class="text-sm text-text-muted leading-relaxed max-w-prose">{{ section.content }}</p>
  </section>
</template>
