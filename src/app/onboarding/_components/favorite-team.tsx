import type { Team } from "~/server/db/schema";
import type { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardAction>X</CardAction>
      </CardHeader>
      <CardContent className="font-title flex h-full items-center justify-center p-0">
        {teams.map((team, index) => (
          <span className="text-4xl font-semibold text-white" key={index}>
            {team.name}
          </span>
        ))}
      </CardContent>
      <CardFooter className="bg-grey">Footer</CardFooter>
    </Card>
  );
}
