"use client";

import { SearchResponse } from "../../app/actions/search/types";
import Poster from "../poster";
import { addMovieToList } from "../../app/actions/list/list-data";
import AddItemButton from "../add-item-button";
import { useAlert } from "../../app/utils/use-alert";

type MediaListProps = {
  listId: string;
  userId: string;
  data: SearchResponse["results"];
  mediaType?: "movie" | "tv";
  subtitle?: string;
  listStyle?: string;
  cardStyle?: string;
};

export default function SearchMovieResults({
  listId,
  userId,
  data,
  mediaType = "movie",
  listStyle,
  cardStyle,
}: MediaListProps) {
  const { showAlert } = useAlert();

  return (
    <>
      {data && (
        <ul key={listId} className={listStyle ? listStyle : "list"}>
          {data.map((item) => {
            // Series are stored with a "tv-" prefixed id so they can share the
            // list_movies table with movies without a schema change.
            const storedId =
              mediaType === "tv" ? `tv-${item.id}` : item.id.toString();

            // /search/tv results use `name`/`first_air_date` instead of
            // `title`/`release_date` (not on the multi type, hence the cast).
            const displayTitle =
              item.title ??
              (typeof item.name === "string" ? item.name : undefined);
            const dateStr =
              item.release_date ??
              (item as { first_air_date?: string }).first_air_date;

            return (
              <form
                key={item.id}
                action={async function () {
                  const added = await addMovieToList(listId, storedId, userId);

                  if (added?.errors) {
                    showAlert(
                      "alert-error",
                      `"${displayTitle}" is already in your list.`,
                    );
                  } else if (added?.success) {
                    showAlert(
                      "alert-success",
                      `"${displayTitle}" was added to your list.`,
                    );
                  }
                }}
              >
                <li className={cardStyle ? cardStyle : "list"}>
                  <button
                    type="submit"
                    className="list-row hover:cursor-pointer"
                  >
                    <div className="flex list-col-grow items-center gap-4">
                      <Poster
                        alt={displayTitle}
                        path={item.poster_path}
                        height={200}
                        width={250}
                        style="rounded-lg object-cover shadow-sm w-15 h-25"
                        isMovie={true}
                      />

                      {dateStr && dateStr.length > 0 ? (
                        <div className="text-md font-bold">
                          {displayTitle} ({new Date(dateStr).getFullYear()})
                        </div>
                      ) : (
                        <div className="text-md font-bold">{displayTitle}</div>
                      )}
                    </div>

                    <div className="flex items-center">
                      <AddItemButton />
                    </div>
                  </button>
                </li>
              </form>
            );
          })}
        </ul>
      )}
    </>
  );
}
