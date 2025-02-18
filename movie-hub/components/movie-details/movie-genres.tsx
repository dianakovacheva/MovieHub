export default function MovieGenres({ movieGenres }) {
  const movieGendersSorted = movieGenres.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      {movieGendersSorted.length > 1
        ? movieGendersSorted.map((genre) => genre.name).join(", ")
        : " "}
    </>
  );
}
