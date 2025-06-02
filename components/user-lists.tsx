"use client";

import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import MediaList from "./media-list";
import Link from "next/link";

type UserListsProps = {
  data: {
    id: string;
    name?: string;
    isPublic?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
  }[];
  userId: string;
  style?: string;
};

export default function UserLists({ data, userId, style }: UserListsProps) {
  const sectionName = "Lists";
  const listTitle = "No lists yet";
  const buttonText = "Create a list";
  const userListsCount = data.length ?? 0;

  return (
    <>
      <Link href={`/user/${userId}/lists`}>
        <HeaderSection
          sectionName={sectionName}
          count={userListsCount}
          style={style}
        />
      </Link>
      {userListsCount > 0 ? (
        <div className="bg-zinc-50 dark:bg-[#121212] rounded-xl p-4 shadow-xs mb-10">
          <div className="font-semibold text-zinc-900 dark:text-white mb-1">
            {data && (
              <MediaList
                data={data}
                path="/list"
                subtitle={userListsCount.toString()}
                buttons={true}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyList
          listTitle={listTitle}
          buttonText={buttonText}
          buttonAction={"/list/create"}
          className="flex flex-col items-center gap-2 flex-wrap"
        />
      )}
    </>
  );
}
