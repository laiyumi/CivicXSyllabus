import React from "react";

const BuildMySyllabusPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl">Build my Syllabus</h2>
          <p>
            Create a syllabus, that could, at least in theory, be used to teach
            a course or workshop.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold  pb-6">
            Understand the Civic Landscape
          </h3>
          <img
            className="float-right w-1/3 pl-6 pb-6"
            src="/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg"
          ></img>
          <p className="pb-4">
            This part aims to facilitate learning and absorbing the nature of
            work involved in civic projects. Our curated resources span four key
            focus areas: civic research, civic data, civic design, and civic
            technology.
          </p>
          <ul
            role="list"
            className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
          >
            <li>
              <strong>
                If you already know what kind of syllabus you want to build
              </strong>
              , head to the resources to find materials that align with your
              topic. Don’t forget to use the filters to make your search more
              specific.
            </li>
            <li>
              <strong>
                If you’re unsure or haven’t decided on a topic yet
              </strong>
              , go to Before You Begin to learn more about our four key focus
              areas, or use the tags and filters in the resources to explore
              different domains or topics that interest you.
            </li>
          </ul>
          <p>You could also explore resources by categories: </p>
          <div>TODO</div>
        </div>
        <div className="divider"></div>
        <div>
          <h3 className="text-xl font-bold pb-6">
            Create, Cultivate, and Sustain Partnerships
          </h3>
          <div className="h-96 float-right w-1/3 pl-6 pb-6">
            <img
              className="object-cover h-full w-full"
              src="/josh-calabrese-Ev1XqeVL2wI-unsplash.jpg"
            ></img>
          </div>
          <p className="pb-4">
            By building strong partnerships, civic programs can leverage
            collective strengths, resources, and expertise to create more
            impactful and sustainable initiatives that truly benefit the
            community.
          </p>
          <p className="pb-4">
            Follow the strategies and tips in Build Partnerships to understand
            how fostering robust, lasting partnerships support the civic
            research, civic data, civic design, and civic technology work we do.
          </p>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-xl font-bold pb-6">
              Working Together to Get Something Done
            </h3>
            <p className="pb-4">
              The Get to Work offers a comprehensive framework for partnerships
              interested in learning how to execute civic projects effectively.
              It is structured around three main units:
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
            <h3 className="text-xl font-bold pb-6">
              You Are Not Alone: Access to Our Extensive Tools
            </h3>
            <p className="pb-4">
              Use tools filter in resources to support project development and
              scaling efforts. Tools are categorized as follows:
            </p>
          </div>
        </div>

        <div className="flex gap-6 w-full">
          <div className="card bg-slate-200 w-1/3 hover:bg-slate-300 cursor-pointer ">
            <div className="card-body">
              <p>Before You Begin</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card bg-slate-200 w-1/3 hover:bg-slate-300 cursor-pointer">
            <div className="card-body">
              <p>Build Parnetships</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="card bg-slate-200 w-1/3 hover:bg-slate-300 cursor-pointer">
            <div className="card-body">
              <p>Get to Work</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildMySyllabusPage;
