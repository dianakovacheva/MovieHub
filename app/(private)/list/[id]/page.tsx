import { Metadata } from "next";
import { getListById } from "../../../actions/list/list-data";
import CreateListButton from "../../../../components/create-list-button";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageTitleSubtitle from "../../../../components/page-title-subtitle";
import convertDateToString from "../../../utils/convert-date-to-string";
import { getUserById } from "../../../actions/user/user-data";

export const metadata: Metadata = {
  title: "List Details Page",
};

export default async function ListDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
  const subtitle = listOwner
    ? `by ${listOwner?.email}\n${listCreatedAt}\n${listUpdatedAt}`
    : "";

  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:items-end gap-4 justify-between">
        <PageTitleSubtitle title={title} subtitle={subtitle} />
        <Suspense>
          <CreateListButton />
        </Suspense>
      </div>
      {list && <p>{list.description}</p>}
    </>
  );
}
