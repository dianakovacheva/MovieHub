import { Dispatch, SetStateAction } from "react";
import SearchFormFilter from "./search-form-filter";
import SearchFormInputField from "./search-form-input-field";

type SearchFormProps = {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  query: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: string;
};

export default function SearchForm({
  searchType,
  setSearchType,
  query,
  handleChange,
  onKeyDown,
  style,
}: SearchFormProps) {
  const searchUrl = `/search/?q=${query
    .split(" ")
    .join("-")
    .toLowerCase()}&type=${searchType}`;

  return (
    <form className={style ?? style}>
      <SearchFormFilter searchType={searchType} setSearchType={setSearchType} />
      <SearchFormInputField
        query={query}
        handleChange={handleChange}
        onKeyDown={onKeyDown}
        searchUrl={searchUrl}
      />
    </form>
  );
}
