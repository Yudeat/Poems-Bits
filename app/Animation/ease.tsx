'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface easeProps {
  children: ReactNode;
  className?: string;
  delay?: number; // optional stagger
}

const ease: React.FC<easeProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // trigger when 20% of element is in view
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};

export default ease;
