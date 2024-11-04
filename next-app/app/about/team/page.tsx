import React from "react";

const TeamPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl">Our Team</h2>
        <div>
          <div className="card card-side bg-black mb-8">
            <figure className="w-full">
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-white">Kimberly D. Lucas, PhD</h2>
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
              <p className="text-white">
                Kim is an academic-practitioner who is committed to
                community-driven civic research, innovation in city-university
                collaborations, and leveraging our collective expertise for the
                social good. Kim is presently a Professor of the Practice at
                Northeastern University’s School of Public Policy and Urban
                Affairs, and they previously served as Interim Executive
                Director at Metrolab Network and Director of Civic Research for
                the City of Boston. Kim’s research focuses on early childhood
                policy and the child care market, and their practical experience
                includes over a decade of innovation in community-engaged
                research.
              </p>
            </div>
          </div>
          <div className="card card-side bg-black mb-8">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title text-white	 ">Elias Gbadamosi</h2>
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
              <p className="text-white">
                Elias works with cities, academic institutions, and local
                communities to foster inclusive partnerships – through
                communication and engagement – geared towards translating
                research into innovation to solve the most pressing challenges
                facing local communities across the United States of America.
              </p>
            </div>
            <figure className="w-full">
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full h-full"
              />
            </figure>
          </div>
          <div className="card card-side bg-black mb-8">
            <figure className="w-full">
              <img
                src="https://placehold.co/600x400"
                alt="profile image"
                className="w-full h-full"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title text-white	 ">Yu Lai</h2>
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
              <p className="text-white">
                Yu is a graduate student in Information Systems at Northeastern
                University. Her background as a seasoned project manager in the
                education industry has provided her with valuable insights into
                developing user-centered technological solutions. Yu aspires to
                become an innovative software engineer who is passionate about
                writing impactful code. Her interests lie at the intersection of
                technology, human interaction, and design. Beyond her academic
                pursuits, Yu is a yoga enthusiast with RYT 200-Hour Yoga Teacher
                Certification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;