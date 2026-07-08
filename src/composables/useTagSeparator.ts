import { computed } from 'vue'
import { useResumeData } from '@/composables/useResumeData'

export function useTagSeparator() {
  const { config } = useResumeData()
  const tagStyle = computed(() => config?.tagStyle ?? 'dot')
  const separator = computed<string | null>(() => {
    if (tagStyle.value === 'dot') return ' · '
    if (tagStyle.value === 'slash') return ' / '
    if (tagStyle.value === 'comma') return ', '
    return null
  })
  return { separator }
}
