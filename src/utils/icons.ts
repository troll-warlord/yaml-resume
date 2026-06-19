import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faGlobe,
  faCalendarDays,
  faArrowUpRightFromSquare,
  faDownload,
  faAward,
} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export const icons: Record<string, IconDefinition> = {
  mail: faEnvelope,
  phone: faPhone,
  'map-pin': faLocationDot,
  linkedin: faLinkedin,
  github: faGithub,
  credly: faAward,
  globe: faGlobe,
  calendar: faCalendarDays,
  'external-link': faArrowUpRightFromSquare,
  download: faDownload,
}
