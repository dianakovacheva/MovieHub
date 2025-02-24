export default function Keywords({ keywords }) {
  return keywords.length > 0 ? (
    <div className="sm:w-[60vw]">
      <ul className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <li key={keyword.id}>
            <button className="btn btn-xs">
              <div>{keyword.name}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p> No keywords available. </p>
  );
}
