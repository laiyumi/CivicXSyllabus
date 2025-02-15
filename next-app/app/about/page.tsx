import { Metadata } from "next";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">
          What is Civic X Syllabus?
        </h1>
        <p>
          ‘Civic X’ is an umbrella term that we have adopted to describe the
          body of debated and debatable knowledge produced as part of civic
          research, civic data, civic tech, and civic design. ‘Civic’ is the
          core principle that unites all of the resources collected in this
          space: folx who produce and/or use these resources are likely focused
          on producing something toward a civic or public good. The ‘X’ denotes
          any or all of the different words that follow ‘Civic.’ And a
          ‘syllabus’ is a tool used to organize resources for the purposes of
          learning.
        </p>
        <h2 className="text-2xl">Our Mission</h2>
        <p>
          ‘Civic X Syllabus’ is a play on ‘Civic’ and the way people do
          collaborations using ‘X’ as a conjunction. Ha! 😁 All in all, ‘Civic X
          Syllabus’ seeks to democratize thought leadership in the civic
          innovation space by curating respected and high-quality civic
          innovation resources searchable by resource type and topic. We build
          and maintain ‘Civic X Syllabus’ with civic researchers, students,
          educators, civic/policy teams, and civic enthusiasts in mind.
        </p>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "About Us - Civic X Syllabus",
  description: "Learn about Civic X Syllabus",
};

export default AboutPage;
