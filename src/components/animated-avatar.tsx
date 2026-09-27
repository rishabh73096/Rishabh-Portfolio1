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
      <Avatar
        className={`${sizeClasses[size]} rounded-xl border border-dashed border-border`}
      >
        <AvatarImage
          alt={alt}
          src={src}
          className="rounded-xl object-cover object-top"
        />
        <AvatarFallback className="rounded-xl">{fallback}</AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
