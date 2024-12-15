import React from "react";

const UseCasesPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl">Use Cases</h2>
        <p>
          Civic X Syllabus provides users with a platform that offers easily
          understood, well-organized civic innovation resources and toolkits,
          including peer-reviewed articles, blog posts, web archives, case
          studies, and manuals that will help them launch their civic innovation
          goals to practical reality.
        </p>
        <div className="flex gap-8">
          <div className="w-1/3 flex flex-col gap-6">
            <h3 className="text-xl text-center">Educator</h3>
            <div className="card bg-black ">
              <figure>
                <img
                  src="/persona_samantha.svg"
                  alt="profile image"
                  className="w-1/2"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title text-white">Dr. Samantha Patel</h2>
                </div>
                <div className="text-white">
                  <p>Occupation:</p>
                  <p className="pb-4"> Professor of Public Administration </p>
                  <p>Interests:</p>
                  <p className="pb-4">
                    Civic engagement, curriculum development, public policy
                  </p>
                  <p>Who is Dr. Samantha Patel? </p>
                  <p className="pb-4">
                    Dr. Samantha Patel is an experienced professor at a leading
                    university specializing in public administration. She seeks
                    to enrich her students&apos; learning experiences by
                    providing them with real-world examples of how civic
                    technology can drive social change.
                  </p>
                  <p>What are Dr. Patel&apos;s pain points? </p>
                  <p className="pb-4">
                    The fragmented nature of available civic innovation
                    resources forces Dr. Patel to spend a considerable amount of
                    time piecing together content from various sources. This
                    makes it difficult for her to keep her course materials
                    current and relevant.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-6">
            <h3 className=" text-xl text-center">Civic and Policy Team</h3>
            <div className="card bg-black">
              <figure>
                <img
                  src="/persona_phoenix.svg"
                  alt="profile image"
                  className="w-1/2"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title text-white">Phoenix Rivera</h2>
                </div>
                <div className="text-white">
                  <p>Occupation:</p>
                  <p className="pb-4">
                    {" "}
                    Policy Analyst at a Government Agency{" "}
                  </p>
                  <p>Interests:</p>
                  <p className="pb-4">
                    Data-driven policy-making, civic technology, public
                    administration
                  </p>
                  <p>Who is Phoenix Rivera? </p>
                  <p className="pb-4">
                    Phoenix Rivera is a seasoned policy analyst working at a
                    government agency focused on urban planning and community
                    development. Phoenix is deeply invested in using technology
                    to make government services more efficient and accessible.
                  </p>
                  <p>What are Phoenix Rivera&apos;s pain points? </p>
                  <p className="pb-4">
                    The fragmented nature of available resources makes it
                    difficult for Phoenix to pull together evidence-based
                    insights that their team can use to support their
                    initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-center w-1/3">
            <h2 className=" text-xl">Civic Enthusiast</h2>
            <div className="card bg-black">
              <figure>
                <img
                  src="/persona_jessica.svg"
                  alt="profile image"
                  className="w-1/2"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title text-white">Jessica Williams</h2>
                </div>
                <div className="text-white">
                  <p>Occupation:</p>
                  <p className="pb-4">
                    {" "}
                    Community Organizer and Civic Volunteer{" "}
                  </p>
                  <p>Interests:</p>
                  <p className="pb-4">
                    Grassroots activism, social justice, civic engagement
                  </p>
                  <p>Who is Jessica Green? </p>
                  <p className="pb-4">
                    Jessica Green is a dedicated community organizer with a deep
                    commitment to social justice and grassroots activism.
                    Jessica’s passion for civic innovation is driven by her
                    belief in the power of collective action to create
                    meaningful change at the local level.
                  </p>
                  <p>What are Jessica&apos;s pain points? </p>
                  <p className="pb-4">
                    Jessica often struggles with finding the right resources to
                    turn her vision into actionable projects. She needs
                    practical, user-friendly resources that can help her
                    translate her advocacy goals into tangible projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseCasesPage;
