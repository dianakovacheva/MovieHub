import Link from "next/link";

export default function UnorderedList({ data, path }) {
  return (
    <ul className="flex flex-wrap gap-6">
      {data.map((item) => (
        <li key={item.id} className="[&:nth-child(n+2)]:list-disc">
          {path !== undefined ? (
            <Link
              href={`${path}/${item.id}-${
                item.name && item.name.split(" ").join("-").toLowerCase()
              }`}
              className="link link-hover text-[#0e63be]"
            >
              {item.name ? item.name : item}
            </Link>
          ) : item.name ? (
            item.name
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}
