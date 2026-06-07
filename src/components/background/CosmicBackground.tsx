"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: (index % 9) * 0.35,
  size: 2 + (index % 4),
}));

export function CosmicBackground() {
  return (
    <>
      <div className="noise" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-[-18%] top-[-16%] h-[34rem] w-[34rem] rounded-[38%] bg-[#087ec3]/14 blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-[-22%] top-[18%] h-[42rem] w-[42rem] rounded-[42%] bg-[#ed1c24]/10 blur-3xl"
          animate={{ rotate: -360, scale: [1.05, 0.94, 1.05] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-18%] left-[28%] h-[28rem] w-[42rem] rounded-[45%] bg-[#f75b20]/10 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -36, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(255,255,255,0.52)_78%)]" />
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#087ec3]/45 shadow-[0_0_18px_rgba(8,126,195,0.38)]"
            style={{
              left: particle.left,
              top: particle.top,
              height: particle.size,
              width: particle.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -28, 0] }}
            transition={{
              duration: 5 + (particle.id % 6),
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
