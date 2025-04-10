import HorizontalListItem from "./horizontal-list-item";

type HorizontalListProps = {
  data: {
    id: string | number;
    name?: string;
  }[];
  path?: string;
};

export default function HorizontalList({ data, path }: HorizontalListProps) {
  return (
    <ul className="flex flex-wrap gap-6">
      {data.map((item, index) => {
        if (typeof item.id === "number") item.id = item.id.toString();

        const key =
          typeof item === "object" && item.id ? item.id : `item-${index}`;

        return (
          <HorizontalListItem
            key={key}
            id={item.id}
            name={item.name}
            path={path}
          />
        );
      })}
    </ul>
  );
}
