"use client";

import React, { useState, useRef, useEffect } from "react";
import SelectedResource from "./SelectedResource";
import Link from "next/link";

interface AccordionProps {
  data: {
    category: string;
    title: string;
    subtitle: string;
    description: string[];
    selectedResources: Resource[];
  };
}

interface Resource {
  name: string;
  summary: string;
}

const Accordion = ({ data }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="w-full  bg-gray-100 rounded-2xl">
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${data.title}`}
      >
        <h2 className="text-lg font-medium">{data.title}</h2>
        <img
          src={isOpen ? "/remove.svg" : "/add.svg"}
          alt={isOpen ? "Collapse section" : "Expand section"}
          className="transform transition-transform duration-300"
        />
      </button>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out rounded-2xl"
        style={{ maxHeight }}
      >
        <div className="p-4 bg-gray-100 flex flex-col gap-4 justify-center items-center">
          <div>
            <h3 className="text-base font-bold pb-2">{data.subtitle}</h3>
            {data.description.map((paragraph, index) => (
              <p key={index} className="pb-2">
                {paragraph}
              </p>
            ))}
            <h3 className="text-base font-bold pb-2">Selected Resources</h3>
            <ul
              role="list"
              className="list-disc pl-6 space-y-3 pb-4 marker:text-gray-400"
            >
              {data.selectedResources.map((resource: Resource) => (
                <SelectedResource key={resource.name} resource={resource} />
              ))}
            </ul>
          </div>
          <Link
            href={`/resources?category=${encodeURIComponent(data.category)}`}
            className="btn btn-primary btn-sm btn-outline"
          >
            View More in {data.category}{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
