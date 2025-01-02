import React from "react";
import Accordion from "../../components/Accordion";
import partnerships from "../../../data/partnerships.json";

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

const BuildPartnershipsPage = () => {
  const data = partnerships.partnerships;

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-center font-normal">
            Build Partnerships
          </h1>
        </div>
        <div>
          <p className="pb-4">
            This part offers an in-depth guide on creating, cultivating, and
            sustaining partnerships to enhance collaboration, resource-sharing,
            and community engagement. These units demonstrate that you are not
            alone—many like-minded individuals and resources are available to
            assist you in launching your syllabus.
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

export default BuildPartnershipsPage;
