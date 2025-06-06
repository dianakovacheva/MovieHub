import { JSX } from "react";

export default async function Subtitle({
  subtitle,
  style,
}: {
  subtitle: string | JSX.Element;
  style?: string;
}) {
  return typeof subtitle == "string" ? (
    <div
      className={
        style
          ? style
          : "flex items-center gap-2 mt-2 font-medium text-base text-zinc-500 dark:text-[#c0bcbc]"
      }
    >
      <p> {subtitle} </p>
    </div>
  ) : (
    <div
      className={
        style
          ? style
          : "flex items-center gap-2 mt-2 font-medium text-base text-zinc-500 dark:text-[#c0bcbc]"
      }
    >
      {subtitle}
    </div>
  );
}
