"use client";

import { redirect } from "next/navigation";
import EmptyList from "./empty-list";
import HeaderSection from "./movie-details/header-section";
import ListCard from "./list-card";

export default function UserLists({ userLists }) {
  const sectionName = "Lists";
  const listTitle = "No lists yet";
  const callToActionBtnText = "Create a list";

  function redirectToCreateListPage() {
    redirect("/create-list");
  }
  return (
    <>
      <HeaderSection sectionName={sectionName} data={userLists} />
      {userLists ? (
        <ListCard lists={userLists} />
      ) : (
        <EmptyList
          listTitle={listTitle}
          actionParagraph={undefined}
          callToActionBtnText={callToActionBtnText}
          className="flex flex-col items-center gap-2"
          buttonAction={redirectToCreateListPage}
        />
      )}
    </>
  );
}
