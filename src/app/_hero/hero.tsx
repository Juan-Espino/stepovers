"use client";

import LeagueTitle from "../_components/league-title";
import Image from "next/image";
import Arrow from "../_assets/arrow.svg";
import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center gap-6 lg:items-start">
      <LeagueTitle />
      <div className="relative flex gap-1">
        <div>
          <h1 className="font-heading text-5xl lg:text-7xl">
            {"WASTE NO TIME"}
          </h1>
          <h1 className="font-heading from-red-start to-red-end bg-linear-to-r bg-clip-text text-5xl text-transparent lg:text-7xl">
            {"WATCH OR PASS"}
          </h1>
        </div>
        <Image
          alt="arrow-picture"
          src={Arrow}
          width={75}
          height={75}
          className="absolute -right-1/3 hidden min-[400px]:inline lg:-top-9 lg:right-[-33%] lg:size-32"
        />
      </div>
      <p className="font-body text-grey text-center text-lg">
        {
          "Age old question “Watch game or Watch highlights” can now be answered"
        }
      </p>
      <div className="font-body border-grey/50 cursor-pointer rounded-3xl border-3 px-13 py-2 font-bold">
        {isSignedIn ? <Link href={"/"}> {"DASHBOARD"}</Link> : <SignInButton />}
      </div>
    </div>
  );
}
