import type { Experience } from "@/lib/types";

export function ExperienceRow({ period, role, company }: Experience) {
  return (
    <li className="flex gap-4 py-1.5">
      <span className="w-28 shrink-0 text-xs leading-[18px] text-text-3 tabular-nums">
        {period}
      </span>
      <span className="flex-1 text-text">{role}</span>
      <span className="text-text-2">{company}</span>
    </li>
  );
}
