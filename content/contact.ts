import type { ContactLink } from "@/lib/types";

/**
 * TODO(juliana): confirm the LinkedIn URL.
 * Her deck prints linkedin.com/in/juliana-morozowski, but that path returns
 * LinkedIn's bot-block response, so it could not be confirmed. /in/jmorova is
 * verified working and is the one her old site used, so it is the one here.
 */
export const contact: ContactLink[] = [
  { label: "Email", href: "mailto:j.morova@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmorova/" },
  { label: "Dribbble", href: "https://dribbble.com/julianapro" },
];
