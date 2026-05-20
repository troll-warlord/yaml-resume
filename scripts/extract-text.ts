import { readFileSync } from 'fs'
import { PDFParse } from 'pdf-parse'

async function testExtraction() {
  try {
    // 1. Read your generated PDF file into a buffer
    const dataBuffer = readFileSync('./resume.pdf')

    // 2. Initialize the modern PDFParse class instance
    const parser = new PDFParse({ data: dataBuffer })

    // 3. Extract the text content using the modern async method
    const data = await parser.getText()

    console.log('\n--- RAW EXTRACTED TEXT ---')
    console.log(data.text)
    console.log('--------------------------\n')

    // 4. Run your target validation test
    const searchTarget = 'Architected the foundational multi-cloud infrastructure'

    if (data.text.includes(searchTarget)) {
      console.log('✅ SUCCESS: The target text was found intact!')
    } else {
      console.log('❌ FAILED: The text might still be fractured.')
    }

    // 5. Always call destroy() to free up the underlying memory
    await parser.destroy()
  } catch (error) {
    console.error('Execution Failed:', error)
  }
}

testExtraction()
