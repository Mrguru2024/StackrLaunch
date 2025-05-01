import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

export const useScrollReveal = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    amount: threshold,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls };
};

export const createStaggeredDelays = (count: number, baseDelay = 0.1) => {
  return Array.from({ length: count }, (_, i) => i * baseDelay);
};
