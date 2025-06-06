import { Star } from "lucide-react";

export default function RateButton({
  buttonName,
  buttonTextSize,
  width,
  height,
}: {
  buttonName: string;
  width: string;
  height: string;
  buttonTextSize?: string;
}) {
  return (
    <button className="btn-ghost text-[#5799ef]">
      <div className="flex items-top gap-2">
        <Star width={width} height={height} />
        <p className={buttonTextSize ? buttonTextSize : "text-2xl"}>
          {buttonName}
        </p>
      </div>
    </button>
  );
}
