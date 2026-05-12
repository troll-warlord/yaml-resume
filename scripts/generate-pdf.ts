import { chromium } from 'playwright'
import { PDFDocument } from 'pdf-lib'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

const SITE_URL = process.env.SITE_URL ?? 'http://localhost:4173'
const OUT_PATH = resolve(process.cwd(), 'resume.pdf')
const YAML_PATH = resolve(process.cwd(), 'resume.yaml')

interface ResumeYaml {
  basics: { name: string; label: string; summary?: string }
  sections?: Array<{ type: string; items?: Array<{ tags?: string[] }> }>
}

function extractKeywords(data: ResumeYaml): string {
  const tags: string[] = []
  for (const section of data.sections ?? []) {
    if (section.type === 'grid') {
      for (const item of section.items ?? []) {
        if (item.tags) tags.push(...item.tags)
      }
    }
  }
  return [...new Set(tags)].join(', ')
}

async function injectMetadata(pdfBytes: Uint8Array, data: ResumeYaml): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdfBytes)
  doc.setTitle(`${data.basics.name} – ${data.basics.label}`)
  doc.setAuthor(data.basics.name)
  doc.setSubject(data.basics.label)
  doc.setKeywords([extractKeywords(data)])
  doc.setCreator('yaml-resume')
  doc.setProducer('yaml-resume + Playwright')
  doc.setCreationDate(new Date())
  doc.setModificationDate(new Date())
  return doc.save()
}

async function generatePdf() {
  console.log(`Generating PDF from ${SITE_URL} …`)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.emulateMedia({ media: 'screen' })
  await page.goto(SITE_URL, { waitUntil: 'networkidle' })
  await page.waitForFunction('document.fonts.ready')

  const pdfBytes = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '14mm', right: '14mm' },
  })

  await browser.close()

  const resumeData = yaml.load(readFileSync(YAML_PATH, 'utf8')) as ResumeYaml
  const finalBytes = await injectMetadata(pdfBytes, resumeData)
  writeFileSync(OUT_PATH, finalBytes)

  console.log(`PDF saved to ${OUT_PATH}`)
}

generatePdf().catch((err) => {
  console.error(err)
  process.exit(1)
})
