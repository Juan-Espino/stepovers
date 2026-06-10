import Image from "next/image";
import { motion } from "motion/react";

import { gameweek30 as games } from "../sample-data/gameweek30";
import badge from "../sample-data/man-united-badge.jpg";
import badge2 from "../sample-data/liverpool-badge.jpg";
import type { Match } from "../sample-data/gameweek30";

type MatchesByDate = {
  date: string;
  matches: Match[];
};
function filterGamesByDate(matches: readonly Match[]): MatchesByDate[] {
  const groupedByDay = matches.reduce(
    (acc, match) => {
      const day = match.kickoff.split(" ")[0]!;
      (acc[day] ??= []).push(match);
      return acc;
    },
    {} as Record<string, Match[]>,
  );

  return Object.entries(groupedByDay).map(([date, matches]) => ({
    date,
    matches,
  }));
}

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

export default function GameWeek() {
  const groupedByDate = filterGamesByDate(games.matches);
  return (
    <div className="font-body flex w-full flex-col items-center gap-6 overflow-y-auto">
      <h3 className="text-lg font-extralight">{`gameweek ${games.gameweek}`}</h3>
      {groupedByDate.map((date) => (
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
              className="flex h-15 w-11/12 rounded-[45px] bg-white text-black"
            >
              {/* hometeam */}
              <div
                id="team1"
                className="flex flex-1 items-center justify-between px-3"
              >
                <h4 className="flex-1 px-1 text-center">
                  {match.homeTeam.name}
                </h4>

                <Image
                  className="lg:size-8"
                  alt="team1-badge"
                  src={badge}
                  width={25}
                  height={25}
                />
              </div>
              {/* time */}
              <span className="flex flex-0 items-center bg-gray-100 px-3">
                {"11:11"}
              </span>
              {/* awayteam */}
              <div id="team2" className="flex flex-1 items-center px-3">
                <Image
                  alt="team2-badge"
                  className="lg:size-8"
                  src={badge2}
                  width={25}
                  height={25}
                />
                <h4 className="flex-1 px-1 text-center">
                  {match.awayTeam.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
