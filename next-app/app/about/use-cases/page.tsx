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
          <div className="card bg-black w-1/3">
            <h3 className=" text-white text-xl">Educator Persona</h3>
            <figure>
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title text-white	 ">Dr. Samantha Patel</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
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
                  university specializing in public administration. She seeks to
                  enrich her students&apos; learning experiences by providing
                  them with real-world examples of how civic technology can
                  drive social change.
                </p>
                <p>What are Dr. Patel&apos;s pain points? </p>
                <p className="pb-4">
                  The fragmented nature of available civic innovation resources
                  forces Dr. Patel to spend a considerable amount of time
                  piecing together content from various sources. This makes it
                  difficult for her to keep her course materials current and
                  relevant.
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-black w-1/3">
            <h3 className=" text-white text-xl">
              Civic and Policy Team Persona
            </h3>
            <figure>
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title text-white	 ">Phoenix Rivera</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </div>
              <div className="text-white">
                <p>Occupation:</p>
                <p className="pb-4"> Policy Analyst at a Government Agency </p>
                <p>Interests:</p>
                <p className="pb-4">
                  Data-driven policy-making, civic technology, public
                  administration
                </p>
                <p>Who is Phoenix Rivera? </p>
                <p className="pb-4">
                  Phoenix Rivera is a seasoned policy analyst working at a
                  government agency focused on urban planning and community
                  development. Phoenix is deeply invested in using technology to
                  make government services more efficient and accessible.
                </p>
                <p>What are Phoenix Rivera&apos;s pain points? </p>
                <p className="pb-4">
                  The fragmented nature of available resources makes it
                  difficult for Phoenix to pull together evidence-based insights
                  that their team can use to support their initiatives.
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-black w-1/3">
            <h3 className=" text-white text-xl">Civic Enthusiast Persona</h3>
            <figure>
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title text-white	 ">Jessica Williams</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
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
                  Jessica’s passion for civic innovation is driven by her belief
                  in the power of collective action to create meaningful change
                  at the local level.
                </p>
                <p>What are Jessica&apos;s pain points? </p>
                <p className="pb-4">
                  Jessica often struggles with finding the right resources to
                  turn her vision into actionable projects. She needs practical,
                  user-friendly resources that can help her translate her
                  advocacy goals into tangible projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseCasesPage;
