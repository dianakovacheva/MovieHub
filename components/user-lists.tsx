"use client";

import { redirect } from "next/navigation";
import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import ListCard from "./list-card";

export default function UserLists({ userLists }) {
  const sectionName = "Lists";
  const listTitle = "No lists yet";
  const buttonText = "Create a list";
  const userListsCount: number = userLists.length;

  function redirectToCreateListPage() {
    redirect("/lists/create");
  }
  return (
    <>
      <HeaderSection sectionName={sectionName} count={userListsCount} />
      {userLists.length > 0 ? (
        <ListCard lists={userLists} />
      ) : (
        <EmptyList
          listTitle={listTitle}
          listParagraph={undefined}
          buttonText={buttonText}
          buttonAction={redirectToCreateListPage}
          className="flex flex-col items-center gap-2"
        />
      )}
    </>
  );
}
