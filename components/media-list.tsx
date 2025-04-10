import convertDateToString from "../app/utils/convert-date-to-string";
import MediaListCard from "./media-list-card";

type MediaListProps = {
  data: {
    id: string | number;
    name?: string;
    title?: string;
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    release_date?: string;
    poster_path?: string;
    known_for_department?: string;
    profile_path?: string;
    media_type?: string;
  }[];
  path?: string;
  subtitle?: string;
  searchType?: string;
  buttons?: boolean;
  listStyle?: string;
};

export default function MediaList({
  data,
  path,
  subtitle,
  searchType,
  buttons,
  listStyle,
}: MediaListProps) {
  return (
    <ul className={listStyle ? listStyle : "list"}>
      {data &&
        data.map((item) => (
          <MediaListCard
            key={item.id}
            id={typeof item.id === "number" ? item.id.toString() : item.id}
            media={item.poster_path ? item.poster_path : item.profile_path}
            title={
              searchType == "multi"
                ? item.title
                  ? `${item.title} (movie)`
                  : `${item.name} (person)`
                : item.title
                ? item.title
                : item.name
            }
            subtitle={
              subtitle
                ? subtitle
                : item.known_for_department
                ? item.known_for_department
                : item.release_date
            }
            status={item.isPublic == true ? "Public" : "Private"}
            meta={
              item.updatedAt &&
              `Modified ${convertDateToString(item.updatedAt)}`
            }
            link={
              path
                ? `${path}/${item.id}`
                : searchType == "multi"
                ? item.media_type === "person" || item.known_for_department
                  ? `/person/${item.id}`
                  : `/movie/${item.id}`
                : `/${searchType}/${item.id}`
            }
            buttons={buttons}
          />
        ))}
    </ul>
  );
}
