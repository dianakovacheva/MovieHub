"use client";

import { Pencil } from "lucide-react";
import { JSX } from "react";

type EditListButtonProps = {
  title: JSX.Element | string;
};

function editText(title: JSX.Element | string) {
  return title;
}

export default function EditListButton({ title }: EditListButtonProps) {
  return (
    <button className="flex items-center gap-2 btn btn-ghost rounded-full">
      <Pencil />
      <p className="text-zinc-500 dark:text-[#fff] font-bold">Edit</p>
    </button>
  );
}
