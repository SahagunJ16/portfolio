"use client";

import { useState } from "react";
import type { Experience } from "@/types/portfolio";
import { Icon } from "@iconify/react";
import { ExpandableText } from "../ui";

interface ExperiencesProps {
  experiences: Experience[];
}

function PositionDescriptions({
  descriptions,
  expanded,
  onToggle,
}: {
  descriptions: string[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const [first, ...rest] = descriptions;
  const hasMore = rest.length > 0;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <p className="text-sm text-base-content/80">{first}</p>
      {hasMore && (
        <>
          {!expanded && (
            <div className="flex justify-start">
              <button
                type="button"
                onClick={onToggle}
                className="text-sm font-medium underline cursor-pointer"
              >
                Show More
              </button>
            </div>
          )}
          {expanded && (
            <>
              {rest.map((description, i) => (
                <p key={i} className="text-sm text-base-content/80">
                  {description}
                </p>
              ))}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={onToggle}
                  className="text-sm font-medium underline cursor-pointer"
                >
                  Show Less
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function Experiences({ experiences }: ExperiencesProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="mt-10 scroll-mt-14" id="experience">
      <h2 className="text-xl font-medium before:content-['>'] before:mr-1">Work Experience</h2>
      <div className="mt-6">
        <ol>
          {experiences.map((experience, expIndex) => (
            <li key={expIndex} className="flex items-start gap-2">
              <div>
                <h3 className="text-md font-semibold text-base-content">{experience.company}</h3>
                <p className="text-sm font-medium text-base-content/80 flex items-center gap-1 -mt-1">
                  <Icon icon="mdi:map-marker" height={12} width={12} />
                  {experience.location}
                </p>
                <ul className="mt-4">
                  {experience.positions.map((position, posIndex) => {
                    const key = `${expIndex}-${posIndex}`;
                    const isLast = posIndex === experience.positions.length - 1;
                    return (
                      <li
                        key={posIndex}
                        className={[
                          "flex items-start gap-3 ms-1.5",
                          "relative",
                          "before:absolute",
                          "before:-ml-px",
                          "before:h-full",
                          isLast ? "before:w-0" : "before:w-0.5",
                          "before:rounded-full",
                          "before:bg-base-content/50",
                        ].join(" ")}
                      >
                        <span className="size-1.5 -ms-0.75 shrink-0 rounded-full bg-base-content" />
                        <div className="-mt-2.5 mb-5">
                          <h4 className="text-base font-semibold text-base-content -mb-2">
                            {position.title}
                          </h4>
                          <time className="text-xs font-medium text-base-content/80">
                            {position.start} - {position.end}
                          </time>
                          <ExpandableText
                            className="text-sm text-base-content/80"
                          >
                            {position.descriptions}
                          </ExpandableText>
                          {/* <PositionDescriptions
                            descriptions={position.descriptions}
                            expanded={expandedKeys.has(key)}
                            onToggle={() => toggle(key)}
                          /> */}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
