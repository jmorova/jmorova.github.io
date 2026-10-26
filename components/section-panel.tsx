"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { pinToViewportTop } from "@/lib/pin-scroll";
import { useAccordion } from "./accordion";

/**
 * A damped spring (mass 1, stiffness 190, damping 28) sampled into linear()
 * stops. Damping ratio 1.016, so it settles without overshoot — an accordion
 * that overshoots on height clips its own content on the way past.
 */
const SPRING =
  "linear(0, 0.0577, 0.1807, 0.3214, 0.4558, 0.5737, 0.6718, 0.7508, 0.8128, 0.8606, 0.897, 0.9244, 0.9448, 0.9599, 0.9709, 0.979, 0.9849, 0.9892, 0.9923, 0.9945, 0.9961, 0.9972, 0.998, 0.9986, 0.999)";

/**
 * Tempo for a panel of REFERENCE_PX. Closing is quicker than opening — waiting
 * on an exit you've already decided on just feels slow.
 */
const OPEN_BASE_MS = 600;
const CLOSE_BASE_MS = 340;
const REFERENCE_PX = 1200;
const MIN_MS = 200;
const MAX_MS = 780;

/**
 * Deliberately a button + region rather than <details>/<summary>. Chrome
 * restores a <details> open state from session history after hydration, which
 * silently contradicts React and left the wrong sections open on reload. React
 * owns exclusivity and the animation anyway, so <details> bought us nothing but
 * that race. aria-expanded/aria-controls give the same semantics explicitly.
 */
export function SectionPanel({
  slug,
  title,
  meta,
  children,
}: {
  slug: string;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  const { openSlug, toggle } = useAccordion();
  const isOpen = openSlug === slug;

  const panelRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const mounted = useRef(false);

  // Captured once so the server and the first client paint agree.
  const [initialOpen] = useState(isOpen);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!mounted.current) {
      mounted.current = true;
      panel.style.height = isOpen ? "" : "0px";
      return;
    }

    // Continuity: whatever height is on screen this instant is the start.
    const from = panel.getBoundingClientRect().height;
    // Interruptibility: drop the in-flight animation and carry on from here.
    animRef.current?.cancel();
    animRef.current = null;

    panel.style.height = "";
    const to = isOpen ? panel.scrollHeight : 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || from === to) {
      panel.style.height = isOpen ? "" : "0px";
      return;
    }

    // Duration follows distance rather than a fixed tempo: a 2500px section
    // opening in the same time as a 450px one would have to travel five times
    // faster. Square root, not linear — perceived speed doesn't scale linearly,
    // and linear would make the long sections crawl.
    //
    // This covers momentum too: a reversal mid-flight has less ground left, so
    // it finishes sooner without any separate rule.
    const distance = Math.abs(to - from);
    const base = isOpen ? OPEN_BASE_MS : CLOSE_BASE_MS;
    const duration = Math.min(
      MAX_MS,
      Math.max(MIN_MS, base * Math.sqrt(distance / REFERENCE_PX)),
    );

    panel.style.height = `${from}px`;
    const anim = panel.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      { duration, easing: SPRING, fill: "both" },
    );
    animRef.current = anim;

    anim.finished
      .then(() => {
        if (animRef.current !== anim) return; // superseded by a newer gesture
        anim.cancel();
        panel.style.height = isOpen ? "" : "0px";
        animRef.current = null;
      })
      .catch(() => {
        /* cancelled by an interrupting toggle — that one owns the cleanup */
      });
  }, [isOpen]);

  return (
    <section id={`section-${slug}`} className="scroll-mt-6 border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`panel-${slug}`}
          onClick={(event) => {
            // Keep this header under the cursor — collapsing a section above
            // would otherwise yank it up the page mid-click.
            const header = event.currentTarget;
            const was = header.getBoundingClientRect().top;
            toggle(slug);
            pinToViewportTop(header, was);
          }}
          className="group flex w-full items-baseline gap-4 py-5 text-left"
        >
          <span className="flex-1 text-lg leading-snug font-bold transition-colors group-hover:text-accent md:text-2xl">
            {title}
          </span>
          {meta ? (
            <span className="hidden shrink-0 text-xs leading-[18px] whitespace-nowrap text-text-3 sm:inline">
              {meta}
            </span>
          ) : null}
          <span aria-hidden className="w-4 shrink-0 text-center text-lg text-accent">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={`panel-${slug}`}
        ref={panelRef}
        inert={!isOpen}
        className="overflow-hidden"
        style={initialOpen ? undefined : { height: 0 }}
      >
        <div className="pb-10">{children}</div>
      </div>
    </section>
  );
}
