import { Suspense } from "react";
import CreateListButton from "./create-list-button";
import PageTitleSubtitle from "./page-title-subtitle";
import { getListById } from "../app/actions/list/list-data";
import { notFound } from "next/navigation";
import { getUserById } from "../app/actions/user/user-data";
import convertDateToString from "../app/utils/convert-date-to-string";
import Link from "next/link";

type ListHeaderProps = {
  id: string;
};

export default async function ListHeader({ id }: ListHeaderProps) {
  const list = await getListById(id);

  if (!list) {
    notFound();
  }

  const title = list?.name ?? "";
  const listOwner = await getUserById(list?.userId);
  const listCreatedAt = list
    ? `Created ${convertDateToString(list!.createdAt)}`
    : "";
  const listUpdatedAt = list
    ? `Modified ${convertDateToString(list!.updatedAt)}`
    : "";

  const subtitle = listOwner ? (
    <ul className="flex flex-wrap gap-1">
      by
      <li>
        <Link
          href={`/user/${list.id}`}
          className="text-[#5799ef] hover:underline"
        >
          {listOwner?.email}
        </Link>
      </li>
      <li className="ml-4 mr-4 list-disc">{listCreatedAt}</li>
      <li className="list-disc">{listUpdatedAt}</li>
    </ul>
  ) : (
    ""
  );

  return (
    <div className="flex flex-col md:flex md:flex-row md:items-end gap-4 justify-between">
      <PageTitleSubtitle title={title} subtitle={subtitle} />
      <Suspense>
        <CreateListButton />
      </Suspense>
    </div>
  );
}
