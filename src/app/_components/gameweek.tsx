"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { MatchesByDate } from "~/server/football-data-api/teams";

type GameWeekProps = {
  gameweek: number;
  groupedByDate: MatchesByDate[];
  preview?: boolean;
};

const previewCount = 4;

export default function GameWeek({
  gameweek,
  groupedByDate,
  preview = false,
}: GameWeekProps) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const reducedMotion = useReducedMotion();
  const total = groupedByDate.reduce(
    (count, day) => count + day.matches.length,
    0,
  );
  const hasMatches = total > 0;
  let matchIndex = 0;

  // Measure the natural content so height animates without scaling text or badges.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => {
      setContentHeight(content.getBoundingClientRect().height);
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-body flex w-full min-w-0 flex-col gap-4">
      <h3 className="text-center text-base font-extralight">
        {hasMatches ? `gameweek ${gameweek}` : "no gameweek"}
        {preview && (
          <span className="ml-2 text-xs text-white/60">
            &middot; 4-day preview
          </span>
        )}
      </h3>
      <div className="border-grey/60 rounded-[32px] border px-3 py-4 sm:px-5 sm:py-5">
        <motion.div
          id={listId}
          initial={false}
          animate={{ height: contentHeight ?? "auto" }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="flow-root">
            {!hasMatches ? (
              <div className="py-6 text-center">
                <h2 className="text-xl text-white/60">no matches</h2>
                <p className="mt-3 text-sm text-white/60">
                  There are no Premier League matches scheduled for this week.
                </p>
              </div>
            ) : (
              groupedByDate.map((day) => {
                const startIndex = matchIndex;
                matchIndex += day.matches.length;
                const visibleMatches = expanded
                  ? day.matches
                  : day.matches.slice(
                      0,
                      Math.max(0, previewCount - startIndex),
                    );
                if (!visibleMatches.length) return null;
                return (
                  <div key={day.date} className="mb-3 last:mb-0">
                    <h2 className="mb-3 text-center text-base text-white/60">
                      {day.date}
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {visibleMatches.map((match, index) => {
                        const position = startIndex + index;
                        const delay =
                          expanded && position >= previewCount
                            ? (position - previewCount) * 0.2
                            : position * 0.2;
                        return (
                          <motion.div
                            key={match.id}
                            initial={
                              reducedMotion ? false : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.3,
                              delay: reducedMotion ? 0 : delay,
                            }}
                            className="grid min-h-13 grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] items-center rounded-full bg-[#202020] py-2 text-white"
                          >
                            <div className="flex min-w-0 items-center gap-2 px-2.5 sm:gap-3 sm:px-4">
                              <Image
                                className="size-6 shrink-0 sm:size-7"
                                alt={`${match.homeTeam.shortName} badge`}
                                src={match.homeTeam.badgeUrl}
                                width={28}
                                height={28}
                              />
                              <span className="min-w-0 text-xs leading-snug wrap-break-word sm:text-sm">
                                {match.homeTeam.shortName}
                              </span>
                            </div>
                            <span className="flex min-w-20 items-center justify-center self-stretch border-x border-white/45 px-2 text-center text-xs whitespace-nowrap tabular-nums sm:min-w-24 sm:px-3 sm:text-sm">
                              {match.time}
                            </span>
                            <div className="flex min-w-0 items-center justify-end gap-2 px-2.5 sm:gap-3 sm:px-4">
                              <span className="min-w-0 text-right text-xs leading-snug wrap-break-word sm:text-sm">
                                {match.awayTeam.shortName}
                              </span>
                              <Image
                                className="size-6 shrink-0 sm:size-7"
                                alt={`${match.awayTeam.shortName} badge`}
                                src={match.awayTeam.badgeUrl}
                                width={28}
                                height={28}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
        {total > previewCount && (
          <button
            data-feedback="icon"
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-label={
              expanded ? "Show fewer matches" : `Show all ${total} matches`
            }
            title={
              expanded ? "Show fewer matches" : `Show all ${total} matches`
            }
            onClick={() => setExpanded(!expanded)}
            className="group mx-auto mt-3 flex size-11 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <motion.svg
              aria-hidden="true"
              width="25"
              height="32"
              viewBox="0 0 25 32"
              fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            >
              <path
                d="M12 3C11.5 11 13 19 12 28M4 20L12 28L21 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        )}
      </div>
    </div>
  );
}
