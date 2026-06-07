"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function GlowCursor() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 260, damping: 28 });
  const springY = useSpring(y, { stiffness: 260, damping: 28 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setVisible(true);
      x.set(event.clientX - 160);
      y.set(event.clientY - 160);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-30 hidden h-80 w-80 rounded-full bg-[#f75b20]/12 blur-3xl md:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    />
  );
}
