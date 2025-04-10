"use client";

import { redirect } from "next/navigation";
import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MediaList from "./media-list";

type UserListsProps = {
  data: {
    id: string;
    name?: string;
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
  }[];
};

export default function UserLists({ data }: UserListsProps) {
  const sectionName = "Lists";
  const listTitle = "No lists yet";
  const buttonText = "Create a list";
  const userListsCount = data.length ?? 0;

  function redirectToCreateListPage() {
    redirect("/lists/create");
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} count={userListsCount} />
      {userListsCount > 0 ? (
        <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4 shadow-xs mb-10">
          <div className="font-semibold text-zinc-900 dark:text-white mb-1">
            {data && (
              <MediaList
                data={data}
                path="/lists"
                subtitle={userListsCount.toString()}
                buttons={true}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyList
          listTitle={listTitle}
          listParagraph={undefined}
          buttonText={buttonText}
          buttonAction={redirectToCreateListPage}
          className="flex flex-col items-center gap-2 flex-wrap"
        />
      )}
    </>
  );
}
