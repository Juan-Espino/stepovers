"use client";
import type { Team, PlayStyleTypes } from "~/server/db/schema";

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
      action={async () => {
        console.log("submited");
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
            <FavoriteTeam />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="border-grey/50 bg-[#171717] text-white" />
        <CarouselNext className="border-grey/50 bg-[#171717] text-white" />
      </Carousel>
      <button type="submit">Submit</button>
    </form>
  );
}
