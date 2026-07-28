import { JSX } from "react";
import PageTitle from "./page-title";
import Subtitle from "./subtitle";
import EditListButton from "./edit-list-button";

export default function PageTitleSubtitle({
  title,
  subtitle,
  showEdit = false,
  listId,
  userId,
}: {
  title: JSX.Element | string;
  subtitle: JSX.Element | string;
  showEdit?: boolean;
  listId?: string;
  userId?: string;
}) {
  const canEdit =
    showEdit && listId && userId && typeof title === "string";

  return (
    <div className="flex flex-col gap-1">
      {canEdit ? (
        <EditListButton listId={listId} userId={userId} name={title} />
      ) : (
        <PageTitle title={title} />
      )}
      <Subtitle subtitle={subtitle} />
    </div>
  );
}
