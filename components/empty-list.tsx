import Link from "next/link";

type EmptyListProps = {
  listTitle: string;
  listParagraph?: string;
  buttonText?: string;
  buttonAction?: string;
  className?: string;
};

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
      {buttonText || buttonAction ? (
        <Link
          href={buttonAction!}
          className="btn bg-[#0e63be] hover:bg-[#216fc3] text-white shadow-none dark:shadow-sm rounded-full"
        >
          {buttonText}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
