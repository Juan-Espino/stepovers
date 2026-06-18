import Image, { type StaticImageData } from "next/image";
import loopArrowsSrc from "../_assets/loop-arrows-svgreo-com.svg";

const loopArrows = loopArrowsSrc as StaticImageData;

export default function PredictBestMatches() {
  return (
    <section className="mt-16 flex justify-center lg:mt-24">
      <div className="border-grey/30 flex min-h-110 w-[90%] flex-col items-center justify-center rounded-[44px] border bg-[#2a2a2a]/70 px-5 py-16 text-center sm:min-h-140 sm:rounded-[64px] lg:min-h-180 lg:w-full lg:rounded-[92px]">
        <div className="flex flex-col items-center gap-9 sm:gap-12">
          <div className="font-title flex flex-col gap-4 text-5xl leading-none sm:text-7xl lg:text-8xl">
            <h2 className="text-white/85">PREDICT THIS WEEKS</h2>
            <p className="from-red-start to-red-end bg-linear-to-r bg-clip-text text-transparent">
              BEST MATCHES
            </p>
          </div>
          <Image
            src={loopArrows}
            alt=""
            width={150}
            height={186}
            className="h-28 w-auto sm:h-36 lg:h-44"
          />
        </div>
      </div>
    </section>
  );
}
