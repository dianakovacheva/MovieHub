"use client";

import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

export default function CreateListButton() {
  function redirectToCreateListPage() {
    redirect("/create-list");
  }

  return (
    <button
      onClick={redirectToCreateListPage}
      className="btn btn-wide rounded-full bg-[#f5c518] hover:bg-[#e3b614] text-black pt-6 pb-6"
    >
      <Plus />
      <div className="flex flex-col items-start">
        <p className="text-base font-semibold">Create a new list</p>
        <p className="text-xs font-normal">List your movie picks.</p>
      </div>
    </button>
  );
}
