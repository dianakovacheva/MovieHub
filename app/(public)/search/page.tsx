import PageTitle from "../../../components/page-title";
import { SearchResponse } from "../../actions/search/types";
import { search } from "../../actions/search/search-data";

import MediaList from "../../../components/media-list";
import HeaderSection from "../../../components/movie-details/header-section";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParamsRes = await searchParams;

  let q = searchParamsRes.q;

  if (q) q = q.split("-").join(" ").toLowerCase().trim();

  const searchType = searchParamsRes.type;

  let searchResults: SearchResponse["results"] = [];

  if (q && searchType) {
    const data = await search(q, searchType);

    if (data) searchResults = data;
  }

  const people: SearchResponse["results"] =
    searchResults &&
    searchResults.filter((item) => item.name && item!.known_for_department);

  const movies: SearchResponse["results"] =
    searchResults &&
    searchResults.filter((item) => item.title && item.release_date);

  return (
    <>
      <PageTitle title={`Search "${q}"`} />

      {searchType === "multi" && (
        <>
          <HeaderSection sectionName={"People"} />
          {people.length > 0 ? (
            <MediaList data={people} path="/person" />
          ) : (
            `No results found for "${q}"`
          )}

          <HeaderSection sectionName={"Movies"} />
          {movies.length > 0 ? (
            <MediaList data={movies} path="/movie" />
          ) : (
            `No results found for "${q}"`
          )}
        </>
      )}

      {searchType === "person" && (
        <>
          <HeaderSection sectionName={"People"} />
          {people.length > 0 ? (
            <MediaList data={people} path="/person" />
          ) : (
            `No results found for "${q}"`
          )}
        </>
      )}

      {searchType === "movie" && (
        <>
          <HeaderSection sectionName={"Movies"} />
          {movies.length > 0 ? (
            <MediaList data={movies} path="/movie" />
          ) : (
            `No results found for "${q}"`
          )}
        </>
      )}
    </>
  );
}
