import { Metadata } from "next";
import ListHeader from "../../../../components/list-header";
import {
  generateListMetadata,
  getListMovies,
} from "../../../actions/list/list-data";
import SearchListItem from "../../../../components/list/search-list-item";
import { getUserSession } from "../../../actions/user/user-data";
import ListMovieCard from "../../../../components/list/list-movie-card";
import Subtitle from "../../../../components/subtitle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return await generateListMetadata(id);
}

export default async function ListDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserSession();
  let listMovies = await getListMovies(id);

  listMovies = listMovies!.sort(
    (a, b) => a.addedAt.getTime() - b.addedAt.getTime()
  );

  return id ? (
    <>
      <ListHeader id={id} />

      {/* Add movie to the list */}
      <div className="flex flex-col gap-4 mt-10">
        <Subtitle subtitle="Add a title to this list" style="font-bold" />
        <div className="flex flex-col pl-1 pr-1 md:pl-1 md:pr-0">
          {id && user && <SearchListItem listId={id} userId={user.id} />}
        </div>
      </div>

      {/* Display added movies to the list */}
      {listMovies && (
        <div className="flex flex-col">
          <Subtitle
            subtitle={
              listMovies.length > 1
                ? `${listMovies.length} titles`
                : `${listMovies.length} title`
            }
          />

          <ListMovieCard listMovies={listMovies} />
        </div>
      )}
    </>
  ) : (
    <p>This list is empty.</p>
  );
}
