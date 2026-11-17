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
  preview?: boolean;
  gameweek: number;
  groupedByDate: {
    date: string;
    matches: Match[];
  }[];
};

export default function Hero({
  gameweek,
  groupedByDate,
  preview = false,
}: HeroProps) {
  const { isSignedIn } = useAuth();

  return (
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      {/* leftside */}
      <div className="flex min-w-0 flex-col items-center gap-6 lg:items-start">
        <div className="homepage-enter">
          <LeagueTitle />
        </div>
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
              style={{ animationDelay: "80ms" }}
              className="homepage-enter absolute -right-1/3 hidden min-[400px]:inline lg:-top-9 lg:right-[-33%] lg:size-32"
            />
          </div>
          <p
            style={{ animationDelay: "140ms" }}
            className="homepage-enter font-body max-w-md text-center text-lg text-white/60 lg:text-start lg:text-xl"
          >
            {
              "Step Overs predicts which matches are worth watching and which are better as highlights"
            }
          </p>
          <div
            style={{ animationDelay: "220ms" }}
            className="homepage-enter font-body font-bold lg:text-lg"
          >
            {isSignedIn ? (
              <Link
                data-feedback="outline"
                className="border-grey/50 inline-flex cursor-pointer rounded-[45px] border-3 px-13 py-2"
                href={"/dashboard"}
              >
                {" "}
                {"DASHBOARD"}
              </Link>
            ) : (
              <SignInButton>
                <button
                  data-feedback="outline"
                  className="font-body border-grey/50 cursor-pointer rounded-[45px] border-3 px-13 py-2"
                >
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
      {/* rightside */}
      {/* gameweek */}
      <GameWeek
        gameweek={gameweek}
        groupedByDate={groupedByDate}
        preview={preview}
      />
    </section>
  );
}
