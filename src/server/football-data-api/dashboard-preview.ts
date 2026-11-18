import type { DashboardData } from "~/app/dashboard/_components/weekly-watch-dashboard";
import { formatMatchDate, type Match } from "./teams";

function spreadAcrossFourDays<T>(
  matches: readonly T[],
  kickoffOf: (match: T) => string,
) {
  if (matches.length === 0) return [];
  const ordered = [...matches].sort((a, b) =>
    kickoffOf(a).localeCompare(kickoffOf(b)),
  );
  const base = new Date(kickoffOf(ordered[0]!));
  base.setUTCHours(15, 0, 0, 0);
  const perDay = new Map<number, number>();
  return ordered.map((match, index) => {
    const day = Math.floor((index * 4) / ordered.length);
    const slot = perDay.get(day) ?? 0;
    perDay.set(day, slot + 1);
    const kickoff = new Date(base);
    kickoff.setUTCDate(base.getUTCDate() + day);
    kickoff.setUTCMinutes(slot * 150);
    return { match, kickoff: kickoff.toISOString() };
  });
}

/** Development-only homepage schedule; identities and API gameweek stay unchanged. */
export function withFourScheduleDays(matches: readonly Match[]): Match[] {
  if (process.env.NODE_ENV !== "development") return [...matches];
  return spreadAcrossFourDays(matches, (match) => match.kickoff).map(
    ({ match, kickoff }) => ({
      ...match,
      kickoff,
      time: formatMatchDate(kickoff).time,
    }),
  );
}

/** Development-only dashboard scenario. Scores, identities, and picks stay unchanged. */
export function withFourMatchdays(data: DashboardData): DashboardData {
  if (process.env.NODE_ENV !== "development" || data.matches.length === 0)
    return data;
  const matches = spreadAcrossFourDays(
    data.matches,
    (match) => match.calendarDate,
  ).map(({ match, kickoff }) => {
    const formatted = formatMatchDate(kickoff);
    return {
      ...match,
      calendarDate: kickoff,
      date: formatted.day.replace(/, \d{4}$/, ""),
      kickoff: formatted.time,
    };
  });
  const byId = new Map(matches.map((match) => [match.id, match]));
  return {
    ...data,
    preview: true,
    matches,
    featuredMatch: data.featuredMatch
      ? (byId.get(data.featuredMatch.id) ?? data.featuredMatch)
      : null,
    favoriteMatch: data.favoriteMatch
      ? (byId.get(data.favoriteMatch.id) ?? data.favoriteMatch)
      : null,
  };
}
