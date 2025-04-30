import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAnimation } from 'framer-motion';

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return [ref, isInView];
};

export const createStaggeredDelays = (count: number, delay = 0.1) => {
  return Array.from({ length: count }, (_, i) => i * delay);
};
