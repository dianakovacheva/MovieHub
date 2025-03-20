import { JSX } from "react";

export default function PageTitle({ title }: { title: JSX.Element | string }) {
  return <h1 className="text-5xl font-normal break-words">{title}</h1>;
}
