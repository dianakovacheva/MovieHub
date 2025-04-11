import { Dispatch, SetStateAction } from "react";
import MediaList from "../../../media-list";
import SearchForm from "../../../search-form";

type SearchDesktopProps = {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  query: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  searchResults?: {
    id: string | number;
    name?: string;
    title?: string;
    release_date?: string;
    poster_path?: string;
    known_for_department?: string;
    profile_path?: string;
    media_type?: string;
  }[];
};

export default function SearchDesktop({
  searchType,
  setSearchType,
  query,
  handleChange,
  searchResults,
}: SearchDesktopProps) {
  return (
    <div className="dropdown">
      <SearchForm
        searchType={searchType}
        setSearchType={setSearchType}
        query={query}
        handleChange={handleChange}
        style="items-center join hidden sm:flex"
      />

      {searchResults && searchResults.length > 0 && (
        <MediaList
          data={searchResults}
          searchType={searchType}
          buttons={false}
          listStyle={
            "dropdown-content list absolute join-item z-1 join-item p-2 mt-4 max-h-[60vh] w-[100%] overflow-scroll bg-zinc-50 dark:bg-[#121212] rounded-box shadow-md flex gap-4"
          }
          cardStyle="list-row hover:bg-zinc-300 dark:hover:bg-zinc-700"
        />
      )}
    </div>
  );
}
