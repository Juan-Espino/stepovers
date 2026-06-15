import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function FavoriteTeam() {
  return (
    <Card className="border-grey/10 h-[445px] rounded-xl border bg-[#171717] shadow-none">
      <CardHeader className="text-white">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardAction>X</CardAction>
      </CardHeader>
      <CardContent className="font-title flex h-full items-center justify-center p-0">
        <span className="text-4xl font-semibold text-white">
          {"Favorite Team"}
        </span>
      </CardContent>
      <CardFooter className="bg-grey">Footer</CardFooter>
    </Card>
  );
}
