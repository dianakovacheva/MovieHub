export default function HeaderSection({ sectionName, data }) {
  return (
    <div className="mb-4">
      <h2 className="inline-flex gap-2 items-center mb-4 text-4xl font-medium text-zinc-900 dark:text-white">
        <div className="h-10 w-1 bg-[#f5c518] rounded-sm" />
        {sectionName}
        {data ? (
          <span className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
            {data.length}
          </span>
        ) : (
          ""
        )}
      </h2>
    </div>
  );
}
