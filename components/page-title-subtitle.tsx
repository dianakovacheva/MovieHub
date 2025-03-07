import PageTitle from "./page-title";
import Subtitle from "./subtitle";

export default function PageTitleSubtitle({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <PageTitle title={title} />
      <Subtitle subtitle={subtitle} />
    </div>
  );
}
