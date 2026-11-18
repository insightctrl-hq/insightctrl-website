import ClosingBand from '../components/ClosingBand'
import {
  TALLY_URL,
  PAYSTACK_OPERATING_ROOM_URL,
  PAYSTACK_STARTER_SETUP_URL,
} from '../constants/links'

// Enquiry links open a form tagged with where they came from, so a request arrives
// already sorted. (Add a hidden field named "source" in Tally to see it.)
const intake = (source) => `${TALLY_URL}?source=${source}`

// Copy and prices approved by Chibueze, 8 and 16 Nov 2026. Ordered by price.
// Operating Room and Starter Setup go straight to payment. Foundation Build, Roundtable
// and Full Build start with a conversation, because scope and a signed letter come first.
const ENGAGEMENTS = [
  {
    name: 'Operating Room',
    description:
      'One hour on one specific question or task. You get a written diagnostic report within 24 hours.',
    price: [
      '₦50,000',
      'Extra time is ₦25,000 per 30 minutes.',
      "If the hour isn't useful, tell us at the end and we'll refund you in full.",
    ],
    cta: 'Book the Operating Room',
    href: PAYSTACK_OPERATING_ROOM_URL,
  },
  {
    name: 'Starter Setup',
    description:
      'A costing sheet, a cashbook and an order tracker for a small business, set up with you in one 90-minute session. Includes three months of KoboCTRL Business, then ₦27,000 a quarter.',
    price: ['₦150,000, fixed.'],
    cta: 'Start a Starter Setup',
    href: PAYSTACK_STARTER_SETUP_URL,
  },
  {
    name: 'Operating Room (Roundtable)',
    description:
      'A half day with your leadership team, with the whole business and its operations on the table. You get a written diagnostic summary within 48 hours.',
    price: [
      // a non-breaking space keeps '10' from dropping onto a line of its own
      '₦250,000 for up to 6 people, ₦350,000 for 7 to\u00a010.',
      'Extra time is ₦50,000 per 30 minutes.',
    ],
    cta: 'Book a Roundtable',
    href: intake('operating-room-roundtable'),
  },
  {
    name: 'Foundation Build',
    description:
      'Four weeks on the structure of your business: where the money goes, who owns what, and the one offer that repeats and pays. You get a one-page map of the business, a role sheet for each key person, your five most important procedures written down, a weekly money report you can read in five minutes, and your main offer priced and written as a standard.',
    price: ['₦950,000, fixed.'],
    cta: 'Start a Foundation Build',
    href: intake('foundation-build'),
  },
  {
    name: 'Full Build',
    description:
      'We deliver the strategy and come on board to handle operations and execution for a specific time-bound project.',
    price: ['From ₦1.5M'],
    cta: 'Start a conversation',
    href: intake('full-build'),
  },
]

const external = { target: '_blank', rel: 'noopener noreferrer' }

function EngagementLink({ href, children }) {
  return (
    <a href={href} {...external} className="text-link mt-5 self-start">
      {children}
    </a>
  )
}

function Services() {
  return (
    <>
      <section className="container-content pb-20 pt-16 md:pb-28 md:pt-24">
        <h1 className="max-w-[48rem] text-balance text-hero">
          Start with one hour. Build from there.
        </h1>
        <p className="text-lead mt-6 max-w-[38rem]">
          Every engagement ends with something you can use on Monday morning.
        </p>
      </section>

      <section className="container-content">
        <div className="border-t border-border py-24">
          <h2 className="text-section-headline">Engagements</h2>
          <div className="mt-14 grid gap-x-16 gap-y-16 md:grid-cols-2">
            {ENGAGEMENTS.map((engagement) => (
              <div key={engagement.name} className="flex max-w-[30rem] flex-col">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.01em]">{engagement.name}</h3>
                <p className="mt-3 text-body">{engagement.description}</p>
                {/* the first line is the price; any line after it is a condition */}
                <div className="mt-5 space-y-1">
                  {engagement.price.map((line, i) => (
                    <p
                      key={line}
                      className={
                        i === 0
                          ? 'text-[1.0625rem] font-medium text-text-primary'
                          : 'text-[0.9375rem] text-text-muted'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <EngagementLink href={engagement.href}>{engagement.cta}</EngagementLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Products removed from this page on 16 Nov 2026. src/data/products.js
          stays, so the section can return once clients use the tools weekly. */}

      <ClosingBand />
    </>
  )
}

export default Services
