// Get movie release year

export default function movieRealseYear(release_date: string) {
  if (release_date) {
    const releaseYear = release_date.split("-")[0];

    return releaseYear;
  }
}
