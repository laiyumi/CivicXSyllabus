"use client";

import React, { useState, useRef, useEffect } from "react";
import SelectedResource from "./SelectedResource";
import Link from "next/link";

interface AccordionProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
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
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{data.title}</h3>
        <span className="transform transition-transform  duration-300">
          {isOpen ? <img src="/remove.svg" /> : <img src="/add.svg" />}
        </span>
      </div>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        <div className="p-4  bg-gray-100">
          <h3 className="text-base font-bold pb-2">{data.subtitle}</h3>
          <p className="pb-4">{data.description}</p>
          <h3 className="text-base font-bold pb-2">Selected Resources</h3>
          <ul
            role="list"
            className="list-disc pl-6 space-y-3 pb-4 marker:text-gray-400"
          >
            {data.selectedResources.map((resource: Resource) => (
              <SelectedResource key={resource.name} resource={resource} />
            ))}
          </ul>
          <Link
            href="/resources"
            className="btn btn-primary btn-sm btn-outline"
          >
            More Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
