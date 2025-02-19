import { Metadata } from "next";
import Title from "../../../../components/movie-details/title";
import { getPersonDetails } from "../../../actions/person/person-data";
import Subtitle from "../../../../components/subtitle";

import Poster from "../../../../components/movie-details/poster";
import posterURL from "../../../actions/movie/image-API-URL";
import Paragraph from "../../../../components/paragraph";
import HeaderSection from "../../../../components/movie-details/header-section";

export const metadata: Metadata = {
  title: "Person Page",
};

export default async function PersonPage({ params }) {
  const { id } = await params;
  const personId: number = id.split("-")[0];
  const personData = await getPersonDetails(personId);
  const sectionName = "Biography";

  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex flex-col gap-2 md:gap-0">
        <Title name={personData.name} />
        <Subtitle data={personData.known_for_department} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-2">
        <Poster
          data={personData}
          posterURL={posterURL}
          path={personData.profile_path}
        />

        {/* Biography*/}
        <div className="flex flex-col gap-4">
          <HeaderSection sectionName={sectionName} data={0} />
          <Paragraph text={personData.biography} />
        </div>
      </div>
    </div>
  );
}
