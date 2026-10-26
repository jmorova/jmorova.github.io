"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AccordionValue = {
  openSlug: string | null;
  toggle: (slug: string) => void;
  open: (slug: string) => void;
};

const AccordionContext = createContext<AccordionValue | null>(null);

export function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used inside <Accordion>");
  return ctx;
}

/**
 * Holds which section is open. Exclusivity lives here rather than in
 * <details name="…"> because the browser's version closes the outgoing panel
 * instantly, which would cut its closing animation off at the knees.
 */
export function Accordion({
  defaultOpen = null,
  children,
}: {
  defaultOpen?: string | null;
  children: ReactNode;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(defaultOpen);

  const toggle = useCallback(
    (slug: string) => setOpenSlug((cur) => (cur === slug ? null : slug)),
    [],
  );
  const open = useCallback((slug: string) => setOpenSlug(slug), []);

  const value = useMemo(
    () => ({ openSlug, toggle, open }),
    [openSlug, toggle, open],
  );

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
}
