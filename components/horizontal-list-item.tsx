import Link from "next/link";

type HorizontalListItemProps = {
  id?: string;
  name?: string;
  path?: string;
};

export default function HorizontalListItem({
  id,
  name,
  path,
}: HorizontalListItemProps) {
  const itemName = typeof name === "string" ? name : name || id;
  path = path && id ? `${path}/${id}` : "";

  return (
    <li className="[&:nth-child(n+2)]:list-disc list-row">
      {itemName && path ? (
        <div>
          <Link
            href={`${path}-${itemName
              .toString()
              .split(" ")
              .join("-")
              .toLowerCase()}`}
            className="link link-hover text-[#0e63be] flex-none"
          >
            {itemName}
          </Link>
        </div>
      ) : (
        itemName
      )}
    </li>
  );
}
