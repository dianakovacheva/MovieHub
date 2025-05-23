import { Metadata } from "next";
import PageTitleSubtitle from "../../../../components/page-title-subtitle";
import CreateListForm from "../../../../components/create-list-form";
import { auth } from "../../../../auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create list",
};

export default async function CreateList() {
  const title = "Create a new list";
  const subtitle = "List your movie picks.";
  const session = await auth();
  const userId = session?.user?.id ?? "";

  return (
    <>
      <PageTitleSubtitle title={title} subtitle={subtitle} />
      <Suspense>
        <CreateListForm userId={userId} />
      </Suspense>
    </>
  );
}
