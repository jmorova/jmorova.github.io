"use client";

import { pinToViewportTop } from "@/lib/pin-scroll";
import { useAccordion } from "./accordion";

type Item = {
  slug: string;
  label: string;
  /** Accordion sections open; the contact footer is only scrolled to. */
  panel?: boolean;
};

/**
 * The rail is the navigation. It drives the same state the sections read, so
 * opening from here animates exactly as clicking a section header does.
 */
export function RailNav({ groups }: { groups: Item[][] }) {
  const { openSlug, open } = useAccordion();

  function go(item: Item) {
    const target = document.getElementById(`section-${item.slug}`);
    if (item.panel) open(item.slug);
    // Pinned rather than scrolled once: the section that closes may be above
    // this one, and a single scrollIntoView would aim at the old layout.
    if (target) pinToViewportTop(target, 24);
  }

  return (
    <>
      {groups.map((group) => (
        <nav
          key={group.map((i) => i.slug).join()}
          className="flex flex-row flex-wrap items-start gap-x-5 gap-y-2 md:flex-col md:gap-2.5"
        >
          {group.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => go(item)}
              aria-current={openSlug === item.slug ? "true" : undefined}
              className={`text-left transition-colors hover:text-accent ${
                openSlug === item.slug ? "font-bold text-accent" : "text-text-2"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      ))}
    </>
  );
}
