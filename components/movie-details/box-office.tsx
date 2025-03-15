import InformationBlockSingle from "../informatio-block-single";
import HeaderSection from "./header-section";

export default function BoxOffice({ revenue }) {
  const sectionName: string = "Box office";
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <HeaderSection sectionName={sectionName} count={undefined} />
      <InformationBlockSingle
        title={"Revenue"}
        data={USDollar.format(revenue)}
      />
    </div>
  );
}
