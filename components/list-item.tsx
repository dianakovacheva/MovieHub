import Link from "next/link";

type ListItemProps = {
  item: { id?: string | number; name?: string } | string;
  path?: string;
};

export default function ListItem({ item, path }: ListItemProps) {
  const itemName = typeof item === "string" ? item : item.name || item.id;

  return (
    itemName && (
      <li className="[&:nth-child(n+2)]:list-disc">
        {path && typeof item !== "string" && item.id ? (
          <Link
            href={`${path}/${item.id}-${itemName
              .toString()
              .split(" ")
              .join("-")
              .toLowerCase()}`}
            className="link link-hover text-[#0e63be]"
          >
            {itemName}
          </Link>
        ) : (
          itemName
        )}
      </li>
    )
  );
}
