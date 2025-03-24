"use client";

import { redirect } from "next/navigation";
import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import ListCard from "./list-card";
import { ListsProps } from "../app/actions/list/definitions";

export default function UserLists({ lists }: ListsProps) {
  const sectionName = "Lists";
  const listTitle = "No lists yet";
  const buttonText = "Create a list";
  const userListsCount = lists?.length ?? 0;

  function redirectToCreateListPage() {
    redirect("/lists/create");
  }
  return (
    <>
      <HeaderSection sectionName={sectionName} count={userListsCount} />
      {lists.length > 0 ? (
        <ListCard lists={lists} />
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
