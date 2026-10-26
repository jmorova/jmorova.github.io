import { Fragment } from "react";
import Image from "next/image";
import { Arrow } from "./arrow";
import { PollChart } from "./poll-chart";
import { EcosystemDiagram } from "./ecosystem-diagram";
import type { Project, Span } from "@/lib/types";

/**
 * Tailwind needs literal class names, so spans come from this map rather than
 * being built from the number. One column on a phone, four from md up.
 */
const SPAN: Record<Span, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

const GRID = "grid grid-cols-1 gap-6 md:grid-cols-4";

/**
 * Two paragraph sizes on the whole site and no others: 15px/25px for anything
 * you read (inherited from body, so it carries no size class), and SMALL for
 * labels and notes. Weight and colour carry hierarchy instead of more sizes.
 */
const SMALL = "text-xs leading-[18px]";

/**
 * What an open project section shows: images, numbers and short blocks laid on
 * the four-column grid. Portfolio, not article — the deck does the explaining.
 *
 * Each band is its own grid. Sharing one grid across media and metrics let a
 * tall image push a metric onto the next row.
 */
export function ProjectBody({
  project,
  priority = false,
}: {
  project: Project;
  /** Set on the section that is open on load, so its first image isn't lazy. */
  priority?: boolean;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className={GRID}>
        <div className="flex flex-col gap-3 md:col-span-2">
          <p
            className={`${SMALL} flex flex-wrap items-center gap-x-2 gap-y-1 tracking-wide text-accent uppercase`}
          >
            {project.arc.map((step, i) => (
              <Fragment key={step}>
                {i > 0 ? <Arrow /> : null}
                <span>{step}</span>
              </Fragment>
            ))}
          </p>
          <p className="text-text-2">{project.summary}</p>
        </div>
        {/* Held in the last column so it stays clear of the 2-column measure. */}
        <p className={`${SMALL} text-text-3 md:col-span-1 md:col-start-4`}>
          {project.role}
        </p>
      </div>

      <div className={GRID}>
        {project.media.map((item, i) => (
          <figure
            key={item.src.src}
            className={`self-start overflow-hidden bg-surface ${SPAN[item.span]}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              className="h-auto w-full object-contain"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={priority && i === 0}
            />
          </figure>
        ))}
      </div>

      <div className={GRID}>
        {project.metrics.map((metric) => (
          <div key={metric.label} className="md:col-span-1">
            <div className="text-3xl font-bold tracking-tight text-accent">
              {metric.value}
            </div>
            {/*
              Label and note share a size and a tighter leading; weight and
              colour carry the hierarchy. The inherited 25px leading was built
              for paragraphs and left a two-line label looking gappy.
            */}
            <div className="mt-1 leading-[20px] font-bold">{metric.label}</div>
            {metric.note ? (
              <div className="mt-1 leading-[20px] text-text-3">{metric.note}</div>
            ) : null}
          </div>
        ))}
      </div>

      <div className={GRID}>
        {project.blocks.map((block) => (
          // col-start-1 keeps every block in the reading column rather than
          // letting them flow 2-up into columns 3–4.
          <div key={block.heading} className="md:col-span-2 md:col-start-1">
            <div className="font-bold">{block.heading}</div>
            <p className="mt-1 text-text-2">{block.body}</p>
          </div>
        ))}
      </div>

      {project.diagram ? (
        <div className={GRID}>
          <div className="md:col-span-4 md:col-start-1">
            <EcosystemDiagram diagram={project.diagram} />
          </div>
        </div>
      ) : null}

      {project.chart ? (
        <div className={GRID}>
          {/* Wider than the 2-column text measure: it's a figure, not prose. */}
          <div className="md:col-span-3 md:col-start-1">
            <PollChart chart={project.chart} />
          </div>
        </div>
      ) : null}

      {project.principle ? (
        <div className={GRID}>
          <p className="border-l-[3px] border-accent pl-5 font-bold text-accent md:col-span-2">
            {project.principle}
          </p>
        </div>
      ) : null}
    </div>
  );
}
