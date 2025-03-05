import { Metadata } from "next";
import React from "react";
import Link from "next/link";

const BuildMySyllabusPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl text-center font-normal">Use Cases</h1>
        </div>
        <div>
          <h2 className="text-xl font-bold  pb-6">
            Understanding the Civic X Landscape
          </h2>
          <img
            className="float-right md:w-1/3 md:pl-6 md:pb-6 sm:pb-4"
            src="/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg"
            alt="A brainstorming or problem-solving board filled with sticky notes, each featuring handwritten ideas, placed in a brightly lit workspace."
          ></img>
          <p className="pb-4">
            We&apos;re curated resources that span our four key focus areas:
            civic research, civic data, civic tech, and civic design.
          </p>
          <ul
            role="list"
            className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
          >
            <li>
              <strong>
                If you already know what civic innovation topics you&apos;re
                interested
              </strong>
              , head to{" "}
              <Link
                href="/resources"
                className="font-medium border-b border-sky-600  hover:border-b-2 "
              >
                Resources
              </Link>{" "}
              to find materials that align with your topics. Don&apos;t forget
              to use the filters to make your search more specific.
            </li>
            <li>
              <strong>
                If you&apos;re unsure or haven&apos;t decided on a topic yet
              </strong>
              , go to{" "}
              <Link
                href="/build-my-syllabus/before-you-begin"
                className="font-medium border-b border-sky-600  hover:border-b-2 "
              >
                Before You Begin
              </Link>{" "}
              to learn more about our four key focus areas, or use the tags and
              filters in the resources to explore different domains or topics
              that interest you.
            </li>
          </ul>
          {/* <p>You could also explore resources by categories: </p>
          <div>
            <img
              src="/word-cloud.png"
              className="w-2/5"
              alt="word cloud of categories"
            ></img>
          </div> */}
        </div>
        <div className="divider"></div>
        <div>
          <h2 className="text-xl font-bold pb-6">
            Creating, Cultivating, and Sustaining Partnerships
          </h2>
          <div className="h-96 float-right md:w-1/3 md:pl-6 md:pb-6">
            <img
              className="object-cover h-full w-full"
              src="/josh-calabrese-Ev1XqeVL2wI-unsplash.jpg"
              alt="An aerial view of a rowing team paddling in unison."
            ></img>
          </div>
          <p className="pb-4">
            By building strong partnerships, civic projects can leverage
            collective strengths, resources, and expertise to create more
            meaningful and sustainable initiatives that truly benefit the
            community.
          </p>
          <p className="pb-4">
            Our curated strategies and tips in{" "}
            <Link
              href="/build-my-syllabus/build-partnerships"
              className="font-medium border-b border-sky-600  hover:border-b-2 "
            >
              Build Partnerships
            </Link>{" "}
            highlight how fostering robust, lasting partnerships support the
            civic innovation work we do.
          </p>
        </div>
        <div className="divider"></div>
        <div>
          <h2 className="text-xl font-bold pb-6">Getting Things Done</h2>
          <p className="pb-4">
            We’ve curated resources that support different phases of a project
            in{" "}
            <Link
              href="/build-my-syllabus/get-to-work"
              className="font-medium border-b border-sky-600  hover:border-b-2 "
            >
              Get to Work
            </Link>
            . These units provide your partnership with resources that support
            the “project basics” of project design, project implementation, and
            project sustainability.
          </p>
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Use Cases - Civic X Syllabus",
  description: "Learn how to use this site",
};

export default BuildMySyllabusPage;
