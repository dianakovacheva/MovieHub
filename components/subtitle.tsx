import { JSX } from "react";

export default async function Subtitle({
  subtitle,
}: {
  subtitle: string | JSX.Element;
}) {
  return subtitle ? (
    <div className="flex items-center gap-2 mt-2 font-medium text-base text-zinc-500 dark:text-[#c0bcbc]">
      <p> {subtitle} </p>
    </div>
  ) : (
    ""
  );
}
