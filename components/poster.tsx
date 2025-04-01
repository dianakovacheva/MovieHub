import Image from "next/image";
import posterURL from "../app/actions/API-URLS/image-API-URL";

type Poster = {
  name?: string;
  path?: string;
  height?: number;
  width?: number;
  className?: string;
  isMovie: boolean;
};

export default function Poster({
  name,
  path,
  height,
  width,
  className,
  isMovie,
}: Poster) {
  return (
    <Image
      src={
        posterURL && path
          ? `${posterURL}/${path}`
          : isMovie
          ? "/default-movie-poster.jpg"
          : "/default-avatar.png"
      }
      alt={`${name}'s poster`}
      height={height}
      width={width}
      className={className ? className : "rounded-box object-cover shadow-sm"}
      unoptimized={false}
      sizes="(max-width: 640px) 250px,
             (max-width: 1024px) 600px,
             (max-width: 1280px) 800px,
             1200px"
    />
  );
}
