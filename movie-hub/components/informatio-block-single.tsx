export default function InformationBlockSingle({ title, data }) {
  return (
    <div className="flex flex-col">
      <div className="divider"></div>
      <div className="flex items-center">
        <p className="text-base font-bold mr-2">{title}</p>
        <span>{data}</span>
      </div>
    </div>
  );
}
