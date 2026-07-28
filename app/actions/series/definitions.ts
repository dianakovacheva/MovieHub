// Normalized shape used by the series carousel and section components.
export type SeriesListItem = {
  id: number;
  name?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity?: number;
  media_type?: string;
};

export type SeriesProps = {
  series: SeriesListItem[];
};

// Normalize raw TMDB TV list results (from any /tv or /trending/tv endpoint)
// into the shape the series carousel expects.
export function toSeriesListItems(
  results:
    | {
        id?: number;
        name?: string;
        original_name?: string;
        overview?: string;
        poster_path?: string | null;
        backdrop_path?: string | null;
        first_air_date?: string;
        vote_average?: number;
        popularity?: number;
        media_type?: string;
      }[]
    | null
    | undefined
): SeriesListItem[] {
  if (!results) return [];

  return results
    .filter((show): show is typeof show & { id: number } => Boolean(show.id))
    .map((show) => ({
      id: show.id,
      name: show.name,
      original_name: show.original_name,
      overview: show.overview,
      poster_path: show.poster_path ?? undefined,
      backdrop_path: show.backdrop_path ?? undefined,
      first_air_date: show.first_air_date,
      vote_average: show.vote_average,
      popularity: show.popularity,
      media_type: show.media_type,
    }));
}
