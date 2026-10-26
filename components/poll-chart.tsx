"use client";

import { useEffect, useRef, useState } from "react";
import { SPRING } from "@/lib/motion";
import type { Chart } from "@/lib/types";

/**
 * A real bar chart rather than a flat image of one — crisp at any size, legible
 * in a screen reader, and editable in content/projects.ts.
 *
 * One measure across five categories, so there is no categorical palette and no
 * legend: the accent marks the two findings that carry the argument, and every
 * bar is directly labelled, so colour is never the only thing saying what a row
 * is. Emphasis is doubled up in text weight so it survives without colour.
 */
export function PollChart({ chart }: { chart: Chart }) {
  const figureRef = useRef<HTMLElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);

  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  /** Last hovered row. Kept when `active` clears so the line fades in place. */
  const [position, setPosition] = useState(0);
  /** Track geometry relative to the plot box, for the hover guideline. */
  const [track, setTrack] = useState<{ left: number; width: number } | null>(null);

  // Bars grow once the chart is actually on screen — it lives inside a closed
  // accordion, so mount is the wrong moment.
  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /**
   * The guideline is positioned in pixels off a measured track. Placing it in
   * the grid instead doesn't work: `grid-row: 1 / -1` only spans the *explicit*
   * grid, and these rows are implicit, so it collapsed to a single row.
   * ResizeObserver fires once on observe, so there's no initial measure call.
   */
  useEffect(() => {
    const plot = plotRef.current;
    const first = trackRef.current;
    if (!plot || !first) return;
    const ro = new ResizeObserver(() => {
      const p = plot.getBoundingClientRect();
      const t = first.getBoundingClientRect();
      setTrack({ left: t.left - p.left, width: t.width });
    });
    ro.observe(plot);
    return () => ro.disconnect();
  }, []);

  const max = Math.max(...chart.rows.map((r) => r.value));
  const pct = (v: number) => (v / max) * 100;

  return (
    <figure ref={figureRef} className="m-0">
      <figcaption className="text-xs leading-[18px] text-text-3">
        {chart.question}
        {chart.note ? <span className="block">{chart.note}</span> : null}
      </figcaption>

      <div ref={plotRef} className="relative mt-4">
        {/*
          One grid for the whole list, with each row as a subgrid. Per-row grids
          size their label column to that row's text, which gives every bar a
          different track width — the bars then aren't on a shared scale.
        */}
        {/*
            max-content on the label column, so no label wraps. With labels of
            mixed length a fractional column breaks the long ones onto a second
            line, which makes those rows taller and costs the bars their even
            rhythm — the group stops reading as one set.
          */}
          <ul className="grid grid-cols-[1fr_auto] gap-y-2.5 sm:grid-cols-[max-content_minmax(0,1fr)_auto]">
          {chart.rows.map((row, i) => (
            <li
              key={row.label}
              tabIndex={0}
              onMouseEnter={() => {
                setActive(i);
                setPosition(i);
              }}
              onMouseLeave={() => setActive(null)}
              onFocus={() => {
                setActive(i);
                setPosition(i);
              }}
              onBlur={() => setActive(null)}
              className="group col-span-full grid grid-cols-subgrid items-center gap-x-3 gap-y-1"
            >
              <span
                className={`text-xs leading-[18px] sm:text-right ${
                  row.emphasis ? "font-bold text-text" : "text-text-2"
                }`}
              >
                {row.label}
              </span>

              {/* Decorative: the value beside it is the accessible answer. */}
              <span
                ref={i === 0 ? trackRef : undefined}
                aria-hidden
                className="col-span-2 h-3.5 w-full sm:col-span-1"
              >
                <span
                  className={`block h-full transition-[width,opacity] motion-reduce:transition-none ${
                    row.emphasis
                      ? "bg-accent"
                      : "bg-chart-muted opacity-80 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                  style={{
                    width: shown ? `${pct(row.value)}%` : "0%",
                    transitionDuration: "640ms",
                    transitionTimingFunction: SPRING,
                    transitionDelay: `${i * 55}ms`,
                  }}
                />
              </span>

              <span
                className={`text-xs leading-[18px] tabular-nums ${
                  row.emphasis ? "font-bold text-accent" : "text-text-2"
                }`}
              >
                {row.value}%
              </span>
            </li>
          ))}
        </ul>

        {/*
          Guideline at the hovered bar's end, running the full height of the
          plot so you can read at a glance which other bars clear it.
        */}
        {track ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 hidden border-l border-dotted border-text-2 transition-opacity motion-reduce:transition-none sm:block"
            style={{
              left: track.left + (pct(chart.rows[position].value) / 100) * track.width,
              opacity: active === null ? 0 : 1,
              transitionDuration: "180ms",
              transitionTimingFunction: SPRING,
            }}
          />
        ) : null}
      </div>
    </figure>
  );
}
