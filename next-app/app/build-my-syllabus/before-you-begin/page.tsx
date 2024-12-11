import React from "react";

const BeforeYouBeginPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl">Before You Begin: Civic 101</h2>
        </div>
        <div>
          <p className="pb-4">
            In this part, we&apos;ll guide you through the four key focus areas:
            civic research, civic data, civic tech and civic design. You will
            learn what each area entails and explore example projects that
            illustrate their thinking and action components.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title text-lg font-medium">
              Civic Research 101
            </div>
            <div className="collapse-content">
              <h3 className="text-base font-bold pb-4">
                What is Civic Research?
              </h3>
              <p className="pb-4">
                Civic Research is the shaping of knowledge about a community by
                that community. It is both a process (participatory and
                action-oriented) and a product (the study of civic life) that is
                directly meaningful to those who partake in it. It informs how a
                community imagines and builds itself.
              </p>
              <h3 className="text-base font-bold pb-4">Selected Resources</h3>
              <ul
                role="list"
                className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
              >
                <li>
                  <span className="underline">Civic Research Agenda</span> is a
                  project in the City of Boston is an initiative by the Mayor’s
                  Office of New Urban Mechanics that invites community members
                  to collaborate on identifying and addressing local public
                  policy issues through participatory research and dialogue.
                </li>
              </ul>
              <button className="btn btn-xs btn-outline sm:btn-sm md:btn-md lg:btn-md">
                More Resources
              </button>
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title text-lg font-medium">
              Civic Data 101
            </div>
            <div className="collapse-content">
              <h3 className="text-base font-bold pb-4">What is Civic Data?</h3>
              <p className="pb-4">
                Civic Data refers to data that is collected, managed, and used
                to improve civic life and public services. This data can include
                information on public health, transportation, education, and any
                other aspect of community life.
              </p>
              <h3 className="text-base font-bold pb-4">Selected Resources</h3>
              <ul
                role="list"
                className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
              >
                <li>
                  <span className="underline">data.org</span>is accelerating the
                  power of data and AI to solve some of our greatest global
                  challenges. We think globally and work locally to build the
                  field of data for social impact.
                </li>
              </ul>
              <button className="btn btn-xs btn-outline sm:btn-sm md:btn-md lg:btn-md">
                More Reources
              </button>
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title text-lg font-medium">
              Civic Design 101
            </div>
            <div className="collapse-content">
              <h3 className="text-base font-bold pb-4">
                What is Civic Design?
              </h3>
              <p className="pb-4">
                Civic design refers to the practice of creating, understanding,
                and improving public spaces and services to benefit communities.
              </p>
              <h3 className="text-base font-bold pb-4">Selected Resources</h3>
              <ul
                role="list"
                className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
              >
                <li>
                  <span className="underline">Civic Design Library</span> is a
                  crowdsourced data set of civic design resources created by
                  global practitioners working at the intersection of design and
                  the public sector.
                </li>
              </ul>
              <button className="btn btn-xs btn-outline sm:btn-sm md:btn-md lg:btn-md">
                More Reources
              </button>
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <div className="collapse-title text-lg font-medium">
              Civic Technology 101
            </div>
            <div className="collapse-content">
              <h3 className="text-base font-bold pb-4">
                What is Civic Technology?
              </h3>
              <p className="pb-4">
                Civic Technology refers to the use of technology to enhance
                civic engagement, improve public services, and solve community
                problems. This can include digital tools and platforms that
                facilitate communication between residents and government,
                applications that provide access to public services, and
                technologies that enable data collection and analysis for better
                decision-making.
              </p>
              <h3 className="text-base font-bold pb-4">Selected Resources</h3>
              <ul
                role="list"
                className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
              >
                <li>
                  <span className="underline">Civic Tech Field Guide</span>
                  offers the world’s largest collection of projects using tech
                  for the common good.
                </li>
              </ul>
              <button className="btn btn-xs btn-outline sm:btn-sm md:btn-md lg:btn-md">
                More Reources
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeYouBeginPage;
