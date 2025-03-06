import { CalendarDays } from "lucide-react";
import Poster from "./poster";
import PageTitleSubtitle from "./page-title-subtitle";

export default function DashboardHeader({ userEmail, profileCreatedAt }) {
  const title = userEmail;
  const subtitleData = (
    <span className="flex gap-2 font-bold">
      <CalendarDays /> Joined {profileCreatedAt}
    </span>
  );
  return (
    <div className="gap-10 flex flex-col items-center md:flex-row">
      <div>
        <Poster
          data={undefined}
          path={undefined}
          height={130}
          width={130}
          className="border-none dark:opacity-50"
          isMovie={false}
        />
      </div>
      <PageTitleSubtitle title={title} subtitle={subtitleData} />
    </div>
  );
}
