"use client";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchDesktop() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="join hidden md:flex">
      <select className="menu dropdown-content bg-base-100 z-1 w-32 p-2 shadow-sm join-item p-2">
        <option defaultValue="true">All</option>
        <option>Sci-fi</option>
        <option>Drama</option>
        <option>Action</option>
      </select>
      <label
        htmlFor="search"
        className="input join-item text-black text-base font-medium dark:text-white"
      >
        <input
          type="search"
          placeholder="Search"
          className="grow"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />

        <div className="opacity-50 hidden sm:flex hover:cursor-pointer">
          <div className="indicator">
            <Search />
          </div>
        </div>
      </label>
    </div>
  );
}
