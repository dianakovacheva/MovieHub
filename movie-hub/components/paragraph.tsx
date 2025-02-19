export default function Paragraph({ text }) {
  return (
    <p className="text-base font-normal text-base/6 break-words tracking-normal text-justify whitespace-pre-line">
      {text}
    </p>
  );
}
