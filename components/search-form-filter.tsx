import { Dispatch, SetStateAction } from "react";

type SearchFormFilterProps = {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
};

export default function SearchFormFilter({
  searchType,
  setSearchType,
}: SearchFormFilterProps) {
  return (
    <select
      id="search-options"
      className="bg-base-100 z-1 w-32 join-item p-2"
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      aria-label="Search category"
    >
      <option disabled={true} value="">
        Search by
      </option>
      <option value="multi">All</option>
      <option value="movie">Movie</option>
      <option value="person">Person</option>
    </select>
  );
}
