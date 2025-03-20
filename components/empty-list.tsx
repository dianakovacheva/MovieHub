import { EmptyListProps } from "../app/actions/list/definitions";

export default function EmptyList({
  listTitle,
  listParagraph,
  buttonText,
  buttonAction,
  className,
}: EmptyListProps) {
  return (
    <div className={className}>
      <h3 className="text-xl font-bold">{listTitle}</h3>
      <p className="text-base">{listParagraph}</p>
      <button
        onClick={buttonAction}
        className="btn bg-[#0e63be] hover:bg-[#216fc3] text-white shadow-none dark:shadow-sm rounded-full"
      >
        {buttonText}
      </button>
    </div>
  );
}
