import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl text-center font-normal">Terms of Use</h1>
          <p className="text-center">Last updated: April 30, 2025</p>
          <p>
            Welcome to{" "}
            <a
              href="https://www.civicxsyllabus.org"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.civicxsyllabus.org
            </a>{" "}
            (the &quot;Site&quot;), operated by Civic X Syllabus
            (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing
            or using this Site, you agree to these Terms of Use. Please read
            them carefully.
          </p>
          <h2 className="text-xl font-bold">Use of the Site</h2>
          <p>
            You agree to use the Site for lawful and educational purposes only.
            You may create an account to access certain features, either through
            email/password or Google Sign-In. You are responsible for
            maintaining the security of your login credentials and for all
            activity under your account.
          </p>
          <h2 className="text-xl font-bold">Intellectual Property</h2>
          <p>
            All original content published by Civic X Syllaubs—including site
            design, branding, and curated resources—is the property of Civic X
            Syllaubs and protected under applicable copyright laws.
          </p>
          <p>
            Linked or embedded materials from third-party websites (such as
            PDFs, articles, or media) remain the intellectual property of their
            respective owners. Civic X Syllaubs does not claim ownership of any
            third-party content.
          </p>
          <h2 className="text-xl font-bold">Third-Party Services</h2>
          <p>
            Civic X Syllaubs uses third-party services, including Google (e.g.,
            Google Sign-In and analytics), to provide and maintain the Site.
            Your use of those services is also subject to their respective terms
            and privacy policies.
          </p>
          <h2 className="text-xl font-bold">User-Generated Content</h2>
          <p>
            By submitting or saving content (e.g., creating lists or interacting
            with resources), you grant Civic X Syllaubs a limited license to use
            and display this content to operate and improve the Site. You may
            request deletion of your content and account at any time.
          </p>
          <h2 className="text-xl font-bold">Data and Disclaimer</h2>
          <p>
            We may receive general technical data (such as IP addresses or
            browser types) from third-party service providers to understand how
            the Site is used. This data is not collected by Civic X Syllaubs
            directly and is not linked to your identity by us.
          </p>
          <p>
            The content on this Site is provided for informational and
            educational purposes only. While we strive for accuracy, we make no
            guarantees about the completeness or reliability of any content,
            including third-party resources.
          </p>
          <h2 className="text-xl font-bold">Modifications</h2>
          <p>
            We may update our Terms of Use periodically. Any changes will be
            posted on this page with a new Effective Date. Your continued use of
            the Site constitutes acceptance of the revised terms.
          </p>
          <h2 className="text-xl font-bold">Contact</h2>
          <p>
            For questions or concerns regarding our Terms of Use, contact us at:{" "}
            <a
              href={`mailto:contact@civicxsyllabus.org?`}
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              contact@civicxsyllabus.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
