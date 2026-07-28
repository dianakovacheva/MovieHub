type NoResultsFoundProps = {
  searchQuery: string;
};

export default function NoResultsFound({ searchQuery }: NoResultsFoundProps) {
  return (
    searchQuery && (
      <p className="mt-5 italic text-[#c0bcbc]">
        No results found for{" "}
        <span className="font-bold">&quot;{searchQuery}&quot;</span>
      </p>
    )
  );
}
