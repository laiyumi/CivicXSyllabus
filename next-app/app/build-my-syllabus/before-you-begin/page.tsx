import React from "react";
import Accordion from "../../components/Accordion";
import civic101 from "../../../data/civic101.json";
import { Metadata } from "next";

interface Prop {
  category: string;
  title: string;
  subtitle: string;
  description: string[];
  selectedResources: {
    name: string;
    summary: string;
  }[];
}

const BeforeYouBeginPage = () => {
  // filter out the target section
  const data = civic101.civic101;

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-center font-normal">
            Before You Begin: Civic 101
          </h1>
        </div>
        <div>
          <p className="pb-4">
            If you&apos;re not sure where to start–or just want a refresher on
            Civic X basics–we&apos;ve curated resources on our four key focus
            areas: civic research, civic data, civic tech, and civic design. The
            resources we share here are some of the foundational resources that
            are good starting points for those unfamiliar with or new to these
            focus areas.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {data.map((section: Prop) => (
            <Accordion key={section.title} data={section} />
          ))}
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Civic 101 - Civic X Syllabus",
  description:
    "Explore the four key focus areas: civic research, civic data, civic tech, and civic design through insights and example projects.",
};

export default BeforeYouBeginPage;
