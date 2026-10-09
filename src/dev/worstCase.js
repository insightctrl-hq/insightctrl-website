// Dev-only stress fixtures for the break-ui pass. Swapped in at the data boundary
// via ?data=worst|empty|one. Never active in production builds.
import { useSearchParams } from 'react-router-dom'

export const DATA_MODES = ['demo', 'worst', 'empty', 'one']

export function useDataMode() {
  const [params] = useSearchParams()
  if (!import.meta.env.DEV) return 'demo'
  const mode = params.get('data')
  return DATA_MODES.includes(mode) ? mode : 'demo'
}

// Picks the dataset for the current mode. `worst` rows mix failures across items,
// the way real data does, rather than stacking every failure into the first one.
export function pickFixture(mode, demo, worst) {
  if (mode === 'worst') return worst
  if (mode === 'empty') return []
  if (mode === 'one') return worst.slice(0, 1)
  return demo
}

export const WORST_POSTS = [
  {
    title:
      "Why your 'operations problem' is really a Structure failure: what twelve months of founder diagnostics in Port Harcourt, Lagos and Abuja taught us",
    url: 'https://insightctrl.substack.example.com/p/structure-failure',
    date: 'Sep 30, 2026',
    excerpt:
      'Most founders who book a diagnostic believe they have a people problem. Nine times out of ten the people are fine and the structure underneath them…',
  },
  {
    // Feed item with an empty <title> and no description or pubDate, as the hook
    // hands it over after its 'Untitled' fallback
    title: 'Untitled',
    url: 'https://insightctrl.substack.example.com/p/untitled',
    date: '',
    excerpt: '',
  },
  {
    title: 'insightctrl.substack.example.com/p/the-seven-stages-of-chaos-to-ctrl-explained',
    url: 'https://insightctrl.substack.example.com/p/seven-stages',
    date: 'Aug 4, 2026',
    excerpt: 'Short one.',
  },
  {
    title: '🚀 Q&A: Cash & control with Ìyá Àlàkẹ́ Foods',
    url: 'https://insightctrl.substack.example.com/p/qa',
    date: 'Jul 12, 2026',
    excerpt:
      'Ọ̀pọ̀lọpọ̀ àwọn oníṣòwò ló ń dojú kọ ìṣòro yìí. A sat down with the founder to talk through the three controls that changed how her kitchen runs every…',
  },
]

export const WORST_PROJECTS = [
  {
    client: 'Chukwuemeka & Daughters Integrated Agro-Allied Services Ltd',
    industry: 'Agriculture, food processing and export logistics',
    status: 'In progress',
    engagementType: 'Full Build, then Partner',
    description:
      'A family agro-allied business moving from founder-run to managed. Designed procurement controls, a weekly operating rhythm, and the reporting line between three processing sites and head office.',
  },
  {
    client: 'OkonkwoBrothersPetroleumServices',
    status: 'Live',
    description: 'Pricing logic.',
  },
  {
    client: 'Ìyá Àlàkẹ́ Foods',
    industry: 'Hospitality',
    engagementType: 'Operating Room',
    description:
      'One sixty-minute session that turned into a cash-control system the kitchen still uses every day.',
  },
]

export const WORST_TEAM = [
  {
    name: 'Oluwadamilare Adeyemi-Ogunleye',
    bio: 'Head of Operational Engineering, Systems Integration and Post-Engagement Support. Leads the handover from build to client team, owns the reporting templates every engagement ships with, and runs the quarterly review for partner clients across Port Harcourt, Lagos and Abuja.',
  },
  {
    name: 'Jo',
    bio: '',
  },
  {
    name: 'Chukwuebuka Abah',
    bio: 'Operational review.',
  },
]
