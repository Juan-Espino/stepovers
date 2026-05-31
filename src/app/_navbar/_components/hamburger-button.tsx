"use client";

import { type Dispatch, type SetStateAction } from "react";
import { motion } from "motion/react";

export default function HamburgerButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <motion.span
        className="h-0.75 w-7 rounded-full bg-white"
        animate={isOpen ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="h-0.75 w-7 origin-left rounded-full bg-white"
        animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="h-0.75 w-7 rounded-full bg-white"
        animate={isOpen ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.25 }}
      />
    </button>
  );
}
