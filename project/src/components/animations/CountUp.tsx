import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  /** The final number to count up to, e.g. 500 */
  to: number;
  /** Text appended after the number, e.g. "+", "%", "k+" */
  suffix?: string;
  /** Text prepended before the number, e.g. "$" */
  prefix?: string;
  /** How long the count animation takes, in ms */
  duration?: number;
  /** Decimal places to keep, e.g. 1 for a rating like 4.8 */
  decimals?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", prefix = "", duration = 1800, decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // "once: true" -> only animate the first time it enters the viewport
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let rafId: number;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic: fast start, gentle settle at the end
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * to);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
