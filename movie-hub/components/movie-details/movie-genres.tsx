export default function MovieGenres({ movieGenres }) {
  const movieGendersSorted = movieGenres.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <ul className="flex gap-6 hidden md:flex">
      {movieGendersSorted.map((genre) => (
        <li key={genre.id} className="[&:nth-child(n+2)]:list-disc">
          {genre.name}
        </li>
      ))}
    </ul>
  );
}
