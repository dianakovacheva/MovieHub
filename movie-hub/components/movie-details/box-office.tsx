import HeaderSection from "./header-section";

export default function BoxOffice({ revenue }) {
  const sectionName = "Box office";
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!revenue || revenue === 0) {
    return (
      <>
        <HeaderSection sectionName={sectionName} data={0} />
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span> No revenue data available. </span>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderSection sectionName={sectionName} data={0} />
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold mr-2">Revenue</p>
        <span>{USDollar.format(revenue)}</span>
      </div>
    </>
  );
}
