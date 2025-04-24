import { Search } from "lucide-react";
import SearchForm from "../../../search-form";
import MediaList from "../../../media-list";
import { Dispatch, SetStateAction } from "react";

type SearchMobileProps = {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  query: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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

export default function SearchMobile({
  searchType,
  setSearchType,
  query,
  handleChange,
  onKeyDown,
  searchResults,
}: SearchMobileProps) {
  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-ghost flex sm:hidden">
        <div className="indicator">
          <Search />
        </div>
      </div>
      <div tabIndex={0} className="dropdown-content z-1 mt-3 shadow pb-6">
        <SearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          query={query}
          handleChange={handleChange}
          onKeyDown={onKeyDown}
          style="sm:hidden flex"
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
    </div>
  );
}
