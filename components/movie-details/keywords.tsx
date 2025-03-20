export default function Keywords({
  keywords,
}: {
  keywords: { id: number; name?: string }[];
}) {
  return keywords.length > 0 ? (
    <>
      <ul className="flex flex-wrap gap-2 mt-2">
        {keywords.map((keyword) => (
          <li key={keyword.id}>
            <button className="btn btn-xs">
              <div>{keyword.name}</div>
            </button>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <p> No keywords available. </p>
  );
}
