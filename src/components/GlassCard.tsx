import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl
        shadow-2xl shadow-purple-500/10
        ${hover ? 'hover:bg-white/15 hover:border-white/30 hover:shadow-purple-500/20' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};