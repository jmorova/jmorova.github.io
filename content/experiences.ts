import type { Experience } from "@/lib/types";

/**
 * From Juliana's LinkedIn CV export. Ordered by start date, most recent first —
 * which is why Audaces and Abril sit above Sisson Studio: the Sisson years
 * (2008–2012) were a studio partnership that overlapped the two employed roles.
 *
 * Eleven rows is a lot for a page this quiet. If it wants trimming, the natural
 * cut is everything before Nextt — the pre-2012 visual design work is the least
 * relevant to a product design lead today.
 */
export const experiences: Experience[] = [
  { period: "2022 — Today", role: "Product Design Lead", company: "Yoco" },
  { period: "2021 — 2022", role: "Senior Product Designer", company: "Alva Labs" },
  { period: "2020 — 2021", role: "Staff Product Designer", company: "Nubank" },
  { period: "2019 — 2020", role: "Lead Product Designer", company: "banQi" },
  { period: "2018 — 2019", role: "Senior Product Designer", company: "iFood" },
  { period: "2017 — 2018", role: "Lead UX Designer", company: "Avanade" },
  { period: "2016 — 2017", role: "Lead UX Designer", company: "Sensorama Design" },
  { period: "2012 — 2016", role: "Senior UX/UI Designer", company: "Nextt" },
  { period: "2010 — 2011", role: "Visual Designer", company: "Audaces" },
  { period: "2009 — 2010", role: "Visual Designer", company: "Abril" },
  { period: "2008 — 2012", role: "UI/UX Designer", company: "Sisson Studio" },
];
