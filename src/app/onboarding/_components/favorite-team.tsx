import type { Team } from "~/server/db/schema";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type FavoriteTeamProps = {
  selectedFavoriteTeam: string | null;
  setselectedFavoriteTeam: Dispatch<SetStateAction<string | null>>;
  teams: Team[];
};

export default function FavoriteTeam({
  selectedFavoriteTeam,
  setselectedFavoriteTeam,
  teams,
}: FavoriteTeamProps) {
  return (
    <Card className="border-grey/10 h-[445px] rounded-xl border bg-[#171717] shadow-none">
      <CardHeader className="text-white">
        <CardTitle className="text-center text-xl">
          {"click on your favorite team"}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-title grid flex-1 grid-cols-5 gap-1.5 px-3 pb-4 sm:gap-2 sm:px-4">
        {teams.map((team) => (
          <button
            key={team.id}
            type="button"
            className={`flex min-h-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center transition sm:px-2 ${
              selectedFavoriteTeam === team.name
                ? "border-red-start bg-red-start/10 text-red-start"
                : "border-grey/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
            }`}
            onClick={() => {
              setselectedFavoriteTeam(team.name);
            }}
          >
            <Image
              src={team.badgeUrl}
              alt={`${team.name} badge`}
              width={36}
              height={36}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
            <span className="line-clamp-2 text-[10px] leading-tight font-semibold sm:text-xs">
              {team.shortName}
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
