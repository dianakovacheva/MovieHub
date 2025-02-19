import Image from "next/image";

export default function Poster({ data, posterURL, path }) {
  return (
    <Image
      src={`${posterURL}${path}`}
      alt={`${data?.title}'s poster`}
      height={2}
      width={500}
      key={data.id}
      style={{ objectFit: "cover" }}
      className="rounded-box object-cover h-135"
      // priority={true}
      loading="lazy"
      unoptimized={false}
    />
  );
}
