export default function InformationBlockMultiple({
  data,
  keyPlural,
  keySingular,
  children,
}) {
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-wrap items-center">
        {data.length > 1 ? (
          <p className="text-base font-bold mr-2">{keyPlural}</p>
        ) : (
          <p className="text-base font-bold mr-2">{keySingular}</p>
        )}
        {children}
      </div>
    </>
  );
}
