import { JSX } from "react";
import PageTitle from "./page-title";
import Subtitle from "./subtitle";
import EditListButton from "./edit-list-button";

export default function PageTitleSubtitle({
  title,
  subtitle,
}: {
  title: JSX.Element | string;
  subtitle: JSX.Element | string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3">
        <PageTitle title={title} />

        <div className="flex justify-end gap-10">
          <EditListButton title={title} />
        </div>
      </div>
      <Subtitle subtitle={subtitle} />
    </div>
  );
}
