import SearchButton from "./search-button";

type SearchFormInputFieldProps = {
  query: string;
  searchUrl?: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchFormInputField({
  query,
  searchUrl,
  handleChange,
  onKeyDown,
}: SearchFormInputFieldProps) {
  return (
    <label htmlFor="search-input" className="input join-item flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Search"
        list="search-options"
        className="lg:w-[20vw] w-[25vw]"
      />

      {searchUrl && <SearchButton searchUrl={searchUrl} />}
    </label>
  );
}
