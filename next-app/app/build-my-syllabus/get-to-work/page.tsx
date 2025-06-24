import React from "react";
import Accordion from "../../components/Accordion";
import getToWork from "../../../data/get-to-work.json";
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

const GetToWorkPage = () => {
  const wellbeingData = getToWork.projectWellbeing;
  const designData = getToWork.projectDesign;
  const projectImplementationData = getToWork.projectImplementation;

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-center font-normal">Get To Work</h1>
        </div>
        <div>
          <p className="pb-4">
            Civic innovation projects are all different, but they will likely go
            through at least three phases of a project life cycle: well-being,
            design, and implementation. Here, we break each of these phases down
            into different units that are integral for that phase.
          </p>
          <div className="p-4">
            <h2 className="divider text-xl pb-4">Project Well-being</h2>
            <div className="flex flex-col gap-8">
              {wellbeingData.map((section: Prop) => (
                <Accordion key={section.title} data={section} />
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="divider text-xl pb-4">Project Design</h2>
            <div className="flex flex-col gap-8">
              {designData.map((section: Prop) => (
                <Accordion key={section.title} data={section} />
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="divider text-xl pb-4">Project Implementation</h2>
            <div className="flex flex-col gap-8">
              {projectImplementationData.map((section: Prop) => (
                <Accordion key={section.title} data={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Get to Work - Civic X Syllabus",
  description:
    "Guides partnerships through project well-being, design, and execution",
};

export default GetToWorkPage;
