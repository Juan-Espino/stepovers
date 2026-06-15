import type { PlayStyleTypes } from "~/server/db/schema";
import { playStyleValues } from "~/server/db/schema";
import type { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type PlayStyleProps = {
  selectedPlayStyle: PlayStyleTypes | null;
  setSelectedPlayStyle: Dispatch<SetStateAction<PlayStyleTypes | null>>;
};

export default function PlayStyle({
  selectedPlayStyle,
  setSelectedPlayStyle,
}: PlayStyleProps) {
  return (
    <Card className="border-grey/10 h-[445px] rounded-xl border bg-[#171717] shadow-none">
      <CardHeader className="text-white">
        <CardTitle className="text-center text-xl">
          {"click on your prefered playstyle"}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-title flex h-full flex-col items-center justify-around">
        {playStyleValues.map((style, index) => (
          <span
            key={index}
            className={`cursor-pointer p-4 text-4xl font-semibold ${
              selectedPlayStyle === style ? "text-red-start" : "text-white"
            }`}
            onClick={() => {
              setSelectedPlayStyle(style);
            }}
          >
            {style}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
