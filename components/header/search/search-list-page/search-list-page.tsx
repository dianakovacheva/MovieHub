import MediaList from "../../../media-list";
import SearchFormInputField from "../../../search-form-input-field";

type SearchListPageProps = {
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

export default function SearchListPage({
  query,
  handleChange,
  onKeyDown,
  searchResults,
}: SearchListPageProps) {
  return (
    <>
      <SearchFormInputField
        query={query}
        handleChange={handleChange}
        onKeyDown={onKeyDown}
      />

      {searchResults && searchResults.length > 0 && (
        <MediaList
          data={searchResults}
          buttons={false}
          listStyle={
            "dropdown-content list absolute join-item z-1 join-item p-2 mt-4 max-h-[60vh] w-[100%] overflow-scroll bg-zinc-50 dark:bg-[#121212] rounded-box shadow-md flex gap-4"
          }
          cardStyle="list-row hover:bg-zinc-300 dark:hover:bg-zinc-700"
        />
      )}
    </>
  );
}
