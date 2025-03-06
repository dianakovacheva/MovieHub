"use client";

import { useState } from "react";
import { createList } from "../app/actions/list/list-data";

export default function CreateListForm({ userId }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const result = await createList(formData, userId);

        if (!result) {
          setError("Invalid input. Please try again.");
        }
      }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <fieldset className="fieldset ml-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input validator text-base w-[50vw] flex-1"
            placeholder="Enter the name of your list"
          />
          <p className="fieldset-label text-xs">Enter a title</p>
        </fieldset>
        <fieldset className="fieldset ml-1">
          <input
            id="description"
            name="description"
            type="text"
            className="textarea validator text-base w-[50vw] flex-1"
            placeholder="Describe your list ..."
          />
          <p className="fieldset-label text-xs">max 10000 characters</p>
        </fieldset>
      </div>
      <fieldset className="fieldset ml-1 flex flex-col">
        <h4 className="text-lg font-bold mb-0.75">Privacy setting</h4>
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <input
              type="radio"
              name="public"
              className="radio"
              defaultChecked
            />
            <label className="text-base">Public</label>
          </div>
          <div className="flex gap-4 items-center">
            <input type="radio" name="private" className="radio" />
            <label className="text-base">Private</label>
          </div>
        </div>
      </fieldset>
      <div className="w-[20vw]">
        <button
          type="submit"
          className="btn rounded-full bg-[#0e63be] hover:bg-[#216fc3] text-white shadow-none dark:shadow-sm"
        >
          Create
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
