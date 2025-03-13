import React from "react";
import Accordion from "../../components/Accordion";
import partnerships from "../../../data/partnerships.json";
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
            Because partnerships and collaboration are a common key factor of
            success for any civic project, we have curated resources that offer
            in-depth guidance on creating, cultivating, and sustaining
            partnerships to enhance collaboration, resource-sharing, and
            community engagement.
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
  title: "Build Partnerships - Civic X Syllabus",
  description:
    "Discover strategies for building partnerships to foster collaboration, share resources, and engage communities, with support from like-minded individuals and resources.",
};

export default BuildPartnershipsPage;
