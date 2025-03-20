import InformationBlock from "../information-block";
import HeaderSection from "./header-section";

export default function BoxOffice({ revenue }: { revenue: number }) {
  const sectionName: string = "Box office";
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <HeaderSection sectionName={sectionName} count={undefined} />
      <InformationBlock blockName="Revenue">
        {USDollar.format(revenue)}
      </InformationBlock>
    </div>
  );
}
