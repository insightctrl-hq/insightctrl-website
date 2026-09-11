import CaseStudyCard from '../components/CaseStudyCard'

const PROJECTS = [
  {
    client: 'Rereandco',
    industry: 'Hospitality',
    status: 'Live',
    engagementType: 'Full Build',
    description:
      'A Port Harcourt hospitality brand rebuilt from operational ground up. Delivered full infrastructure design: hiring architecture, financial controls, product system, and operating rhythm. A business that now runs on structure, not on the founder.',
  },
  {
    client: '8Wings',
    industry: 'Logistics and delivery',
    status: 'Live',
    engagementType: 'Full Build',
    description:
      'A logistics and delivery business built for scale from day one. Designed the complete operational structure and business model: service architecture, delivery systems, pricing logic, and the operational framework to carry it forward.',
  },
]

function Projects() {
  return (
    <div className="container-content">
      <section className="py-20">
        <p className="text-eyebrow">Projects</p>
        <h1 className="mt-5 text-hero">Businesses we have built structure into.</h1>
      </section>

      <section className="section-divider py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <CaseStudyCard key={project.client} {...project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
