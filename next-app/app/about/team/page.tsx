import Link from "next/link";
import React from "react";

const TeamPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl text-center font-normal">Our Team</h1>
        <div>
          <div className="grid grid-cols-3 bg-black mb-8 rounded-2xl">
            <figure className="col-span-1">
              <img
                src="https://i0.wp.com/staging-7c07-civicxsyllabus.wpcomstaging.com/wp-content/uploads/2022/07/kl-01web-retouched__1_-e1720649516749.jpeg?w=750&ssl=1"
                alt="The profile image of Kimberly D. Lucas, PhD"
                className="object-cover w-full h-full rounded-2xl"
              />
            </figure>
            <div className="col-span-2 p-8">
              <div className="flex justify-between pb-10">
                <h2 className="card-title text-white">
                  Kimberly D. Lucas, PhD
                </h2>
                <Link href="https://www.linkedin.com/in/kimberlydlucas/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <title>Kimberly&apos;s LinkedIn</title>
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </Link>
              </div>
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
        </div>

        <div className="grid grid-cols-3 bg-black mb-8 rounded-2xl">
          <div className="col-span-2 p-8">
            <div className="flex justify-between pb-10">
              <h2 className="card-title text-white">Elias Gbadamosi</h2>
              <Link href="https://www.linkedin.com/in/eliasgbadamosi/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <title>Elia&apos;s LinkedIn</title>
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </Link>
            </div>
            <p className="text-white">
              Elias works with cities, academic institutions, and local
              communities to foster inclusive partnerships – through
              communication and engagement – geared towards translating research
              into innovation to solve the most pressing challenges facing local
              communities across the United States of America.
            </p>
          </div>
          <figure className="col-span-1">
            <img
              src="https://staging-7c07-civicxsyllabus.wpcomstaging.com/elias-gbadamosi_headshot-2"
              alt="The profile image of Elias Gbadamosi"
              className="object-cover w-full h-full rounded-2xl"
            />
          </figure>
        </div>

        <div className="grid grid-cols-3 bg-black mb-8 rounded-2xl">
          <figure className="col-span-1">
            <img
              src="https://staging-7c07-civicxsyllabus.wpcomstaging.com/wp-content/uploads/2024/11/WechatIMG994.jpg"
              alt="The profile image of Yu Lai"
              className="object-cover w-full h-full rounded-2xl"
            />
          </figure>
          <div className="col-span-2 p-8">
            <div className="flex justify-between pb-10">
              <h2 className="card-title text-white">Yu Lai</h2>
              <Link href="https://www.linkedin.com/in/yu-lai/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <title>Yu&apos;s LinkedIn</title>
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </Link>
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
    </>
  );
};

export default TeamPage;
