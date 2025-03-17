import { Metadata } from "next";
import { getListById } from "../../../actions/list/list-data";
import { getUserById } from "../../../actions/user/user-data";
import convertDateToString from "../../../utils/convert-date-to-string";
import PageTitleSubtitle from "../../../../components/page-title-subtitle";
import CreateListButton from "../../../../components/create-list-button";

export const metadata: Metadata = {
  title: "List Details Page",
};

interface ListDetailsProps {
  params: { id: string };
}

export default async function ListDetails({ params }: ListDetailsProps) {
  const { id } = params;
  const list = await getListById(id);
  const title = list?.name;
  const listOwner = await getUserById(list?.userId);

  const listCreatedAt = `Created ${convertDateToString(list!.createdAt)}`;
  const listUpdatedAt = `Modified ${convertDateToString(list!.updatedAt)}`;
  const subtitle = `by ${listOwner?.email} ${listCreatedAt} ${listUpdatedAt}`;

  return (
    <>
      <div className="flex justify-between items-end">
        <PageTitleSubtitle title={title} subtitle={subtitle} />
        <CreateListButton />
      </div>
      <p>{list?.description}</p>
    </>
  );
}
