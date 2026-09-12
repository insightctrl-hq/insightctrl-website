const SUBSTACK_RSS_URL = 'https://insightctrl.substack.com/feed'

export default async function handler(req, res) {
  try {
    const response = await fetch(SUBSTACK_RSS_URL)
    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`)
    const xml = await response.text()
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600')
    res.status(200).send(xml)
  } catch {
    res.status(502).send('')
  }
}
