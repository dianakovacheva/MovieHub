import { ActorBiographyProps } from "../app/actions/person/definitions";
import HeaderSection from "./movie-details/header-section";
import Paragraph from "./paragraph";

export default function ActorBiography({ biography }: ActorBiographyProps) {
  const sectionName: string = "Biography";

  return (
    <div className="flex flex-col gap-4 w-[80vw]">
      <HeaderSection sectionName={sectionName} />
      {biography && (
        <div>
          <Paragraph text={biography} />
        </div>
      )}
    </div>
  );
}
