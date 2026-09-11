export const DIAGNOSTIC_STAGES = [
  {
    id: 'clarity',
    name: 'Clarity',
    question: 'Does your business actually know what it is, and can it prove it is working?',
    symptoms: [
      'Not sure if the business is profitable this month.',
      'No consistent operating rhythm. Each week is improvised.',
      'No one can explain clearly what the business does and for whom.',
    ],
    questions: [
      {
        text: 'Do you know, without checking, how much money your business spent last month?',
        options: [
          { label: 'Yes, to the exact figure', score: 4 },
          { label: 'Roughly, within a range', score: 3 },
          { label: 'I would have to dig for it', score: 2 },
          { label: 'I have no idea', score: 1 },
        ],
      },
      {
        text: 'Are your personal and business finances completely separate?',
        options: [
          { label: 'Yes, completely', score: 4 },
          { label: 'Mostly, with minor overlap', score: 3 },
          { label: 'Partially, with some mixing', score: 2 },
          { label: 'No, they run together', score: 1 },
        ],
      },
      {
        text: 'Does your business operate on a consistent weekly rhythm, with fixed review times, defined cycles, and predictable patterns?',
        options: [
          { label: 'Yes, a clear weekly rhythm', score: 4 },
          { label: 'Somewhat, but it breaks down often', score: 3 },
          { label: 'We try but it rarely holds', score: 2 },
          { label: 'No, each week is improvised', score: 1 },
        ],
      },
      {
        text: 'Can you state, in one sentence, what your business does and who it serves?',
        options: [
          { label: 'Yes, clearly and consistently', score: 4 },
          { label: 'Mostly, but it gets complicated', score: 3 },
          { label: 'It shifts depending on who is asking', score: 2 },
          { label: 'Not really. It is still evolving.', score: 1 },
        ],
      },
      {
        text: 'Do you know whether your business was profitable last month?',
        options: [
          { label: 'Yes, I have the exact numbers', score: 4 },
          { label: 'I think so, but I am not certain', score: 3 },
          { label: 'I am not sure', score: 2 },
          { label: 'I do not track this', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your clarity foundation is solid. The data is visible, the rhythm is set, and the business knows what it is. Consider running the Architecture diagnostic next. The most common failure point after clarity is role definition.',
      Partial:
        'You have some foundation but critical gaps are creating blind spots. Root cause: inconsistent financial separation and an unstable operating rhythm mean decisions are being made on incomplete information. Fixable in weeks.',
      Critical:
        'Your business has no clarity layer. Every decision downstream is made without a reliable foundation. Root cause: mixed finances, no operating rhythm, no financial visibility. This is the structural priority before anything else.',
    },
  },
  {
    id: 'architecture',
    name: 'Architecture',
    question: 'Does your business run when you are not in the room?',
    symptoms: [
      'Everything stops when you step away.',
      'Your team returns to you for decisions already made.',
      'Nothing documented. The process lives in your head.',
    ],
    questions: [
      {
        text: 'If you were unavailable for two weeks, would your business continue without significant problems?',
        options: [
          { label: 'Yes, it would run smoothly', score: 4 },
          { label: 'Mostly, with minor issues', score: 3 },
          { label: 'It would slow significantly', score: 2 },
          { label: 'It would effectively stop', score: 1 },
        ],
      },
      {
        text: 'Does every person on your team have a written role with defined responsibilities?',
        options: [
          { label: 'Yes, all roles are documented', score: 4 },
          { label: 'Most roles are clear, some are not', score: 3 },
          { label: 'Roles exist informally but are not written', score: 2 },
          { label: 'No, roles are undefined', score: 1 },
        ],
      },
      {
        text: 'Are your core delivery processes documented clearly enough for a new hire to follow?',
        options: [
          { label: 'Yes, fully documented', score: 4 },
          { label: 'Partially documented', score: 3 },
          { label: 'Informally understood, not written', score: 2 },
          { label: 'No documentation exists', score: 1 },
        ],
      },
      {
        text: 'Is it clear, without asking you, who makes which decisions in your business?',
        options: [
          { label: 'Yes, authority is clearly defined', score: 4 },
          { label: 'Mostly clear for major decisions', score: 3 },
          { label: 'Unclear in many situations', score: 2 },
          { label: 'All decisions come back to me', score: 1 },
        ],
      },
      {
        text: 'Do your front-of-house and back-of-house operations run as separate, non-overlapping functions?',
        options: [
          { label: 'Yes, clearly separated', score: 4 },
          { label: 'Mostly, with some overlap', score: 3 },
          { label: 'Significant overlap and confusion', score: 2 },
          { label: 'No separation exists', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your architecture layer is functioning. Roles are defined, processes exist, and the business has independence from your presence. Consider running the Signature diagnostic to check whether your core product is as clear as your structure.',
      Partial:
        'Your structure has gaps that are costing you. Root cause: undefined roles and undocumented processes mean your team defaults to you for every non-routine decision. The business is running on your presence, not on its own systems.',
      Critical:
        'Your business has no architectural layer. Root cause: no role definitions, no documented processes, no functional separation mean the business is entirely dependent on your daily involvement. This is the most common cause of founder exhaustion.',
    },
  },
  {
    id: 'signature',
    name: 'Signature',
    question: 'Do you know the one thing your business does best, and is it actually profitable?',
    symptoms: [
      'Too many offerings. Revenue is spread thin.',
      'Customers struggle to describe what you do.',
      'Busy constantly but cannot identify where profit comes from.',
    ],
    questions: [
      {
        text: 'Can you name, without hesitation, the single product or service that generates the most profit?',
        options: [
          { label: 'Yes, clearly', score: 4 },
          { label: 'I think so, but I have not confirmed the margins', score: 3 },
          { label: 'I have a sense but it is not verified', score: 2 },
          { label: 'No, revenue is spread across too many things', score: 1 },
        ],
      },
      {
        text: 'Have you removed offerings that drain time without generating proportionate return?',
        options: [
          { label: 'Yes, stripped back significantly', score: 4 },
          { label: 'Reduced some things', score: 3 },
          { label: 'We know what to cut but have not acted', score: 2 },
          { label: 'No, we still offer everything', score: 1 },
        ],
      },
      {
        text: 'Can a new customer understand what you sell and why they should choose you within 60 seconds?',
        options: [
          { label: 'Yes, consistently', score: 4 },
          { label: 'Usually, with some explanation', score: 3 },
          { label: 'It takes significant explanation', score: 2 },
          { label: 'No, it depends on the conversation', score: 1 },
        ],
      },
      {
        text: 'Is your core offer delivered the same way every time, with a consistent and repeatable process?',
        options: [
          { label: 'Yes, fully standardised', score: 4 },
          { label: 'Mostly consistent, with variations', score: 3 },
          { label: 'Each delivery is different', score: 2 },
          { label: 'No repeatable process exists', score: 1 },
        ],
      },
      {
        text: 'Is your pricing based on the value you deliver, not just on what competitors charge?',
        options: [
          { label: 'Yes, value-based', score: 4 },
          { label: 'Partially. Some value logic, some market comparison.', score: 3 },
          { label: 'Mostly market comparison', score: 2 },
          { label: 'I am not sure how my pricing was decided', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your signature is clear. You know what you sell, it is profitable, and it is repeatable. Consider running the Control diagnostic to confirm you have the measurement systems to protect that performance.',
      Partial:
        'Your core offer is identifiable but not locked. Root cause: offer complexity and unverified margins mean you are doing more work than necessary for unclear return. One repeatable, high-margin offer changes the business immediately.',
      Critical:
        'You are building on shifting ground. Root cause: no clear core offer means every delivery is a custom job, margins are unknown, and nothing is scalable. This is the offer clarity emergency.',
    },
  },
  {
    id: 'control',
    name: 'Control',
    question: 'Do you have proof that your business is working, or are you running on instinct?',
    symptoms: [
      'Decisions made by feel. No numbers to check weekly.',
      'Problems only visible when they are already a crisis.',
      'No dashboard, scorecard, or tracking system.',
    ],
    questions: [
      {
        text: 'Do you have at least three numbers you check every week to know if the business is performing?',
        options: [
          { label: 'Yes, a clear set of metrics reviewed weekly', score: 4 },
          { label: 'Some things checked, but inconsistently', score: 3 },
          { label: 'Financials reviewed monthly at best', score: 2 },
          { label: 'No regular metrics review', score: 1 },
        ],
      },
      {
        text: 'Are decisions in your business made from data or from instinct?',
        options: [
          { label: 'Always from data', score: 4 },
          { label: 'Mostly data, with some instinct', score: 3 },
          { label: 'Mostly instinct, with occasional data', score: 2 },
          { label: 'Almost entirely instinct', score: 1 },
        ],
      },
      {
        text: 'Do you have a dashboard, scorecard, or tracking system? Even a basic one counts.',
        options: [
          { label: 'Yes, a clear system in regular use', score: 4 },
          { label: 'Something exists but is rarely used', score: 3 },
          { label: 'Tried but it never stuck', score: 2 },
          { label: 'Nothing exists', score: 1 },
        ],
      },
      {
        text: 'Can you identify, within 24 hours, if something in your business starts to go wrong?',
        options: [
          { label: 'Yes, the system flags it quickly', score: 4 },
          { label: 'Usually, but sometimes we find out late', score: 3 },
          { label: 'Typically find out when it is already a problem', score: 2 },
          { label: 'Only find out when it becomes a crisis', score: 1 },
        ],
      },
      {
        text: 'Do you review financial performance at least monthly with a structured summary?',
        options: [
          { label: 'Yes, every month', score: 4 },
          { label: 'Most months', score: 3 },
          { label: 'Occasionally', score: 2 },
          { label: 'Rarely or never', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your governance layer is functioning. Data is visible and decisions are grounded in numbers. Consider running the Movement diagnostic. The next risk at this stage is scaling without the right market infrastructure.',
      Partial:
        'You are making decisions partially blind. Root cause: inconsistent data review and no tracking system mean problems compound before they are caught. Five well-chosen KPIs reviewed weekly changes everything.',
      Critical:
        'You have no control layer. Root cause: without a measurement system, the business cannot be managed. It can only be reacted to. Every decision is a guess and every problem arrives too late.',
    },
  },
  {
    id: 'movement',
    name: 'Movement',
    question: 'Are you growing by design, or just spending like you are?',
    symptoms: [
      'Sales unpredictable. Good month, bad month, no pattern.',
      'Marketing is active but not converting.',
      'Cannot confidently take on more customers today.',
    ],
    questions: [
      {
        text: 'Is your internal operation stable enough to handle a 30% increase in customers today without breaking?',
        options: [
          { label: 'Yes, we have the capacity', score: 4 },
          { label: 'Mostly, with some strain', score: 3 },
          { label: 'It would cause significant problems', score: 2 },
          { label: 'No, it would break immediately', score: 1 },
        ],
      },
      {
        text: 'Do you have a defined, repeatable process for acquiring new customers?',
        options: [
          { label: 'Yes, clear and consistent', score: 4 },
          { label: 'Mostly, with some inconsistency', score: 3 },
          { label: 'Ad hoc and reactive', score: 2 },
          { label: 'No defined process exists', score: 1 },
        ],
      },
      {
        text: 'Are your marketing and sales activities consistent, or reactive to cash flow pressure?',
        options: [
          { label: 'Consistent, running on a plan', score: 4 },
          { label: 'Mostly consistent, occasionally reactive', score: 3 },
          { label: 'Mostly reactive', score: 2 },
          { label: 'Entirely reactive. We market when cash is low.', score: 1 },
        ],
      },
      {
        text: 'Do you know your average cost to acquire a customer and your average customer value?',
        options: [
          { label: 'Yes, both figures are clear', score: 4 },
          { label: 'Rough sense of one or both', score: 3 },
          { label: 'Have not calculated either', score: 2 },
          { label: 'No idea', score: 1 },
        ],
      },
      {
        text: 'Is your business growing because of deliberate action, or because of circumstance?',
        options: [
          { label: 'Deliberate. We know exactly what is driving growth.', score: 4 },
          { label: 'Mostly deliberate, with some luck', score: 3 },
          { label: 'Mostly circumstance', score: 2 },
          { label: 'Not sure why we grow when we do', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your movement layer is functioning. You have a repeatable acquisition process and the capacity to grow. Consider running the People diagnostic. Growth creates people pressure faster than most founders expect.',
      Partial:
        'You are marketing before you are ready. Root cause: an unstable internal operation combined with inconsistent acquisition means more customers create more chaos. Fix the internal machine before pushing harder on outbound.',
      Critical:
        'Growth at this stage would break your business. Root cause: no repeatable acquisition process, unknown customer economics, an operation that cannot handle increased volume. Build internal stability first.',
    },
  },
  {
    id: 'people',
    name: 'People',
    question: 'Can your team carry the business without you carrying them?',
    symptoms: [
      'You are doing work your team should be doing.',
      'New hires take too long to become useful.',
      'No one takes initiative without being directed.',
    ],
    questions: [
      {
        text: 'Did you hire your current team into defined systems and roles, or did they arrive before systems existed?',
        options: [
          { label: 'Into fully defined systems', score: 4 },
          { label: 'Into mostly defined systems', score: 3 },
          { label: 'Systems were partly there', score: 2 },
          { label: 'They arrived before any systems existed', score: 1 },
        ],
      },
      {
        text: 'Do you have at least one person who can make decisions and act without your involvement?',
        options: [
          { label: 'Yes, multiple people', score: 4 },
          { label: 'One person, in limited situations', score: 3 },
          { label: 'Rarely, in very minor situations', score: 2 },
          { label: 'No, all decisions come to me', score: 1 },
        ],
      },
      {
        text: "Is your team's performance measured against clear, written standards?",
        options: [
          { label: 'Yes, everyone has defined standards', score: 4 },
          { label: 'Most people do', score: 3 },
          { label: 'Standards exist informally', score: 2 },
          { label: 'No performance standards exist', score: 1 },
        ],
      },
      {
        text: 'Can you onboard a new team member without your direct, sustained involvement?',
        options: [
          { label: 'Yes, we have a process that runs without me', score: 4 },
          { label: 'Mostly, with some of my input', score: 3 },
          { label: 'Requires significant time from me', score: 2 },
          { label: 'I have to do it myself every time', score: 1 },
        ],
      },
      {
        text: 'Does your team understand the culture, standards, and non-negotiables of the business without being told repeatedly?',
        options: [
          { label: 'Yes, it is understood and lived', score: 4 },
          { label: 'Mostly', score: 3 },
          { label: 'Requires regular reminding', score: 2 },
          { label: 'Has not been defined', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'Your people layer is functioning. Your team can carry the business and operate with defined standards. Consider running the Autonomy diagnostic. You may be closer to operational independence than you think.',
      Partial:
        'Your team is working hard but working blind. Root cause: people hired before systems existed cannot perform to standards that were never defined. Define the role, the system, and the standard first.',
      Critical:
        'Your team is entirely dependent on your direction. Root cause: no defined roles, no standards, no systems mean the team can only do what you tell them when you tell them. This is not a people problem. It is an architecture problem.',
    },
  },
  {
    id: 'autonomy',
    name: 'Autonomy',
    question: 'What happens to this business if you disappear tomorrow?',
    symptoms: [
      'The business is you. No real break in years.',
      'Critical knowledge exists only in your head.',
      'Success measured by hours worked, not performance.',
    ],
    questions: [
      {
        text: 'If you stepped back completely for three months, would your business sustain or decline?',
        options: [
          { label: 'Sustain. It runs on systems, not on me.', score: 4 },
          { label: 'Mostly sustain, with some decline', score: 3 },
          { label: 'Decline significantly', score: 2 },
          { label: 'It would effectively stop', score: 1 },
        ],
      },
      {
        text: 'Is all critical business knowledge documented: processes, contacts, pricing logic, client history?',
        options: [
          { label: 'Yes, fully documented and accessible', score: 4 },
          { label: 'Mostly documented', score: 3 },
          { label: 'Some things are documented', score: 2 },
          { label: 'Lives almost entirely in my head', score: 1 },
        ],
      },
      {
        text: 'Do you have a management layer between you and daily operations?',
        options: [
          { label: 'Yes, managers own their departments', score: 4 },
          { label: 'One layer exists but is thin', score: 3 },
          { label: 'Partial layer that still relies on me', score: 2 },
          { label: 'No management layer exists', score: 1 },
        ],
      },
      {
        text: 'Can your business attract customers, serve them, and collect payment without your direct involvement?',
        options: [
          { label: 'Yes, all three happen without me', score: 4 },
          { label: 'Two of the three', score: 3 },
          { label: 'One of the three', score: 2 },
          { label: 'None happen without me', score: 1 },
        ],
      },
      {
        text: 'How do you measure your own success as a founder?',
        options: [
          { label: 'By business performance metrics, not my hours', score: 4 },
          { label: 'More by performance than hours, but both matter', score: 3 },
          { label: 'Roughly equal between the two', score: 2 },
          { label: 'By how hard I am working and how many hours I put in', score: 1 },
        ],
      },
    ],
    results: {
      Strong:
        'You have built a business, not a job. The systems run, knowledge is documented, the operation does not require your constant presence. The work now is governance. Stay at the strategic level while the system sustains itself.',
      Partial:
        'You are close but not there. Root cause: critical knowledge is still undocumented, the management layer is thin, and one or more core functions still depend on your direct involvement. The gap is smaller than it feels.',
      Critical:
        'You are the business. Root cause: no management layer, undocumented knowledge, and a self-measurement system based on effort rather than output. This is not a failure. It is a starting point. The full Chaos to CTRL build sequence is the path from here.',
    },
  },
]

export function scoreToBand(score) {
  if (score >= 14) return 'Strong'
  if (score >= 9) return 'Partial'
  return 'Critical'
}
