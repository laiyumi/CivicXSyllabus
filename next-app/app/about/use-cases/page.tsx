import React from "react";
import useCasePersona from "../../../data/use-cases-persona.json";
import PersonaCard from "../../components/PersonaCard";
import { Metadata } from "next";

interface Prop {
  persona: string;
  imageUrl: string;
  altText: string;
  name: string;
  occupation: string;
  interests: string;
  intro: string;
  painpoints: string;
}

const UseCasesPage = () => {
  const data = useCasePersona;
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">Who We Serve</h1>
        <p>
          Civic X Syllabus provides users with a platform that offers easily
          understood, well-organized civic innovation resources and toolkits,
          including peer-reviewed articles, blog posts, web archives, case
          studies, and manuals that will help them launch their civic innovation
          goals to practical reality.
        </p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {data.map((persona: Prop) => (
            <PersonaCard key={persona.name} data={persona} />
          ))}
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Who we server - Civic X Syllabus",
  description: "Three personas that Civic X Syllabus serves",
};

export default UseCasesPage;
