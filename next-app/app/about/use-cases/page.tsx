import React from "react";
import useCasePersona from "../../../data/use-cases-persona.json";
import PersonaCard from "../../components/PersonaCard";

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
        <h2 className="text-2xl">Who We Serve</h2>
        <p>
          Civic X Syllabus provides users with a platform that offers easily
          understood, well-organized civic innovation resources and toolkits,
          including peer-reviewed articles, blog posts, web archives, case
          studies, and manuals that will help them launch their civic innovation
          goals to practical reality.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
          {data.map((persona: Prop) => (
            <PersonaCard key={persona.name} data={persona} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UseCasesPage;
