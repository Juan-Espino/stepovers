"use client";
import type { Team, PlayStyleTypes } from "~/server/db/schema";
import { onBoardUser } from "~/server/db/actions";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import PlayStyle from "./playstyle";
import FavoriteTeam from "./favorite-team";
import { useState } from "react";
import { Button } from "~/components/ui/button";
type QuestionnaireProps = {
  teams: Team[];
};

export default function Questionnaire({ teams }: QuestionnaireProps) {
  const [selectedFavoriteTeam, setselectedFavoriteTeam] = useState<
    string | null
  >(null);
  const [selectedPlayStyle, setSelectedPlayStyle] =
    useState<PlayStyleTypes | null>(null);
  return (
    <form
      className="flex flex-col items-center gap-6"
      action={async () => {
        await onBoardUser(selectedFavoriteTeam!, selectedPlayStyle!);
      }}
    >
      <Carousel className="mx-auto w-3/4">
        <CarouselContent>
          <CarouselItem>
            <PlayStyle
              selectedPlayStyle={selectedPlayStyle}
              setSelectedPlayStyle={setSelectedPlayStyle}
            />
          </CarouselItem>
          <CarouselItem>
            <FavoriteTeam
              selectedFavoriteTeam={selectedFavoriteTeam}
              setselectedFavoriteTeam={setselectedFavoriteTeam}
              teams={teams}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="border-grey/50 bg-[#171717] text-white" />
        <CarouselNext className="border-grey/50 bg-[#171717] text-white" />
      </Carousel>
      <Button
        className="w-fit"
        size={"lg"}
        variant={"default"}
        disabled={!selectedPlayStyle || !selectedFavoriteTeam}
      >
        Submit
      </Button>
    </form>
  );
}
