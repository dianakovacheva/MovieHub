import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import Poster from "./poster";

export default function ListCard({ lists }) {
  return (
    <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4 shadow-xs mb-10">
      <div className="font-semibold text-zinc-900 dark:text-white">
        <ul className="list">
          {lists.map((list) => (
            <li key={list.id} className="list-row">
              <div>
                {/* <Poster
                  data={undefined}
                  path={undefined}
                  height={undefined}
                  width={undefined}
                  className={undefined}
                  isMovie={undefined}
                /> */}
                {/* <Image
                      src={
                        movie.poster_path
                          ? `${posterURL}/${movie.poster_path}`
                          : "/default-movie-image.jpg"
                      }
                      alt={`${movie.title}'s poster`}
                      width={250}
                      height={200}
                      loading="lazy"
                      unoptimized={false}
                      className="rounded-lg object-cover shadow-sm w-15 h-25"
                    /> */}
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/list/${list.id}`} className="flex-none">
                  <div className="text-md font-bold">{list.name}</div>
                </Link>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {list.description}
                </div>
              </div>
              <div className="dropdown dropdown-bottom dropdown-end flex-none text-sm font-semibold">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle m-1"
                >
                  <EllipsisVertical />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content rounded-box z-1 w-52 p-2 shadow bg-base-200"
                >
                  <li>
                    <Link href={`/list/${list.id}`}>View list</Link>
                  </li>
                  <li>
                    <Link href={`/list/${list.id}/edit`}>Edit</Link>
                  </li>
                  <li>
                    <button>Delete</button>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
