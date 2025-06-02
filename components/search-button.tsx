import { SearchIcon } from "lucide-react";
import Link from "next/link";

type SearchButtonProps = {
  searchUrl: string;
};

export default function SearchButton({ searchUrl }: SearchButtonProps) {
  return (
    searchUrl && (
      <Link href={searchUrl}>
        <SearchIcon />
      </Link>
    )
  );
}
