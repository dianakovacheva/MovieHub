import Poster from "../poster";
import AddItemButton from "../add-item-button";
import { addMovieToList } from "../../app/actions/list/list-data";

type MediaListCardProps = {
  listId: string;
  movieId: string;
  userId: string;
  media?: string;
  title?: string;
  subtitle?: string;
  style?: string;
};

export default function SearchMovieResultCard({
  listId,
  movieId,
  userId,
  media,
  title,
  subtitle,
  style,
}: MediaListCardProps) {
  return (
    <li key={movieId} className={style ? style : "list-row"}>
      <form
        action={async function () {
          await addMovieToList(listId, movieId, userId);
        }}
      >
        <button
          type="submit"
          className="flex gap-2 items-center w-full justify-between  hover:cursor-pointer"
        >
          <div className="flex gap-4 items-center">
            <Poster
              alt={title}
              path={media}
              height={200}
              width={250}
              style="rounded-lg object-cover shadow-sm w-15 h-25"
              isMovie={true}
            />

            {subtitle && subtitle?.length > 0 ? (
              <h3 className="text-base font-bold">
                {title} ({subtitle})
              </h3>
            ) : (
              <h3 className="text-base font-bold">{title}</h3>
            )}
          </div>
          <div className="flex justify-items-end">
            <AddItemButton />
          </div>
        </button>
      </form>
    </li>
  );
}
