/**
 * Separator arrow for a project's arc line.
 *
 * The stroke is 0.0925em, which is Larsseit Regular's stem width measured off
 * the rendered font (37px of stem at a 400px sample). Because everything is in
 * em, the arrow keeps the same weight as the type beside it at any size.
 * Flat caps and mitred joins match the typeface's own terminals.
 *
 * The viewBox is 16 units to the em, so stroke-width 1.48 == 0.0925em.
 */
export function Arrow() {
  return (
    <svg
      viewBox="0 0 12 10"
      width="0.75em"
      height="0.625em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.48}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden
      focusable="false"
      className="inline-block shrink-0"
      style={{ verticalAlign: "0.04em" }}
    >
      <path d="M0.75 5h9.1" />
      <path d="M6.6 1.75 9.85 5 6.6 8.25" />
    </svg>
  );
}
