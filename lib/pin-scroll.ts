/**
 * Hold an element at a fixed distance from the top of the viewport while the
 * page reflows around it.
 *
 * Opening a section collapses whichever one was open, and if that section sat
 * above the target the whole page shifts up by its height. A single scroll call
 * is computed against the pre-animation layout, so it lands in the wrong place.
 * Re-asserting each frame for the length of the animation keeps the heading put
 * no matter how much moves above it.
 *
 * Any deliberate scroll from the user cancels it immediately — nothing is worse
 * than a page that fights you.
 */
export function pinToViewportTop(
  element: HTMLElement,
  viewportTop: number,
  duration = 900,
) {
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };

  const events = ["wheel", "touchstart", "keydown"] as const;
  events.forEach((e) =>
    window.addEventListener(e, cancel, { passive: true, once: true }),
  );
  const release = () =>
    events.forEach((e) => window.removeEventListener(e, cancel));

  const started = performance.now();

  const step = () => {
    if (cancelled) return release();
    const drift = element.getBoundingClientRect().top - viewportTop;
    if (Math.abs(drift) > 0.5) {
      window.scrollBy({ top: drift, behavior: "auto" });
    }
    if (performance.now() - started < duration) requestAnimationFrame(step);
    else release();
  };

  requestAnimationFrame(step);
}
