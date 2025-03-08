import { Metadata } from "next";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">
          What is Civic X Syllabus?
        </h1>
        <div>
          <h2 className="text-xl pb-4 font-semibold">An Umbrella Term </h2>
          <img
            src="/logo_interpretation_resized.png"
            alt="site logo"
            className="w-96 h-auto float-end"
          />
          <p className="pb-4">
            ‘Civic X’ is an umbrella term that we have adopted to describe the
            body of the constantly evolving, debated, and debatable knowledge
            produced as part of civic research, data, technology, and design
            spaces.
          </p>

          <ul
            role="list"
            className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
          >
            <li>
              ‘Civic’ is the core principle that unites all resources collected
              in this space: folx who produce and/or use these resources are
              likely focused on creating something toward a civic or public
              good.
            </li>
            <li>
              The ‘X’ denotes any or all the different words that could follow
              ‘Civic.’ Our web developer Yu Lai aptly describes the ‘X’ as “an
              exponent of civic innovation, suggesting the many forms that civic
              innovations can take.” For us, the forms that civic innovation can
              take are civic technology, civic data, civic design, and civic
              research.
            </li>
            <li>
              And, a ‘syllabus’ is a tool used to organize resources for
              learning.
            </li>
          </ul>
          <h2 className="text-xl pb-4 font-semibold">
            Making Quality Civic Knowledge Accessible
          </h2>
          <div>
            <p className="pb-4">
              Civic X Syllabus makes thought leadership in the civic innovation
              space accessible by curating respected and high-quality civic
              innovation resources searchable by resource type and topic.
            </p>
            <p className="pb-4">
              We build and maintain ‘Civic X Syllabus’ with civic researchers,
              students, educators, civic/policy teams, and civic enthusiasts in
              mind. We are certainly not the ‘end all, be all’ of what is or is
              not essential in these spaces. Still, we are attempting to
              document resources that individuals in these spaces would agree
              are ‘canon’ and promote healthy dialogue and debate about issues
              and topics still in flux.
            </p>
            <p className="pb-4">
              {" "}
              Overall, Civic X Syllabus aspires to be a dynamic, inclusive, and
              evolving repository that educates and engenders critical
              conversations and collective growth within the ever-shifting
              landscape of civic innovation.
            </p>
          </div>
        </div>

        <h1 className="text-2xl text-center font-normal">Our Mission</h1>
        <p className="pb-4">
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
