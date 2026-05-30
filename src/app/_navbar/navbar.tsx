"use client";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Hamburger from "../sample-data/hamburger";
import Logo from "./_components/Logo";
import Link from "next/link";

export default function NavBar() {
  const user = useAuth();
  return (
    <div className="flex items-center text-white">
      <div className="flex flex-1 justify-start lg:hidden">
        <Hamburger />
      </div>
      <Logo />
      <Link href={"./"} className="font- font-body hidden px-3 py-2 lg:inline">
        dashboard
      </Link>
      <Link href={"./"} className="font- font-body hidden px-3 py-2 lg:inline">
        season stats
      </Link>

      <div className="flex flex-1 justify-end">
        {user.userId ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
}
