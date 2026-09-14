'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#D2F843] z-50 origin-left pointer-events-none shadow-[0_0_10px_rgba(210,248,67,0.7)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
