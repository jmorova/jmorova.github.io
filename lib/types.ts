import type { StaticImageData } from "next/image";

/** How many of the four content columns something occupies. */
export type Span = 1 | 2 | 3 | 4;

export type Media = {
  src: StaticImageData;
  /** Describe what the image shows, not "screenshot of…". */
  alt: string;
  span: Span;
};

/** A headline number. Kept short — the deck does the explaining. */
export type Metric = {
  value: string;
  label: string;
  note?: string;
};

/** A short titled paragraph inside an open section. Not an article. */
export type Block = {
  heading: string;
  body: string;
};

/** One bar in a poll chart. */
export type ChartRow = {
  label: string;
  /** Percentage, 0–100. */
  value: number;
  /** Pulls the row out in the accent colour — the findings worth noticing. */
  emphasis?: boolean;
};

/** A small bar chart rendered from real numbers rather than a flat image. */
export type Chart = {
  question: string;
  note?: string;
  rows: ChartRow[];
};

/**
 * A concentric service diagram: what sits at the centre, the hardware around
 * it, the services around that, and the lifecycle it all moves through.
 * Laid out from these lists, so editing a label needs no geometry.
 */
export type Diagram = {
  title: string;
  centre: string;
  devices: string[];
  services: string[];
  /** Four stages, clockwise from the top. */
  lifecycle: string[];
};

export type Project = {
  slug: string;
  client: string;
  /** e.g. "2022–25" */
  period: string;
  title: string;
  /**
   * The stages of the project, e.g. ["Interaction", "Industrial design"].
   * One entry per step — the arrows between them are drawn, not typed.
   */
  arc: string[];
  role: string;
  summary: string;
  media: Media[];
  metrics: Metric[];
  blocks: Block[];
  chart?: Chart;
  diagram?: Diagram;
  /** The one line she'd want remembered. */
  principle?: string;
};

export type Experience = {
  /** e.g. "2022 — Today" */
  period: string;
  role: string;
  company: string;
};

export type ContactLink = {
  label: string;
  href: string;
};
