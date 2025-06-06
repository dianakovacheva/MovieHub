import { SearchResponse } from "../../app/actions/search/types";
import Poster from "../poster";
import { addMovieToList } from "../../app/actions/list/list-data";
import AddItemButton from "../add-item-button";

type MediaListProps = {
  listId: string;
  userId: string;
  data: SearchResponse["results"];
  subtitle?: string;
  listStyle?: string;
  cardStyle?: string;
};

export default function SearchMovieResults({
  listId,
  userId,
  data,
  listStyle,
  cardStyle,
}: MediaListProps) {
  return (
    data && (
      <ul key={listId} className={listStyle ? listStyle : "list"}>
        {data.map((movie) => (
          <form
            key={movie.id}
            action={async function () {
              await addMovieToList(listId, movie.id.toString(), userId);
            }}
          >
            <li className={cardStyle ? cardStyle : "list"}>
              <button type="submit" className="list-row hover:cursor-pointer">
                <div className="flex list-col-grow items-center gap-4">
                  <Poster
                    alt={movie.title}
                    path={movie.poster_path}
                    height={200}
                    width={250}
                    style="rounded-lg object-cover shadow-sm w-15 h-25"
                    isMovie={true}
                  />

                  {movie.release_date && movie.release_date?.length > 0 ? (
                    <div className="text-md font-bold">
                      {movie.title} (
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "-"}
                      )
                    </div>
                  ) : (
                    <div className="text-md font-bold">{movie.title}</div>
                  )}
                </div>

                <div className="flex items-center">
                  <AddItemButton />
                </div>
              </button>
            </li>
          </form>
        ))}
      </ul>
    )
  );
}
