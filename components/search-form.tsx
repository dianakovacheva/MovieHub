import { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";

type SearchFormProps = {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  query: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  style?: string;
};

export default function SearchForm({
  searchType,
  setSearchType,
  query,
  handleChange,
  style,
}: SearchFormProps) {
  return (
    <form className={style ?? style}>
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
      <label
        htmlFor="search-input"
        className="input join-item flex items-center"
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          list="search-options"
          className="lg:w-[20vw] w-[25vw]"
        />
        {/* <Search className="opacity-50 hidden sm:flex hover:cursor-pointer" /> */}
      </label>
    </form>
  );
}
