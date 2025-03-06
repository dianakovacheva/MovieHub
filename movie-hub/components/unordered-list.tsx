export default function UnorderedList({ data }) {
  return (
    <ul className="flex flex-wrap gap-6">
      {data.map((item) => (
        <li key={item.id} className="[&:nth-child(n+2)]:list-disc">
          {item.name}
        </li>
      ))}
    </ul>
  );
}
