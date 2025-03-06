import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { logout } from "../app/actions/user/auth";

export default function UserButton({ userEmail }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-field">
        <CircleUserRound />
        <span className="hidden sm:flex">{userEmail}</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
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
