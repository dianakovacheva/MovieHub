import Link from "next/link";
import InformationBlockSingle from "./informatio-block-single";
import HeaderSection from "./movie-details/header-section";
import { SquareArrowOutUpRight } from "lucide-react";
import calculateAge from "../app/utils/calculate-age";

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

      {gender ? <InformationBlockSingle title={"Gender"} data={gender} /> : ""}

      {actorData.birthday && !actorData.deathday ? (
        <div>
          <InformationBlockSingle
            title={"Born"}
            data={`${actorData.birthday} (${age} years old)`}
          />
        </div>
      ) : actorData.birthday ? (
        <div>
          <InformationBlockSingle title={"Born"} data={actorData.birthday} />
        </div>
      ) : (
        ""
      )}

      {actorData.deathday ? (
        <div>
          <InformationBlockSingle
            title={"Died"}
            data={`${actorData.deathday} (${age} years old)`}
          />
        </div>
      ) : (
        ""
      )}

      {actorData.place_of_birth ? (
        <InformationBlockSingle
          title={"Place of Birth"}
          data={actorData.place_of_birth}
        />
      ) : (
        ""
      )}

      {actorData.homepage ? (
        <InformationBlockSingle
          title={"Official site"}
          data={
            <Link
              href={actorData.homepage}
              className="flex items-end gap-2"
              target="_blank"
              rel="nofollow"
            >
              Official site <SquareArrowOutUpRight size={16} strokeWidth={2} />
            </Link>
          }
        />
      ) : (
        ""
      )}
    </>
  );
}
