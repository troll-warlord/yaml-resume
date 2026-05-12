<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center gap-3 mb-6 pl-3 border-l-4 border-primary">
    <h2 class="text-xl font-semibold tracking-tight text-text-main">{{ title }}</h2>
    <div class="flex-1 h-px bg-border" role="separator" aria-hidden="true" />
  </div>
</template>
