import Image from "next/image";
import { motion } from "motion/react";

import type { MatchesByDate } from "~/server/football-data-api/teams";

type GameWeekProps = {
  gameweek: number;
  groupedByDate: MatchesByDate[];
};

const dateContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const matchCard = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function GameWeek({ gameweek, groupedByDate }: GameWeekProps) {
  const hasMatches = groupedByDate.length > 0;
  const isEmptyGameweek = gameweek === 0 && !hasMatches;
  return (
    <div className="font-body flex w-full flex-col items-center gap-6 overflow-y-auto">
      <h3 className="text-lg font-extralight">
        {isEmptyGameweek ? "no gameweek" : `gameweek ${gameweek}`}
      </h3>
      {isEmptyGameweek ? (
        <div className="border-grey flex w-[90%] flex-col items-center gap-3 rounded-[45px] border p-6 text-center lg:w-[70%]">
          <h2 className="text-grey text-2xl">no matches</h2>
          <p className="text-grey max-w-sm text-sm leading-relaxed">
            There are no Premier League matches scheduled for this week.
          </p>
        </div>
      ) : (
        groupedByDate.map((date) => (
          // matches on a date container
          <motion.div
            variants={dateContainer}
            initial="hidden"
            animate="visible"
            key={date.date}
            className="border-grey flex w-[90%] flex-col items-center justify-between gap-3 rounded-[45px] border p-3 lg:w-[70%]"
          >
            {/* match date */}
            <h2 className="text-grey text-2xl">{date.date}</h2>
            {date.matches.map((match) => (
              // home team, time, away team container
              <motion.div
                variants={matchCard}
                key={match.id}
                className="grid h-15 w-11/12 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-[45px] bg-white text-black"
              >
                {/* hometeam */}
                <div
                  id="team1"
                  className="flex min-w-0 items-center justify-between gap-1 px-3"
                >
                  <h4 className="min-w-0 flex-1 px-1 text-center text-sm leading-tight wrap-break-word sm:text-base">
                    {match.homeTeam.shortName}
                  </h4>

                  <Image
                    className="size-6 shrink-0 min-[1024px]:size-0 min-[1200px]:size-8"
                    alt="team1-badge"
                    src={match.homeTeam.badgeUrl}
                    width={25}
                    height={25}
                  />
                </div>
                {/* time */}
                <span className="flex min-w-13 shrink-0 items-center justify-center bg-gray-100 px-2 text-center text-sm leading-tight sm:px-3 sm:text-base">
                  {match.time}
                </span>
                {/* awayteam */}
                <div
                  id="team2"
                  className="flex min-w-0 items-center gap-1 px-3"
                >
                  <Image
                    alt="team2-badge"
                    className="size-6 shrink-0 min-[1024px]:size-0 min-[1200px]:size-8"
                    src={match.awayTeam.badgeUrl}
                    width={25}
                    height={25}
                  />
                  <h4 className="min-w-0 flex-1 px-1 text-center text-sm leading-tight wrap-break-word sm:text-base">
                    {match.awayTeam.shortName}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))
      )}
    </div>
  );
}
