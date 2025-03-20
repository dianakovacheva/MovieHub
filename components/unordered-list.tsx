import ListItem from "./list-item";

type UnorderedListProps = {
  data: { id?: string | number; name?: string }[] | string[];
  path?: string;
};

export default function UnorderedList({ data, path }: UnorderedListProps) {
  return (
    <ul className="flex flex-wrap gap-6">
      {data.map((item, index) => {
        const key =
          typeof item === "object" && item.id ? item.id : `item-${index}`;
        return <ListItem key={key} item={item} path={path} />;
      })}
    </ul>
  );
}
