import type { SectionType } from '@/types/resume'
import type { Component } from 'vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import TextSection from '@/components/TextSection.vue'
import ListSection from '@/components/ListSection.vue'

export const sectionRegistry: Record<SectionType, Component> = {
  experience: ExperienceSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  text: TextSection,
  list: ListSection,
}
