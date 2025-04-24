import Link from "next/link";
import HeaderSection from "./movie-details/header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import calculateAge from "../app/utils/calculate-age";
import InformationBlock from "./information-block";
import { PersonProps } from "../app/actions/person/definitions";

export default async function ActorInformationBlock({
  personData,
}: PersonProps) {
  const sectionName: string = "Personal details";
  // Gender
  const gender =
    personData.gender === 1
      ? "Female"
      : personData.gender === 2
      ? "Male"
      : "Non-binary / Other";

  // Death date
  const deathDate = personData.deathday?.toString() ?? "";

  // Calculate actors age
  const age =
    personData.birthday && calculateAge(personData.birthday, deathDate);

  return (
    <>
      <HeaderSection sectionName={sectionName} />

      {gender && (
        <InformationBlock blockName="Gender">{gender}</InformationBlock>
      )}

      {personData.birthday && age && (
        <InformationBlock blockName="Born">
          {deathDate
            ? personData.birthday
            : `${personData.birthday} (${age} years old)`}
        </InformationBlock>
      )}

      {deathDate && age && (
        <InformationBlock blockName="Died">{`${deathDate} (${age} years old)`}</InformationBlock>
      )}

      {personData.place_of_birth && (
        <InformationBlock blockName="Place of Birth">
          {personData.place_of_birth}
        </InformationBlock>
      )}

      {personData.homepage && typeof personData.homepage === "string" && (
        <InformationBlock blockName="Official site">
          <Link
            href={personData.homepage}
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
