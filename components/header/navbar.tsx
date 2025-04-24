import Link from "next/link";
import BurgerMenu from "./burger-menu";
import WatchListBtn from "./watchlist-btn";
import SearchField from "./search/search-field";
import ThemeSwitcher from "./theme-switcher";
import AuthButton from "./auth-button";
import { Suspense } from "react";

export default function Navbar() {
  const buttonName = "Watchlist";

  return (
    <nav className="navbar flex flex-1 items-center justify-between m-0 p-0">
      {/* Navbar left side */}
      <div className="navbar-start flex-row-reverse items-center justify-end sm:justify-start sm:flex-row">
        <Link href={"/"} className="text-xl font-bold">
          MovieHub
        </Link>
        <BurgerMenu />
      </div>
      <div className="flex gap-2 navbar-end order-2 w-auto">
        {/* Search bar */}
        <div>
          <SearchField />
        </div>
        {/* Buttons right side */}
        <div className="flex items-center">
          <WatchListBtn buttonName={buttonName} />
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
