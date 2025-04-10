import Link from "next/link";
import Poster from "./poster";
import DropdownButton from "./dropdown-button";

type MediaListCardProps = {
  id: string;
  media?: string;
  title?: string;
  subtitle?: string;
  status?: string;
  meta?: string;
  link?: string;
  buttons?: boolean;
};

export default function MediaListCard({
  id,
  media,
  title,
  subtitle,
  status,
  meta,
  link,
  buttons,
}: MediaListCardProps) {
  return (
    <li className="list-row">
      <div>
        {link && (
          <Link href={link} className="flex-none">
            <Poster
              alt={title}
              path={media}
              height={250}
              width={200}
              cssStyle="rounded-lg object-cover shadow-sm w-15 h-25"
              isMovie={true}
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col">
        {link && (
          <Link href={link} className="flex-none">
            <h3 className="text-base font-bold">{title}</h3>
          </Link>
        )}

        {subtitle && (
          <div className="text-sm font-semibold opacity-60">{subtitle}</div>
        )}

        {status && status !== undefined && meta && meta !== undefined && (
          <ul className="flex gap-6 text-sm font-semibold opacity-60">
            <li>{status}</li>
            <li className="list-disc">{meta.toString()}</li>
          </ul>
        )}
      </div>

      {link && buttons && <DropdownButton link={link} id={id} />}
    </li>
  );
}
