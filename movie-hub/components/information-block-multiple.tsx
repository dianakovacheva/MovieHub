export default function InformationBlockMultiple({
  data,
  keyPlural,
  keySingular,
  children,
}) {
  return (
    <>
      <div className="divider"></div>
      <div className="flex flex-wrap gap-6 sm:gap-0 items-center">
        {data.length > 1 ? (
          <p className="text-base font-bold mr-4">{keyPlural}</p>
        ) : (
          <p className="text-base font-bold mr-4">{keySingular}</p>
        )}
        {children}
      </div>
    </>
  );
}
