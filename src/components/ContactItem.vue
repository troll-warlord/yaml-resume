<script setup lang="ts">
import ResumeIcon from './ResumeIcon.vue'

withDefaults(
  defineProps<{
    icon: string
    label: string
    href?: string
    external?: boolean
    reverse?: boolean
  }>(),
  { href: undefined, external: false, reverse: false },
)
</script>

<template>
  <div :class="['flex items-center gap-2 text-sm text-text-muted', reverse ? 'flex-row-reverse' : '']">
    <ResumeIcon :name="icon" :size="15" class="text-primary shrink-0" />
    <a
      v-if="href"
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener noreferrer' : undefined"
      class="text-text-muted hover:text-primary transition-colors"
    >{{ label }}</a>
    <span v-else>{{ label }}</span>
  </div>
</template>
