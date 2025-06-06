import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateListButton() {
  return (
    <Link
      href={"/list/create"}
      className="btn btn-large md:btn-wide rounded-full bg-[#f5c518] hover:bg-[#e3b614] text-black pt-6 pb-6"
    >
      <Plus />
      <div className="flex flex-col items-start">
        <p className="text-base font-semibold">Create a new list</p>
        <p className="text-xs font-normal">List your movie picks.</p>
      </div>
    </Link>
  );
}
