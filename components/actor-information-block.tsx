import Link from "next/link";
import HeaderSection from "./movie-details/header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import calculateAge from "../app/utils/calculate-age";
import InformationBlock from "./information-block";

export default async function ActorInformationBlock({ actorData }) {
  const sectionName: string = "Personal details";
  let gender: string = "";
  const age: number = await calculateAge(
    actorData.birthday,
    actorData.deathday
  );

  if (actorData.gender == 1) {
    gender = "Female";
  } else {
    gender = "Male";
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} count={undefined} />

      {gender && (
        <InformationBlock blockName="Gender">{gender}</InformationBlock>
      )}

      {actorData.birthday && !actorData.deathday ? (
        <div>
          <InformationBlock blockName="Born">
            {`${actorData.birthday} (${age} years old)`}
          </InformationBlock>
        </div>
      ) : actorData.birthday ? (
        <div>
          <InformationBlock blockName="Born">
            {actorData.birthday}
          </InformationBlock>
        </div>
      ) : (
        ""
      )}

      {actorData.deathday && (
        <div>
          <InformationBlock blockName="Died">{`${actorData.deathday} (${age} years old)`}</InformationBlock>
        </div>
      )}

      {actorData.place_of_birth && (
        <InformationBlock blockName="Place of Birth">
          {actorData.place_of_birth}
        </InformationBlock>
      )}

      {actorData.homepage && (
        <InformationBlock blockName="Official site">
          <Link
            href={actorData.homepage}
            className="flex items-end gap-2"
            target="_blank"
            rel="nofollow"
          >
            Official site <SquareArrowOutUpRight size={16} strokeWidth={2} />
          </Link>
        </InformationBlock>
      )}
    </>
  );
}
