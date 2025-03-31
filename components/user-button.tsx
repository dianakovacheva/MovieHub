import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { logout } from "../app/actions/user/auth";

export default function UserButton({ userEmail }: { userEmail: string }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <CircleUserRound />
        <span className="hidden lg:flex flex-wrap">{userEmail}</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-zinc-50 dark:bg-[#121212] rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
      >
        <li>
          <Link href={"/dashboard"}>Your profile</Link>
        </li>
        <li>
          <Link href={"/watchlist"}>Your watchlist</Link>
        </li>
        <li>
          <button onClick={logout} className="btn-ghost">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
