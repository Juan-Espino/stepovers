"use client";

import LeagueTitle from "../_components/league-title";
import Image, { type StaticImageData } from "next/image";
import arrowSrc from "../_assets/arrow.svg";

const arrow = arrowSrc as StaticImageData;
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import GameWeek from "../_components/gameweek";
import type { Match } from "~/server/football-data-api/teams";

type HeroProps = {
  gameweek: number;
  groupedByDate: {
    date: string;
    matches: Match[];
  }[];
};

export default function Hero({ gameweek, groupedByDate }: HeroProps) {
  const { isSignedIn } = useAuth();

  return (
    <section className="flex flex-col gap-6 overflow-hidden lg:max-h-200 lg:flex-row lg:gap-30">
      {/* leftside */}
      <div className="flex flex-col items-center gap-6 lg:items-start">
        <LeagueTitle />
        {/* call to action */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <div className="relative flex gap-1">
            <div>
              <h1 className="font-title text-5xl lg:text-7xl">
                {"WASTE NO TIME"}
              </h1>
              <h1 className="font-title from-red-start to-red-end bg-linear-to-r bg-clip-text text-5xl text-transparent lg:text-7xl">
                {"WATCH OR PASS"}
              </h1>
            </div>
            <Image
              alt="arrow-picture"
              src={arrow}
              width={75}
              height={75}
              className="absolute -right-1/3 hidden min-[400px]:inline lg:-top-9 lg:right-[-33%] lg:size-32"
            />
          </div>
          <p className="font-body text-grey text-center text-lg lg:text-start lg:text-2xl">
            {
              "Step Overs predicts which matches are worth watching and which are better as highlights"
            }
          </p>
          <div className="font-body border-grey/50 rounded-[45px] border-3 px-13 py-2 font-bold lg:text-lg">
            {isSignedIn ? (
              <Link className="cursor-pointer" href={"/dashboard"}>
                {" "}
                {"DASHBOARD"}
              </Link>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
      {/* rightside */}
      {/* gameweek */}
      <GameWeek gameweek={gameweek} groupedByDate={groupedByDate} />
    </section>
  );
}
