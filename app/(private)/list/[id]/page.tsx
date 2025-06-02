import { Metadata } from "next";
import ListHeader from "../../../../components/list-header";
import { generateListMetadata } from "../../../actions/list/list-data";
import SearchListItem from "../../../../components/list/search-list-item";
import { getUserSession } from "../../../actions/user/user-data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return await generateListMetadata(params.id);
}

export default async function ListDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await getUserSession();

  return id ? (
    <>
      <ListHeader id={id} />

      <div className="flex flex-col gap-4 mt-10 pl-1 pr-1">
        <p className="font-bold">Add a title to this list</p>
        {id && user && <SearchListItem listId={id} userId={user.id} />}
      </div>
    </>
  ) : (
    <p>This list is empty.</p>
  );
}
