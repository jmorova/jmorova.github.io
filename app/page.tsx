import { Accordion } from "@/components/accordion";
import { RailNav } from "@/components/rail-nav";
import { SectionPanel } from "@/components/section-panel";
import { ProjectBody } from "@/components/project-body";
import { ExperienceRow } from "@/components/experience-row";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experiences";
import { expertise } from "@/content/expertise";
import { approach, approachHeading } from "@/content/approach";
import { contact } from "@/content/contact";

/**
 * Two paragraph sizes site-wide: 15px/25px inherited from body for anything you
 * read, and SMALL for labels and notes. Nothing else.
 */
const SMALL = "text-xs leading-[18px]";

export default function Home() {
  const navGroups = [
    projects.map((p) => ({ slug: p.slug, label: p.client, panel: true })),
    [
      { slug: "about", label: "About", panel: true },
      { slug: "experience", label: "Experience", panel: true },
      // The contact footer is always open, so this only scrolls.
      { slug: "contact", label: "Contact" },
    ],
  ];

  return (
    <Accordion defaultOpen={projects[0].slug}>
    {/* 1254 = the 200px rail + a 1054px content area (15% narrower than 1240). */}
    <div className="mx-auto flex max-w-[1254px] flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col gap-8 px-6 pt-12 md:sticky md:top-0 md:h-screen md:w-[var(--rail)] md:self-start md:py-12 md:pr-0 md:pl-12">
        <h1 className="text-sm leading-[1.25] font-bold tracking-[0.04em] uppercase">
          {profile.wordmark.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <RailNav groups={navGroups} />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-10 px-6 py-12 md:px-12">
        {/* Extra bottom margin so the intro has room before the first section. */}
        <header className="mb-12 grid grid-cols-1 gap-6 md:mb-28 md:grid-cols-4">
          <div className="flex flex-col gap-3 md:col-span-3">
            <p className={`${SMALL} tracking-[0.06em] text-text-3 uppercase`}>
              {profile.kicker}
            </p>
            <h2 className="text-3xl leading-[1.06] font-bold tracking-tight md:text-[42px]">
              {profile.role}
            </h2>
            <p className="text-lg text-accent md:text-xl">{profile.tagline}</p>
          </div>
          {/* Its own grid child so the measure is 2 columns, like every other paragraph. */}
          <p className="text-text-2 md:col-span-2 md:col-start-1">
            {profile.intro[0]}
          </p>
        </header>

        <div className="flex flex-col border-t border-line">
          {projects.map((project, i) => (
            <SectionPanel
              key={project.slug}
              slug={project.slug}
              title={project.title}
              meta={`${project.client} · ${project.period}`}
            >
              <ProjectBody project={project} priority={i === 0} />
            </SectionPanel>
          ))}

          <SectionPanel slug="about" title="About">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="flex flex-col gap-3 md:col-span-2">
                {profile.intro.slice(1).map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-text-2">
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* Margin column: what she does, and where she's done it. */}
              <div className="flex flex-col gap-6 md:col-span-1 md:col-start-4">
                <div>
                  <div className={`${SMALL} tracking-[0.06em] text-text-3 uppercase`}>
                    Expertise
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5 text-text-2">
                    {expertise.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className={`${SMALL} text-text-3`}>
                  {profile.geography}
                  <br />
                  Based in {profile.location}
                </p>
              </div>

              <p className="font-bold md:col-span-2 md:col-start-1">
                {approachHeading}
              </p>
              {approach.map((block) => (
                <div key={block.heading} className="md:col-span-2 md:col-start-1">
                  <div className="font-bold">{block.heading}</div>
                  <p className="mt-1 text-text-2">{block.body}</p>
                </div>
              ))}
            </div>
          </SectionPanel>

          <SectionPanel
            slug="experience"
            title="Experience"
            meta={`${experiences.length} roles · 2008–today`}
          >
            <ul className="md:max-w-[640px]">
              {experiences.map((experience) => (
                <ExperienceRow
                  key={experience.period + experience.company}
                  {...experience}
                />
              ))}
            </ul>
          </SectionPanel>

        </div>

        {/*
         * Contact is a footer, not an accordion. It's the thing a recruiter is
         * looking for, so it should never be behind a click.
         */}
        <footer
          id="section-contact"
          className="grid scroll-mt-6 grid-cols-1 gap-6 pt-6 md:grid-cols-4"
        >
          <div className={`${SMALL} tracking-[0.06em] text-text-3 uppercase md:col-span-1`}>
            Contact
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 md:col-span-2 md:col-start-2">
            {contact.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-text-2 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
    </Accordion>
  );
}
