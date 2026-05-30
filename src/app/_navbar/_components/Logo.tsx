import Image, { type StaticImageData } from "next/image";
import logoSrc from "../../_assets/Logo.svg";

const logo = logoSrc as StaticImageData;

export default function Logo() {
  return (
    <div className="border-grey rounded-full border px-10 py-1">
      <Image src={logo} alt="StepOvers" width={20} height={20} />
    </div>
  );
}
