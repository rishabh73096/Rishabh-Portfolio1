"use client"

import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AnimatedAvatarProps {
  src: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-16",
  md: "size-28",
  lg: "size-40",
};

export function AnimatedAvatar({
  src,
  alt,
  fallback,
  size = "md",
}: AnimatedAvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 2,
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
      <Avatar className={`${sizeClasses[size]} border-3 border-primary shadow-2xl ring-2 ring-background`}>
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
