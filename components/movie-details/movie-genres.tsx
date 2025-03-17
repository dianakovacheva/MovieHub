import UnorderedList from "../unordered-list";

export default function MovieGenres({ movieGenres }) {
  const movieGenresSorted = movieGenres.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return <UnorderedList data={movieGenresSorted} path={undefined} />;
}
