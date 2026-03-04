"use client";

import { useState } from "react";

interface ExpandableTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string | string[];
}

export default function ExpandableText({ children, className, style, ...rest }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const isArray = Array.isArray(children);
  const paragraphs = isArray
    ? (children as string[]).map((p) => (typeof p === "string" ? p : String(p ?? "")))
    : String(children ?? "").split(/\r?\n/);
  const text = isArray ? (children as string[]).join("\n\n") : (typeof children === "string" ? children : String(children ?? ""));
  const hasMultiple = paragraphs.length >= 2;
  const firstParagraph = paragraphs[0];

  const rootClass = className ? `whitespace-pre-line ${className}` : "whitespace-pre-line";

  if (!hasMultiple) {
    return (
      <div className={rootClass} style={style} {...rest}>
        {text}
      </div>
    );
  }

  return (
    <div className={rootClass} style={style} {...rest}>
      {expanded ? text : firstParagraph}
      <div className="flex justify-start mt-3">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-xs font-medium underline cursor-pointer"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}
