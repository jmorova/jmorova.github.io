"use client";

import { useState } from "react";
import type { Diagram } from "@/lib/types";

const CX = 430;
const CY = 290;
const DEVICE_RING = { rx: 152, ry: 96 };
const SERVICE_RING = { rx: 262, ry: 162 };
const CYCLE_RING = { rx: 338, ry: 224 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const point = (deg: number, r: { rx: number; ry: number }) => ({
  x: CX + r.rx * Math.cos(rad(deg)),
  y: CY + r.ry * Math.sin(rad(deg)),
});

/** Labels are centred in a filled block, so an estimate is close enough. */
const blockWidth = (text: string) => text.length * 6.9 + 24;

/** An arc along the lifecycle ring, inset at both ends to clear the stages. */
const arcPath = (from: number, to: number) => {
  const a = point(from, CYCLE_RING);
  const b = point(to, CYCLE_RING);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${CYCLE_RING.rx} ${CYCLE_RING.ry} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

/**
 * Larsseit, measured off the rendered font: cap height 0.70em, x-height
 * 0.504em. SVG's `dominant-baseline: middle` centres the X-HEIGHT, so text
 * lands ~0.098em low and reads as sitting below centre. Centring the cap
 * height is what looks right, so every label uses the alphabetic baseline
 * with the offset below instead.
 */
const CAP = 0.7;
const FONT = 13;
const baselineAt = (centreY: number, size: number = FONT) =>
  centreY + (CAP * size) / 2;

/** Line spacing for the centre label, in px. */
const LINE = 15;

export function EcosystemDiagram({ diagram }: { diagram: Diagram }) {
  const [active, setActive] = useState<number | null>(null);
  const centreLines = diagram.centre.split(" ");

  // Stages sit at the cardinal points; everything else is spread evenly.
  const stageAngle = (i: number) => -90 + i * 90;
  const devices = diagram.devices.map((label, i) => ({
    label,
    ...point(-90 + (360 / diagram.devices.length) * i, DEVICE_RING),
  }));
  const services = diagram.services.map((label, i) => {
    const deg = -90 + (360 / diagram.services.length) * i;
    const p = point(deg, SERVICE_RING);
    const cos = Math.cos(rad(deg));
    return {
      label,
      ...p,
      anchor: Math.abs(cos) < 0.25 ? "middle" : cos > 0 ? "start" : "end",
    } as const;
  });

  return (
    <figure className="m-0">
      <figcaption className="text-xs leading-[18px] text-text-3">
        {diagram.title}
      </figcaption>

      {/* The diagram is decorative to a screen reader; this is the content. */}
      <p className="sr-only">
        {diagram.centre} sits at the centre, surrounded by{" "}
        {diagram.devices.join(", ")}; around those,{" "}
        {diagram.services.join(", ")}. The lifecycle runs{" "}
        {diagram.lifecycle.join(", then ")}, and back to the start.
      </p>

      <svg
        viewBox="0 0 860 580"
        className="mt-3 w-full"
        aria-hidden
        focusable="false"
      >
        <defs>
          <marker
            id="eco-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 10 5 0 10Z" fill="context-stroke" />
          </marker>
        </defs>

        <ellipse
          cx={CX}
          cy={CY}
          rx={SERVICE_RING.rx + 34}
          ry={SERVICE_RING.ry + 24}
          fill="none"
          stroke="var(--line)"
        />
        <ellipse
          cx={CX}
          cy={CY}
          rx={DEVICE_RING.rx + 28}
          ry={DEVICE_RING.ry + 22}
          fill="var(--surface)"
          stroke="var(--line)"
        />

        {/* Lifecycle arcs. The one arriving at the hovered stage strengthens. */}
        {diagram.lifecycle.map((_, i) => {
          const from = stageAngle(i) + 13;
          const to = stageAngle(i + 1) - 13;
          const incomingTo = (i + 1) % diagram.lifecycle.length;
          const lit = active === null || active === incomingTo;
          return (
            <path
              key={`arc-${i}`}
              d={arcPath(from, to)}
              fill="none"
              stroke={lit ? "var(--accent)" : "var(--line)"}
              strokeWidth={active === incomingTo ? 2 : 1.25}
              markerEnd="url(#eco-arrow)"
              className="transition-[stroke,stroke-width] duration-200 motion-reduce:transition-none"
            />
          );
        })}

        {services.map((s) => (
          <text
            key={s.label}
            x={s.x}
            y={baselineAt(s.y)}
            textAnchor={s.anchor}
            fontSize={FONT}
            fill="var(--text-2)"
          >
            {s.label}
          </text>
        ))}

        {devices.map((d) => {
          const w = blockWidth(d.label);
          return (
            <g key={d.label} className="group">
              <rect
                x={d.x - w / 2}
                y={d.y - 13}
                width={w}
                height={26}
                fill="var(--text)"
                className="transition-colors duration-200 group-hover:fill-accent motion-reduce:transition-none"
              />
              <text
                x={d.x}
                y={baselineAt(d.y)}
                textAnchor="middle"
                fontSize={FONT}
                fontWeight="700"
                fill="var(--bg)"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        <g>
          <ellipse cx={CX} cy={CY} rx={66} ry={40} fill="var(--text)" />
          {/*
            One <text> with tspans rather than hand-placed lines: the first line
            lifts by half the block's height, so the label stays centred on the
            ellipse whatever it says and however many lines it takes.
          */}
          <text
            x={CX}
            y={CY - ((centreLines.length - 1) * LINE) / 2 + (CAP * FONT) / 2}
            textAnchor="middle"
            fontSize={FONT}
            fontWeight="700"
            fill="var(--bg)"
          >
            {centreLines.map((line, i) => (
              <tspan key={line} x={CX} dy={i === 0 ? 0 : LINE}>
                {line}
              </tspan>
            ))}
          </text>
        </g>

        {diagram.lifecycle.map((label, i) => {
          const p = point(stageAngle(i), CYCLE_RING);
          const w = blockWidth(label);
          const dim = active !== null && active !== i;
          return (
            <g
              key={label}
              tabIndex={0}
              role="button"
              aria-label={`Lifecycle stage: ${label}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="cursor-default transition-opacity duration-200 motion-reduce:transition-none"
              opacity={dim ? 0.4 : 1}
            >
              <rect
                x={p.x - w / 2}
                y={p.y - 14}
                width={w}
                height={28}
                fill="var(--accent)"
              />
              <text
                x={p.x}
                y={baselineAt(p.y)}
                textAnchor="middle"
                fontSize={FONT}
                fontWeight="700"
                fill="var(--bg)"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
