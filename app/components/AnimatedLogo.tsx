'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedLogo() {
  return (
    <motion.div
      className="mx-auto block w-fit"
      animate={{ y: [0, -20, 0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        src="/StackZenOriginalLogo.svg"
        alt="StackZen Logo"
        width={600}
        height={600}
        priority
        className="mx-auto block"
        draggable={false}
      />
    </motion.div>
  );
}
