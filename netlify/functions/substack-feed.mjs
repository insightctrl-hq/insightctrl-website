// Fetches the Substack feed server-side: Substack's feed endpoint sends no CORS
// headers, so the browser can't read it directly. Reached at /api/substack-feed
// through the rewrite in public/_redirects.
const SUBSTACK_RSS_URL = 'https://insightctrl.substack.com/feed'

export default async function handler() {
  try {
    const response = await fetch(SUBSTACK_RSS_URL)
    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`)
    const xml = await response.text()
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        // Cache at Netlify's edge for 10 minutes; browsers always revalidate
        'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch {
    return new Response('', { status: 502 })
  }
}
