// @ts-expect-error - vite-plugin-yaml has no type declarations for *.yaml imports
import rawData from '../../resume.yaml'
import type { ResumeData } from '@/types/resume'

const resume = rawData as ResumeData

export function useResumeData(): ResumeData {
  if (!resume.basics) throw new Error('resume.yaml is missing the `basics` key')
  if (!Array.isArray(resume.sections)) throw new Error('resume.yaml is missing `sections` array')
  return resume
}
