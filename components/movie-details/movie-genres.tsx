import UnorderedList from "../unordered-list";

export default function MovieGenres({
  movieGenres,
}: {
  movieGenres: {
    id: number;
    name?: string;
  }[];
}) {
  const movieGenresSorted = movieGenres
    .filter((genre) => typeof genre.name === "string")
    .sort((a, b) => a.name!.localeCompare(b.name!));

  return <UnorderedList data={movieGenresSorted} path={undefined} />;
}
