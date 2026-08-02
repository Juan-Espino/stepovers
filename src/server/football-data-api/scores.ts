import type { DashboardData } from "~/app/dashboard/_components/weekly-watch-dashboard";
import { GetGameWeekMatches, type Match } from "./teams";
import { addScoreToTeam } from "./score-map";
import type { PlayStyleTypes } from "../db/schema";

type ScoredMatch = Match & {
  entertainmentScore: number;
};

function getMatchEntertainmentScore(match: Match, play_style: PlayStyleTypes) {
  return Math.min(
    addScoreToTeam(match.homeTeam.id, play_style) +
      addScoreToTeam(match.awayTeam.id, play_style),
    100,
  );
}

function getFavoriteVerdict(score: number | null) {
  if (score === null) {
    return {
      label: "no fixture",
      detail:
        "Your favorite team is not on this gameweek slate, so this week is all about the neutral pick.",
      tone: "pass" as const,
    };
  }

  if (score >= 80) {
    return {
      label: "watch",
      detail:
        "Your team clears the watch line this week. Make time for the full match instead of waiting for highlights.",
      tone: "watch" as const,
    };
  }

  return {
    label: "highlights",
    detail: "Stick to watching the highlights unless you are a fanatic.",
    tone: "pass" as const,
  };
}

function toDashboardMatch(match: ScoredMatch) {
  return {
    id: match.id,
    kickoff: match.time,
    entertainmentScore: match.entertainmentScore,
    homeTeam: {
      name: match.homeTeam.name,
      shortName: match.homeTeam.shortName,
      badgeUrl: match.homeTeam.badgeUrl,
    },
    awayTeam: {
      name: match.awayTeam.name,
      shortName: match.awayTeam.shortName,
      badgeUrl: match.awayTeam.badgeUrl,
    },
  };
}

//caculate scores for all matchups and have a featured match
//also get users favorite team and filter its match in return json
//                          As well as a verdict to watch it or not!!!
export async function calculateScorePerGame(
  favoriteTeam: string,
  play_style: PlayStyleTypes,
): Promise<DashboardData> {
  const gameWeekSchedule = await GetGameWeekMatches();
  const scoredMatches: ScoredMatch[] = gameWeekSchedule.matches.map(
    (match) => ({
      ...match,
      entertainmentScore: getMatchEntertainmentScore(match, play_style),
    }),
  );

  const featuredMatch = scoredMatches.reduce<ScoredMatch | null>(
    (currentBest, match) =>
      currentBest === null ||
      match.entertainmentScore > currentBest.entertainmentScore
        ? match
        : currentBest,
    null,
  );

  const favoriteMatch =
    scoredMatches.find(
      (match) =>
        match.homeTeam.name === favoriteTeam ||
        match.awayTeam.name === favoriteTeam,
    ) ?? null;

  if (!featuredMatch) {
    return {
      gameweek: gameWeekSchedule.gameweek,
      season: "2025-26",
      favoriteTeam,
      featuredMatch: null,
      featuredReason: "No Premier League matches are scheduled this gameweek.",
      favoriteMatch: null,
      favoriteVerdict: getFavoriteVerdict(null),
      matches: [],
    };
  }
  return {
    gameweek: gameWeekSchedule.gameweek,
    season: "2026-27",
    favoriteTeam,
    featuredMatch: toDashboardMatch(featuredMatch),
    featuredReason: `Highest combined ${play_style} score of the gameweek.`,
    favoriteMatch: favoriteMatch ? toDashboardMatch(favoriteMatch) : null,
    favoriteVerdict: getFavoriteVerdict(
      favoriteMatch?.entertainmentScore ?? null,
    ),
    matches: scoredMatches.map(toDashboardMatch),
  };
}
