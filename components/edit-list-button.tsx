"use client";

import { Check, Pencil, X } from "lucide-react";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { updateListName } from "../app/actions/list/list-data";
import { useAlert } from "../app/utils/use-alert";
import PageTitle from "./page-title";

type EditListButtonProps = {
  listId: string;
  userId: string;
  name: string;
};

export default function EditListButton({
  listId,
  userId,
  name,
}: EditListButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(name);
  const [draftName, setDraftName] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showAlert } = useAlert();

  useEffect(() => {
    setDisplayName(name);
  }, [name]);

  const startEditing = () => {
    setDraftName(displayName);
    setError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftName(displayName);
    setError(null);
    setIsEditing(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateListName(listId, userId, draftName);

      if (result?.errors?.name?.[0]) {
        setError(result.errors.name[0]);
        return;
      }

      if (!result?.success) {
        setError("Failed to update list name.");
        return;
      }

      setDisplayName(draftName.trim());
      setIsEditing(false);
      setError(null);
      showAlert("alert-success", "List name updated.");
    });
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 min-w-0 flex-1"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            autoFocus
            disabled={isPending}
            maxLength={255}
            aria-label="List name"
            className="input input-bordered text-2xl md:text-3xl font-normal w-full max-w-xl"
          />
          <button
            type="submit"
            disabled={isPending || !draftName.trim()}
            className="btn btn-ghost btn-circle"
            aria-label="Save list name"
          >
            <Check />
          </button>
          <button
            type="button"
            onClick={cancelEditing}
            disabled={isPending}
            className="btn btn-ghost btn-circle"
            aria-label="Cancel editing"
          >
            <X />
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    );
  }

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <PageTitle title={displayName} />
      <button
        type="button"
        onClick={startEditing}
        className="flex items-center gap-2 btn btn-ghost rounded-full"
      >
        <Pencil />
        <p className="text-zinc-500 dark:text-[#fff] font-bold">Edit</p>
      </button>
    </div>
  );
}
