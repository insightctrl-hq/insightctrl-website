import CaseStudyCard from '../components/CaseStudyCard'
import BlueprintGrid from '../components/BlueprintGrid'
import { WORST_PROJECTS, pickFixture, useDataMode } from '../dev/worstCase'
import { PROJECTS } from '../data/projects'


function Projects() {
  const projects = pickFixture(useDataMode(), PROJECTS, WORST_PROJECTS)

  return (
    <div className="container-content">
      <section className="relative overflow-hidden py-14">
        <BlueprintGrid />
        <div className="relative">
          <p className="text-eyebrow">Projects</p>
          <h1 className="mt-5 max-w-[34rem] text-hero">
            Businesses we have built structure into.
          </h1>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section-divider py-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map(({ home: _home, ...project }) => (
              <CaseStudyCard key={project.client} {...project} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Projects
