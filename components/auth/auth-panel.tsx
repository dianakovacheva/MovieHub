import Link from "next/link";

type AuthPanelProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  alternateHref: string;
  alternateLabel: string;
  alternatePrompt: string;
  alternateCta: string;
};

export default function AuthPanel({
  title,
  subtitle,
  children,
  alternateHref,
  alternateLabel,
  alternatePrompt,
  alternateCta,
}: AuthPanelProps) {
  return (
    <div className="flex w-full justify-center py-6 md:py-10">
      <div className="w-full max-w-[24rem] rounded-lg border border-zinc-300 bg-white px-6 py-7 shadow-sm dark:border-zinc-700 dark:bg-[#121212]">
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="text-2xl font-normal text-zinc-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-zinc-500 dark:text-[#c0bcbc]">
              {subtitle}
            </p>
          )}
        </div>

        {children}

        <p className="mt-5 text-center text-sm text-zinc-600 dark:text-[#c0bcbc]">
          {alternatePrompt}{" "}
          <Link
            href={alternateHref}
            className="font-semibold text-zinc-900 underline-offset-2 hover:underline dark:text-white"
            aria-label={alternateLabel}
          >
            {alternateCta}
          </Link>
        </p>
      </div>
    </div>
  );
}
