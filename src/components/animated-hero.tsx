"use client"

import { motion } from "framer-motion";

interface AnimatedHeroProps {
  children?: React.ReactNode;
  delay?: number;
}

export function AnimatedHeroTitle({ children, delay = 0 }: AnimatedHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeroDescription({
  children,
  delay = 0,
}: AnimatedHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileInView={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBadge({ children, delay = 0 }: AnimatedHeroProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

export function GradientText({ text }: { text: string }) {
  return (
    <motion.span
      className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      initial={{ backgroundPosition: "0% center" }}
      animate={{ backgroundPosition: "100% center" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {text}
    </motion.span>
  );
}
