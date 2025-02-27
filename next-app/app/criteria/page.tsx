import React from "react";

const CriteriaPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl text-center font-normal">
            Civic X Syllabus Submission Criteria
          </h1>
          <h2 className="text-xl text-center">Purpose</h2>
          <p>
            The purpose of the Civic X Syllabus submission criteria is twofold:{" "}
            (1) to which resources to include or exclude from the platform, and
            (2) to inform prospective submitters about the types and quality of
            contributions we seek.
          </p>
          <h2 className="text-xl text-center">Criteria Rubric</h2>
          <div className="overflow-x-auto">
            <table className="table table-md">
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Excellent Fit</th>
                  <th>Good Fit</th>
                  <th>Unfit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Subject Alignment</td>
                  <td>
                    Content addresses the needs of two or more key audiences,
                    such as civic professionals, policymakers, public policy
                    professionals, students, professors, or civic innovation
                    enthusiasts.
                  </td>
                  <td>
                    Content addresses the needs of one key audience, with some
                    relevance to others.
                  </td>
                  <td>
                    Content fails to address the needs of any key audience or
                    lacks clear applicability.
                  </td>
                </tr>
                <tr>
                  <td>Timeliness -or- Timelessness</td>
                  <td>
                    Content is timely, addressing developments or issues within
                    the last two years, or includes enduring insights that
                    maintain long-term relevance.
                  </td>
                  <td>
                    Content is somewhat timely, addressing issues from the past
                    3 to 5 years, with some enduring relevance.
                  </td>
                  <td>
                    Content is outdated (older than five years without timeless
                    applicability) or overly specific to a past moment.
                  </td>
                </tr>
                <tr>
                  <td>Legitimacy</td>
                  <td>
                    Content is sourced from credible and verifiable
                    references/sources.
                  </td>
                  <td>Content is from a somewhat verifiable source.</td>
                  <td>Content is from an unreliable, unverifiable source.</td>
                </tr>
                <tr>
                  <td>Accessibility</td>
                  <td>
                    Content is visually appealing, clean, and well-organized,
                    with an intuitive layout, clear structure, and minimum
                    technical jargon that enhances user engagement and
                    navigation.
                  </td>
                  <td>
                    Content is accessible with some effort, such as minor
                    formatting or language challenges - it is clear and
                    reasonably well-organized but could improve in visual appeal
                    and/or usability.
                  </td>
                  <td>
                    The design is cluttered, difficult to navigate, or visually
                    unappealing, hindering the user&apos;s ability to engage
                    with the content.
                  </td>
                </tr>
                <tr>
                  <td>Openness</td>
                  <td>
                    Content is open access, not hidden behind paywalls, and
                    requires no signup.
                  </td>
                  <td>
                    Content is hidden behind a paywall but has a free trial
                    option or requires a free option.
                  </td>
                  <td>
                    Content is not open access. It is hidden behind a paywall
                    and does not offer a free trial option.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaPage;
