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
  const projectExecutionData = getToWork.projectExecution;

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-center font-normal">Get To Work</h1>
        </div>
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="divider text-xl pb-4">Project Well-being</h2>
            <div className="flex flex-col gap-8">
              {wellbeingData.map((section: Prop) => (
                <Accordion key={section.title} data={section} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="divider text-xl pb-4">Project Design</h2>
            <div className="flex flex-col gap-8">
              {designData.map((section: Prop) => (
                <Accordion key={section.title} data={section} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="divider text-xl pb-4">Project Execution</h2>
            <div className="flex flex-col gap-8">
              {projectExecutionData.map((section: Prop) => (
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
