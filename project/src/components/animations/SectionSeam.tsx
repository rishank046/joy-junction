interface SectionSeamProps {
  /** Background color of the section above, e.g. "#0a0a0a" */
  from: string;
  /** Background color of the section below, e.g. "#ffffff" */
  to: string;
  /** Height of the blend zone. Taller = softer, more gradual bleed. */
  height?: number;
}

/**
 * Sits between two <section>s and paints a soft gradient from one
 * section's background color into the next, so the page reads as one
 * continuous space instead of hard-cut stacked blocks.
 */
export function SectionSeam({ from, to, height = 96 }: SectionSeamProps) {
  return (
    <div
      aria-hidden="true"
      className="w-full pointer-events-none relative z-[1]"
      style={{
        height,
        marginTop: -height / 2,
        marginBottom: -height / 2,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
