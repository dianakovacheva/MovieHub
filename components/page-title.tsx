import { JSX } from "react";

export default function PageTitle({ title }: { title: JSX.Element | string }) {
  return (
    title && (
      <h1 className="text-4xl md:text-5xl font-normal break-words">{title}</h1>
    )
  );
}
