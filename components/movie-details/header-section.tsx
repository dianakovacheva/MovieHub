export default function HeaderSection({ sectionName, data }) {
  return (
    <div className="pt-4">
      <h2 className="inline-flex gap-2 items-center text-4xl font-medium text-zinc-900 dark:text-white">
        {/* Border */}
        <div className="h-10 w-1 bg-[#f5c518] rounded-sm" />
        {sectionName}
        {data ? (
          data.length ? (
            <span className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
              {data.length}
            </span>
          ) : (
            <span className="text-sm font-normal text-zinc-500 dark:text-[#c0bcbc]">
              0
            </span>
          )
        ) : (
          ""
        )}
      </h2>
    </div>
  );
}
