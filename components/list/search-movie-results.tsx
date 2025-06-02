import SearchMovieResultCard from "./search-movie-result-card";

type MediaListProps = {
  listId: string;
  userId: string;
  data: {
    id: string | number;
    name?: string;
    title?: string;
    isPublic?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    release_date?: string;
    poster_path?: string;
    known_for_department?: string;
    profile_path?: string;
    media_type?: string;
  }[];
  subtitle?: string;
  listStyle?: string;
  cardStyle?: string;
};

export default function SearchMovieResults({
  listId,
  userId,
  data,
  listStyle,
  cardStyle,
}: MediaListProps) {
  return (
    <ul className={listStyle ? listStyle : "list"}>
      {data &&
        data.map((item) => (
          <SearchMovieResultCard
            key={item.id}
            listId={listId}
            movieId={typeof item.id === "number" ? item.id.toString() : item.id}
            userId={userId}
            media={item.poster_path}
            title={item.title}
            subtitle={item.release_date?.slice(0, 4)}
            style={cardStyle}
          />
        ))}
    </ul>
  );
}
