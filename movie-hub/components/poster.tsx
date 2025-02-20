import Image from "next/image";

export default function Poster({ data, posterURL, path, height, width }) {
  return (
    <Image
      src={`${posterURL}${path}`}
      alt={`${data?.title}'s poster`}
      height={height}
      width={width}
      key={data.id}
      style={{ objectFit: "cover" }}
      className="rounded-box object-cover shadow-sm"
      // priority={true}
      loading="lazy"
      unoptimized={false}
    />
  );
}
