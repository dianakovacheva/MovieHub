"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
  amountOfWords?: number;
}

export default function Paragraph({
  text,
  amountOfWords = 240,
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  return (
    <p className="text-base font-normal text-base/6 break-words tracking-normal whitespace-pre-line">
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span className={`${!isExpanded && "hidden"}`}>{` ${endText}`}</span>
          <span
            className="text-violet-400 ml-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <button className="cursor-pointer font-bold text-[#f5c518]">
                Show less
              </button>
            ) : (
              <button className="cursor-pointer font-bold text-[#f5c518]">
                Show more
              </button>
            )}
          </span>
        </>
      )}
    </p>
  );
}
