import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { QUERIES } from "~/server/queries";

export default async function Onboarding() {
  const teams = await QUERIES.getAllTeams();
  return (
    <Carousel className="relative mx-auto w-full max-w-[420px]">
      <CarouselContent className="">
        {teams.map((_, index) => (
          <CarouselItem key={index}>
            <Card className="h-[345px] rounded-xl border border-white/10 bg-[#171717] shadow-none">
              <CardContent className="flex h-full items-center justify-center p-0">
                <span className="text-4xl font-semibold text-white">
                  {_.name}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
