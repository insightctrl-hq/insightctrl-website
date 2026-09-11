import { useEffect, useState } from 'react'
import { SUBSTACK_RSS_URL } from '../constants/links'

const PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(SUBSTACK_RSS_URL)}`
const MAX_POSTS = 5
const EXCERPT_LENGTH = 120

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
}

function toExcerpt(text) {
  if (text.length <= EXCERPT_LENGTH) return text
  return `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`
}

function formatDate(pubDate) {
  const date = new Date(pubDate)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function parseFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
  if (doc.querySelector('parsererror')) throw new Error('Feed did not parse as XML')

  const items = [...doc.querySelectorAll('item')].slice(0, MAX_POSTS)

  return items.map((item) => {
    const title = item.querySelector('title')?.textContent?.trim() ?? 'Untitled'
    const link = item.querySelector('link')?.textContent?.trim() ?? SUBSTACK_RSS_URL
    const pubDate = item.querySelector('pubDate')?.textContent?.trim() ?? ''
    const rawDescription =
      item.querySelector('description')?.textContent ??
      item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent ??
      ''

    return {
      title,
      url: link,
      date: formatDate(pubDate),
      excerpt: toExcerpt(stripHtml(rawDescription)),
    }
  })
}

async function fetchFeed(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Feed request failed: ${response.status}`)
  return parseFeed(await response.text())
}

export function useSubstackFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const direct = await fetchFeed(SUBSTACK_RSS_URL)
        if (!cancelled) setPosts(direct)
      } catch {
        try {
          const proxied = await fetchFeed(PROXY_URL)
          if (!cancelled) setPosts(proxied)
        } catch (proxyErr) {
          if (!cancelled) setError(proxyErr)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { posts, loading, error, feedUrl: SUBSTACK_RSS_URL }
}
