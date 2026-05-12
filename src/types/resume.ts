// Basics

export interface SocialLink {
  network: string
  username?: string
  url: string
  icon: string
}

export interface Location {
  city: string
  region: string
  country: string
}

export interface Basics {
  name: string
  label: string
  email: string
  phone: string
  location: Location
  summary: string
  social: SocialLink[]
}

// Sections

export type SectionType = 'experience' | 'skills' | 'projects' | 'text' | 'list'

export interface TimelineItem {
  designation: string
  organization: string
  location?: string
  url?: string
  startDate: string
  endDate: string | null
  current: boolean
  bullets?: string[]
}

export interface SkillGroup {
  group: string
  tags: string[]
}

export interface ProjectItem {
  title: string
  url: string
  description: string
  tags: string[]
}

export interface ResumeConfig {
  showDuration?: boolean
  showLocation?: boolean
  bulletMarker?: string
  dateLocale?: string
  accentColor?: string
  pageSize?: string
  fontSize?: number
  tagStyle?: 'pill' | 'dot' | 'slash' | 'comma'
}

export interface ResumeSection {
  id: string
  title: string
  type: SectionType
  items?: TimelineItem[] | SkillGroup[] | ProjectItem[]
  content?: string
  bullets?: string[]
  flipHierarchy?: boolean
  breakInside?: boolean
}

export interface ResumeData {
  basics: Basics
  sections: ResumeSection[]
  config?: ResumeConfig
}

export interface ResumeData {
  basics: Basics
  sections: ResumeSection[]
}
