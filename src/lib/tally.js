// Loads Tally's popup script on first use, so pages that never open a popup
// don't pay for it.
const SCRIPT_SRC = 'https://tally.so/widgets/embed.js'

let loading = null

function loadTally() {
  if (window.Tally) return Promise.resolve(window.Tally)
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => (window.Tally ? resolve(window.Tally) : reject(new Error('Tally missing')))
      script.onerror = () => {
        loading = null
        reject(new Error('Tally script failed to load'))
      }
      document.body.appendChild(script)
    })
  }
  return loading
}

export async function openTallyPopup(formId, options) {
  const Tally = await loadTally()
  Tally.openPopup(formId, options)
}

// Remembers for this browser session that the visitor has already left their contact
// details, so later stages and Print don't ask again.
const CONTACT_GIVEN_KEY = 'insightctrl-results-email-given'

export function rememberContactGiven() {
  try {
    sessionStorage.setItem(CONTACT_GIVEN_KEY, '1')
  } catch {
    // storage blocked: they'll just be asked again next time
  }
}

export function hasGivenContact() {
  try {
    return sessionStorage.getItem(CONTACT_GIVEN_KEY) === '1'
  } catch {
    return false
  }
}
