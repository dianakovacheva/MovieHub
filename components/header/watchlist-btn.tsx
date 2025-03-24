import { BookmarkPlus } from "lucide-react";
import Link from "next/link";

export default function WatchListBtn({ buttonName }: { buttonName: string }) {
  return (
    <div className="flex-none hidden sm:flex">
      <Link href={"/watchlist"} className="btn btn-ghost">
        <BookmarkPlus />
        {buttonName}
      </Link>
    </div>
  );
}
