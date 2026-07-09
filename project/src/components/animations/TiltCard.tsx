import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep this small (5-10) so it feels physical, not gimmicky. */
  maxTilt?: number;
  /** How much the card lifts toward the viewer on hover, in px. */
  liftPx?: number;
}

/**
 * Wraps any card content and tilts it in 3D based on cursor position,
 * like the card is a physical object catching light as you move over it.
 */
export function TiltCard({ children, className = "", maxTilt = 7, liftPx = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth out the raw mouse input so the tilt eases rather than snaps.
  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const translateZ = useSpring(0, springConfig);

  // A subtle glare that slides across the card, tracking the cursor.
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: [string, string]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.25), transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    translateZ.set(liftPx);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    translateZ.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full will-change-transform group/tilt"
      >
        {children}

        {/* Cursor-tracking glare */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
          style={{ background: glareBackground }}
        />
      </motion.div>
    </div>
  );
}
