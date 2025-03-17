export default function InformationBlock({ blockName, children }) {
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-wrap items-center">
        <p className="text-base font-bold mr-2">{blockName}</p>
        {children}
      </div>
    </>
  );
}
