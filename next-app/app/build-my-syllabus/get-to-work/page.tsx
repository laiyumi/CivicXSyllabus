import React from "react";
import Accordion from "../../components/Accordion";
import getToWork from "../../../data/get-to-work.json";

interface Prop {
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
          <h2 className="text-2xl">Get To Work</h2>
        </div>
        <div>
          <div className="divider text-xl pb-4">Project Well-being</div>

          <div className="flex flex-col gap-8">
            {wellbeingData.map((section: Prop) => (
              <Accordion key={section.title} data={section} />
            ))}
          </div>
        </div>
        <div>
          <div className="divider text-xl pb-4">Project Design</div>

          <div className="flex flex-col gap-8">
            {designData.map((section: Prop) => (
              <Accordion key={section.title} data={section} />
            ))}
          </div>
        </div>
        <div>
          <div className="divider text-xl pb-4">Project Execution</div>
          <div className="flex flex-col gap-8">
            {projectExecutionData.map((section: Prop) => (
              <Accordion key={section.title} data={section} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetToWorkPage;
