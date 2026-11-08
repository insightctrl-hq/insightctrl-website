// Each product's tagline is its own headline, taken from the product. Descriptions
// speak to the primary user's pain, written from each product's brief. Both products
// are in testing (Nov 2026).
// Screenshots are cropped, with workspace, account and supplier names blurred.
export const PRODUCTS = [
  {
    name: 'KoboCTRL Business',
    tagline: 'Know where every naira went.',
    // from the brief: the owner can't trust money staff handle while they are away.
    // Don't promise it catches unrecorded cash sales; it can't.
    description:
      "You can't be at the shop all day, and the money keeps moving when you're gone. Your staff record what comes in and goes out under their own PIN. You approve what they spend, and no one can change an entry after it's saved.",
    image: '/products/koboctrl.png',
    alt: 'KoboCTRL dashboard showing money left this month, cash at hand, money in and out, and what is owed',
    width: 1897,
    height: 682,
  },
  {
    name: 'Scaffold',
    tagline: 'Run your community in one place.',
    // from the handoff: welcomes, birthdays, approvals and orders are what slip
    description:
      'When you look after a community, the small things slip: a new member no one welcomed, a birthday everyone missed. Scaffold keeps your members, posts and store orders in one place, and every morning it shows your team who to welcome and what is waiting.',
    image: '/products/scaffold.png',
    alt: 'Scaffold Today view showing member counts, a print run ready to send, and posts waiting',
    width: 1896,
    height: 532,
  },
]
