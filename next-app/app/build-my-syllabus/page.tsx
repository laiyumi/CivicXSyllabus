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
            Understand the Civic Landscape
          </h2>
          <img
            className="float-right md:w-1/3 md:pl-6 md:pb-6 sm:pb-4"
            src="/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg"
            alt="A brainstorming or problem-solving board filled with sticky notes, each featuring handwritten ideas, placed in a brightly lit workspace."
          ></img>
          <p className="pb-4">
            Our curated resources span four key focus areas: civic research,
            civic data, civic tech, and civic design.
          </p>
          <ul
            role="list"
            className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
          >
            <li>
              <strong>
                If you already know what kind of syllabus you want to build
              </strong>
              , head to{" "}
              <Link
                href="/resources"
                className="font-medium border-b border-sky-600  hover:border-b-2 "
              >
                Resources
              </Link>{" "}
              to find materials that align with your topic. Don’t forget to use
              the filters to make your search more specific.
            </li>
            <li>
              <strong>
                If you’re unsure or haven’t decided on a topic yet
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
            Create, Cultivate, and Sustain Partnerships
          </h2>
          <div className="h-96 float-right md:w-1/3 md:pl-6 md:pb-6">
            <img
              className="object-cover h-full w-full"
              src="/josh-calabrese-Ev1XqeVL2wI-unsplash.jpg"
              alt="An aerial view of a rowing team paddling in unison."
            ></img>
          </div>
          <p className="pb-4">
            By building strong partnerships, civic programs can leverage
            collective strengths, resources, and expertise to create more
            impactful and sustainable initiatives that truly benefit the
            community.
          </p>
          <p className="pb-4">
            Follow the strategies and tips in{" "}
            <Link
              href="/build-my-syllabus/build-partnerships"
              className="font-medium border-b border-sky-600  hover:border-b-2 "
            >
              Build Partnerships
            </Link>{" "}
            to understand how fostering robust, lasting partnerships support the
            civic research, civic data, civic design, and civic technology work
            we do.
          </p>
        </div>
        <div className="divider"></div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-16">
          <div>
            <h2 className="text-xl font-bold pb-6">
              Working Together to Get Something Done
            </h2>
            <p className="pb-4">
              The{" "}
              <Link
                href="/build-my-syllabus/get-to-work"
                className="font-medium border-b border-sky-600  hover:border-b-2 "
              >
                Get to Work
              </Link>{" "}
              offers a comprehensive framework for partnerships interested in
              learning how to execute civic projects effectively. It is
              structured around three main units:
            </p>
            <ul
              role="list"
              className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
            >
              <li>
                <strong>Project Well-Being</strong> focuses on the foundational
                principles of collaborative creation and maintaining team
                health, emphasizing the importance of working “with” communities
                rather than “for” them and addressing issues like burnout.
              </li>
              <li>
                <strong>Project Design</strong> covers the conceptualization and
                planning stages, defining success and failure metrics, and
                strategies for engaging stakeholders effectively.
              </li>
              <li>
                <strong>Project Execution</strong> delves into the practical
                aspects of carrying out a project, including asking the right
                questions, ensuring accessibility, effective communication,
                managing data (both big and thick), maintaining privacy and
                consent, and incorporating equity in analytics and digital
                services. It also addresses scaling successful projects.
              </li>
            </ul>
            <p className="pb-4">
              These units provide your partnership with a cohesive approach to
              developing impactful and sustainable civic projects.
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-bold pb-6">
              You Are Not Alone: Access to Our Extensive Tools
            </h2>
            <p className="pb-4">
              Use tools filter in resources to support project development and
              scaling efforts. Tools are categorized as follows:
            </p>
          </div>
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
