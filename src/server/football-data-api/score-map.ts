import type { PlayStyleTypes } from "../db/schema";

export function addScoreToTeam(id: number, playStyle: PlayStyleTypes): number {
  const chaosScore: Record<string, number> = {
    "1044": 45,
    "341": 20,
    "351": 17,
    "354": 21,
    "397": 17,
    "402": 39,
    "57": 15,
    "58": 22,
    "61": 48,
    "62": 11,
    "63": 17,
    "64": 48,
    "65": 49,
    "66": 50,
    "67": 35,
    "71": 0,
    "73": 7,
    "1076": 46,
    "322": 42,
    "349": 38,
  };

  const bigGamesScore: Record<string, number> = {
    "1044": 14,
    "1076": 17,
    "322": 16,
    "341": 27,
    "349": 25,
    "351": 26,
    "354": 21,
    "397": 20,
    "402": 15,
    "57": 47,
    "58": 34,
    "61": 46,
    "62": 31,
    "63": 18,
    "64": 50,
    "65": 46,
    "66": 50,
    "67": 33,
    "71": 23,
    "73": 40,
  };

  const tacticalScore: Record<string, number> = {
    "1044": 30,
    "1076": 27,
    "322": 13,
    "341": 24,
    "349": 22,
    "351": 12,
    "354": 21,
    "397": 34,
    "402": 26,
    "57": 50,
    "58": 23,
    "61": 32,
    "62": 15,
    "63": 21,
    "64": 36,
    "65": 42,
    "66": 33,
    "67": 28,
    "71": 15,
    "73": 23,
  };

  return playStyle === "chaos"
    ? (chaosScore[String(id)] ?? 0)
    : playStyle === "big games"
      ? (bigGamesScore[String(id)] ?? 0)
      : playStyle === "tactical"
        ? (tacticalScore[String(id)] ?? 0)
        : 0;
}
