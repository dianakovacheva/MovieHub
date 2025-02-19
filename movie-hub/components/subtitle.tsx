export default async function Subtitle({ data }) {
  return data ? (
    <div className="flex items-center gap-2 mt-2 font-normal text-base text-zinc-500 dark:text-[#c0bcbc]">
      <p>Known For {data}</p>
    </div>
  ) : (
    ""
  );
}
