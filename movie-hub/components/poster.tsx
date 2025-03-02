import Image from "next/image";
import posterURL from "../app/actions/API-URLS/image-API-URL";

export default function Poster({
  data,
  path,
  height,
  width,
  className,
  isMovie,
}) {
  return (
    <Image
      src={
        posterURL && path
          ? `${posterURL}/${path}`
          : isMovie
          ? "/default-movie-poster.jpg"
          : "/default-avatar.png"
      }
      alt={`${data!.title}'s poster`}
      height={height}
      width={width}
      key={data.id}
      className={className ? className : "rounded-box object-cover shadow-sm"}
      unoptimized={false}
      sizes="(max-width: 640px) 250px,
             (max-width: 1024px) 600px,
             (max-width: 1280px) 800px,
             1200px"
    />
  );
}
