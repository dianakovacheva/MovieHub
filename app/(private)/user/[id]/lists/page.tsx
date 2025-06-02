import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import PageTitleSubtitle from "../../../../../components/page-title-subtitle";
import { getUserSession } from "../../../../actions/user/user-data";
import { getUserLists } from "../../../../actions/list/list-data";
import UserLists from "../../../../../components/user-lists";
import Subtitle from "../../../../../components/subtitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Lists",
};

export default async function Lists() {
  const user = await getUserSession();
  const userLists = user && (await getUserLists(user?.id));

  if (!userLists) {
    notFound();
  }

  const title = "Your Lists";
  const subtitle = user ? (
    <span className="flex gap-1">
      by
      <Link
        href={`/user/${user.id}`}
        className="text-[#5799ef] hover:underline"
      >
        {user?.email}
      </Link>
    </span>
  ) : (
    ""
  );
  const listsCount = userLists.length;

  return (
    <Suspense>
      <>
        <PageTitleSubtitle title={title} subtitle={subtitle} />
        <Subtitle subtitle="A collection of lists you've created on MovieHub" />

        <div>
          <Subtitle
            subtitle={
              listsCount > 1 || listsCount == 0
                ? `${listsCount} lists`
                : `${listsCount} list`
            }
          />
        </div>
        <UserLists data={userLists} userId={user.id} style="hidden" />
      </>
    </Suspense>
  );
}
