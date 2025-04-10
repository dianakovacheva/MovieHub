import HorizontalList from "../horizontal-list";

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
  return <HorizontalList data={movieGenresSorted} />;
}
