import Image from "next/image";
import PremLogo from "../_assets/premlogo.png";
export default function LeagueTitle() {
  return (
    <div className="font-body border-grey flex max-w-fit items-center gap-3 rounded-full border px-4 py-2 text-lg lg:text-xl">
      <p className="from-red-start to-red-end bg-linear-to-r bg-clip-text font-bold text-transparent">
        {"premier league"}
      </p>
      <Image
        src={PremLogo}
        alt="premier league logo"
        width={256}
        height={256}
        className="size-8 lg:size-10"
      />
    </div>
  );
}
