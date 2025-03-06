import Link from "next/link";

export default function WatchListBtn({ buttonName }) {
  return (
    <div className="flex-none hidden sm:flex">
      <Link href={"/watchlist"} className="btn btn-ghost rounded-field">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bookmark-plus-fill h-5 w-5"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
          />
        </svg>
        {buttonName}
      </Link>
    </div>
  );
}
