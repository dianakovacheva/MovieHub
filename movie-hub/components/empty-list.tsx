export default function EmptyList({
  listTitle,
  actionParagraph,
  callToActionBtnText,
  buttonAction,
  className,
}) {
  return (
    <div className={className}>
      <h3 className="text-xl font-bold">{listTitle}</h3>
      <p className="text-base">{actionParagraph}</p>
      <button onClick={buttonAction} className="btn btn-active btn-primary">
        {callToActionBtnText}
      </button>
    </div>
  );
}
