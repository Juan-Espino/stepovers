"use client";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import { useState } from "react";
import Logo from "./_components/logo";
import Link from "next/link";
import HamburgerButton from "./_components/hamburger-button";
import { motion } from "motion/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  return (
    <div className="flex items-center text-white">
      <div className="flex flex-1 justify-start lg:hidden">
        <div className="relative z-20">
          <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <motion.div
          className={`fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/90`}
          animate={isOpen ? { y: 0 } : { y: 1000 }}
          transition={{ ease: "easeOut" }}
        >
          <Link href={"./"} className="font-body px-3 py-2 text-xl">
            dashboard
          </Link>
          <Link href={"./"} className="font-body px-3 py-2 text-xl">
            season stats
          </Link>
        </motion.div>
      </div>
      <Logo />
      <Link
        href={"./"}
        className="font-body hidden px-3 py-2 lg:inline lg:text-lg"
      >
        dashboard
      </Link>
      <Link
        href={"./"}
        className="font-body hidden px-3 py-2 lg:inline lg:text-lg"
      >
        season stats
      </Link>

      <div className="flex flex-1 justify-end">
        {user.userId ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
}
