<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { icons } from '@/utils/icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 16 },
)

const icon = computed(() => icons[props.name])
</script>

<template>
  <FontAwesomeIcon v-if="icon" :icon="icon" :style="{ fontSize: `${size}px` }" />
</template>
