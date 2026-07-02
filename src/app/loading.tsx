import { Triangle } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Triangle
        visible={true}
        height="200"
        width="200"
        color="#fff"
        ariaLabel="triangle-loading"
      />
    </div>
  );
}
