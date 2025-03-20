import { JSX } from "react";
import PageTitle from "./page-title";
import Subtitle from "./subtitle";

export default function PageTitleSubtitle({
  title,
  subtitle,
}: {
  title: JSX.Element | string;
  subtitle: JSX.Element | string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <PageTitle title={title} />
      <Subtitle subtitle={subtitle} />
    </div>
  );
}
