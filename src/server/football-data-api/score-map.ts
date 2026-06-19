//add entertainment scores manually (test)
export function addScoreToTeam(id: number): number {
  const score: Record<string, number> = {
    "1044": 45,
    "328": 36,
    "341": 20,
    "351": 17,
    "354": 21,
    "397": 17,
    "402": 39,
    "563": 29,
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
    "76": 3,
    "1076": 46,
    "322": 42,
    "349": 38,
  };

  return score[String(id)] ?? 0;
}
