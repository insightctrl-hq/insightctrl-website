# Next build session: InsightCTRL redesign

Written 8 Nov 2026. Everything so far is committed on the `redesign` branch. Nothing is pushed or deployed.

Task sizes: **S** is under an hour, **M** is a few hours, **L** is a session or more. Token figures are rough estimates of Claude usage for each task, including screenshots and review rounds. "You" marks work only Chibueze can do, which uses no tokens.

## Before launch

| # | Task | Who | Size | Tokens (approx.) | Needs from you |
|---|------|-----|------|------------------|----------------|
| 1 | **Set up email on your own domain** (for example `hello@insightctrl…`) to replace `insightctrl@gmail.com`. Claude then updates the footer and links. | You, then Claude | S | 5k | The domain and the address |
| 2 | **Link previews, page titles and search basics.** Add Open Graph and Twitter tags, a share image for WhatsApp and LinkedIn previews, a title and description for each page, a sitemap and a robots file. | Claude | S–M | 40–60k | The live domain. Approve the page titles and descriptions. |
| 3 | **Write 3–5 Insights essays** on Substack. Lead with Chaos to CTRL explained. Claude edits each one with the humanizer if you want. | You, Claude edits | L (your time) | 20–40k per essay edited | The drafts |
| 4 | **Add a hidden `source` field in both Tally forms** (intake and Partner). The site already sends it on every link. | You | S | 0 | |
| 5 | **Connect the email step for diagnostic results.** Make a short Tally form (email plus hidden stage, band and score) and paste its ID. | You, then Claude | S | 10k | The form ID |
| 6 | **Pre-launch check.** Accessibility (keyboard, contrast, screen reader), speed and Lighthouse, Safari and Firefox, a real phone, every link and form. Fix whatever turns up. | Claude | M | 60–100k | |
| 7 | **Push `redesign`, get a Netlify preview, check it on your phone, then merge to `main`.** | Claude, with your go-ahead at each step | S | 20–40k | A yes to push, then a yes to merge |

## After launch: turning visitors into bookings

| # | Task | Who | Size | Tokens (approx.) | Needs from you |
|---|------|-----|------|------------------|----------------|
| 8 | **Real booking for the Operating Room.** A calendar with payment (Cal.com or Calendly with Paystack) replaces the enquiry form for the fixed-price session. | You set up, Claude wires it in | S–M | 15–30k | Booking link and payment setup |
| 9 | **Sample Operating Room report.** A made-up business, clearly labelled as a sample, written in the report's six-part structure, linked from Services and the result screen. | Claude drafts, you approve | L | 120–200k (draft, rounds, page) | A decision first: it sits close to the "no proof" rule |
| 10 | **"How an engagement runs" on Services.** Discovery call, written scope, engagement letter, phased delivery, taken from the Operations Manual. | Claude drafts, you approve | M | 50–80k | Approve the copy |

## Polish

| # | Task | Who | Size | Tokens (approx.) | Needs from you |
|---|------|-----|------|------------------|----------------|
| 11 | **Founder photo shoot** in one consistent style, including shots of you at work. Claude crops them and swaps them in. | You, then Claude | S (for Claude) | 10–20k | The photos |
| 12 | **Typeface decision.** Keep Satoshi, or license a display face for headlines. Includes a retest of every page. | Decision, then Claude | M | 30–50k | The decision, plus a licence if you pick a new face |
| 13 | **Home arc:** keep the loop or have it play once. It loops "for now". | Decision, then Claude | S | 5–10k | The decision |
| 14 | **Clear the remaining code warnings** (three minor React lint warnings, no errors). | Claude | S | 10–20k | |

**Rough total for Claude's side:** about 400–700k tokens, depending on how many essays get edited and how many review rounds the copy takes.

## Rules to keep in force

- Approve all copy in chat before it goes into the code.
- No case-study or proof sections without a decision. Keep Rereandco and other clients anonymous.
- Blue only on the arc, buttons and links. Cyan only on the arc's moving highlight. Navy only on the closing band, which flips to white in dark mode by choice.
- Never push to `main` or deploy without asking.
