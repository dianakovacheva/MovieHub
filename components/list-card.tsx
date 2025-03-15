import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import Poster from "./poster";
import convertDateToString from "../app/utils/convert-date-to-string";
import { deleteList } from "../app/actions/list/list-data";

export default function ListCard({ lists }) {
  return (
    <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4 shadow-xs mb-10">
      <div className="font-semibold text-zinc-900 dark:text-white mb-1">
        <ul className="list">
          {lists.map((list) => (
            <li key={list.id} className="list-row">
              <div>
                <Link href={`lists/${list.id}`} className="flex-none">
                  <Poster
                    name={list.name}
                    path={undefined}
                    height={250}
                    width={200}
                    className="rounded-lg object-cover shadow-sm w-15 h-25"
                    isMovie={true}
                  />
                </Link>
              </div>
              <div className="flex flex-col">
                <Link href={`lists/${list.id}`} className="flex-none">
                  <div className="text-base font-bold">{list.name}</div>
                </Link>
                <div className="text-sm font-semibold opacity-60">
                  {0} movies
                </div>
                <ul className="flex flex-gap gap-6 text-sm font-semibold opacity-60">
                  <li>{list.isPublic == true ? "Public" : "Private"}</li>
                  <li className="list-disc">
                    Modified {convertDateToString(list.updatedAt)}
                  </li>
                </ul>
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
                    <Link href={`/lists/${list.id}`}>View list</Link>
                  </li>
                  <li>
                    <Link href={`/lists/${list.id}/edit`}>Edit</Link>
                  </li>
                  <li>
                    <form
                      action={async function () {
                        await deleteList(list.id);
                      }}
                    >
                      <button type="submit">Delete</button>
                    </form>
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
