import puppeteer from 'puppeteer'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.env.SHOT_BASE ?? 'http://localhost:5173'

// route -> output file
const targets = process.argv.slice(2)
if (targets.length === 0) {
  console.error('usage: node scripts/shot.mjs <route>:<outfile> [...]  e.g. /:shots/home.png')
  process.exit(1)
}

const width = Number(process.env.SHOT_WIDTH ?? 1440)
const height = Number(process.env.SHOT_HEIGHT ?? 900)
const fullPage = process.env.SHOT_FULL === '1'
const theme = process.env.SHOT_THEME ?? 'light'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=2', '--hide-scrollbars'],
})

try {
  for (const target of targets) {
    const idx = target.lastIndexOf(':')
    const route = target.slice(0, idx)
    const out = resolve(target.slice(idx + 1))
    await mkdir(dirname(out), { recursive: true })

    const page = await browser.newPage()
    await page.setViewport({ width, height, deviceScaleFactor: 2 })

    // Stall or mock the Substack feed so both states can be captured deterministically.
    const isFeed = (url) => url.includes('substack') || url.includes('allorigins')

    if (process.env.SHOT_HANG_FEED === '1') {
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        if (isFeed(req.url())) return // never settle
        req.continue()
      })
    } else if (process.env.SHOT_MOCK_FEED === '1') {
      const items = Array.from({ length: 4 }, (_, i) => `
        <item>
          <title>Sample think-piece number ${i + 1}</title>
          <link>https://insightctrl.substack.com/p/sample-${i + 1}</link>
          <pubDate>Wed, 0${i + 1} Sep 2026 09:00:00 GMT</pubDate>
          <description><![CDATA[<p>A founder called Tunde has a business that looks fine from the outside, and a structure that does not.</p>]]></description>
        </item>`).join('')
      const body = `<?xml version="1.0"?><rss version="2.0"><channel><title>InsightCTRL</title>${items}</channel></rss>`
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        if (isFeed(req.url())) {
          req.respond({
            status: 200,
            contentType: 'application/xml',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body,
          })
          return
        }
        req.continue()
      })
    }
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('insightctrl-theme-choice', t)
    }, theme)

    await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.evaluate(() => document.fonts.ready)
    // let entrance animations finish so nothing is captured mid-transition
    await new Promise((r) => setTimeout(r, Number(process.env.SHOT_DELAY ?? 1200)))

    await page.screenshot({ path: out, fullPage })
    console.log(`${route} -> ${out}`)
    await page.close()
  }
} finally {
  await browser.close()
}
