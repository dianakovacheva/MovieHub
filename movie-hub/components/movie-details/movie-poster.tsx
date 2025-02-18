import moviePosterURL from "../../app/actions/movies/image-API-URL";
import Image from "next/image";

export default function MoviePoster({ movie }) {
  return (
    <Image
      src={`${moviePosterURL}${movie!.poster_path}`}
      alt={`${movie?.title}'s poster`}
      height={2}
      width={500}
      key={movie.id}
      style={{ objectFit: "cover", padding: 0, margin: 0 }}
      className="rounded-box"
      // priority={true}
      loading="lazy"
      unoptimized={false}
    />
  );
}
