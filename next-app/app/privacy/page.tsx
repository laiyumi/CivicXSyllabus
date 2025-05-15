import React from "react";

const PrivacyPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl text-center font-normal">Privacy Policy</h1>
          <p className="text-center">Last updated: April 30, 2025</p>
          <p>
            At Civic X Syllabus(&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;), we respect and value your privacy. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you visit or interact with our website{" "}
            <a
              href="https://www.civicxsyllabus.org"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.civicxsyllabus.org
            </a>{" "}
            (the &quot;Site&quot;). By accessing or using the Site, you agree to
            the terms outlined in this Privacy Policy.
          </p>
          <h2 className="text-xl font-bold">Information We Collect</h2>
          <p>
            We collect minimal personal information to support the functionality
            of the Site. The types of personal data we may collect include:
          </p>
          <ul className="list-disc pl-8">
            <li className="py-2">
              <p>
                <strong>Account Information: </strong>When you create an account
                (either through email or Google Sign-In), we may collect your
                name, email address, and login credentials (such as your Gmail
                address and a password).
              </p>
            </li>
            <li className="py-2">
              <p>
                <strong>Google Sign-In: </strong>You may choose to sign in with
                Google without creating a separate CivicX account. In that case,
                we collect only the data necessary to enable login
                functionality.
              </p>
            </li>
            <li className="py-2">
              <p>
                <strong>Usage Data: </strong>We may collect non-personally
                identifiable information such as your IP address, browser type,
                interactions with the Site, resources accessed, and time spent
                on pages.
              </p>
            </li>
            <li className="py-2">
              <p>
                <strong>User-Generated Data: </strong>If you add resources to
                personal lists or interact with any other features, we may
                collect and store that content.
              </p>
            </li>
            <li className="py-2">
              <p>
                We do not collect sensitive data like government-issued IDs or
                financial information.
              </p>
            </li>
            <li className="py-2">
              <p>
                If you voluntarily provide information for a specific purpose,
                we may use that information for that purpose.
              </p>
            </li>
          </ul>
          <h2 className="text-xl font-bold">How We Use Your Information</h2>
          <p>
            We may use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-8">
            <li className="py-2">
              To provide and manage account features, such as saving and
              organizing resources into lists.
            </li>
            <li className="py-2">
              To allow you to sign in with Google or via an email/password
              system.
            </li>
            <li className="py-2">
              To improve site functionality, design, and performance based on
              usage trends.
            </li>
            <li className="py-2">
              To respond to user inquiries or support requests.
            </li>
            <li className="py-2">
              To fulfill any purpose you provided the information for.
            </li>
            <li className="py-2">
              To comply with legal obligations or requests from public
              authorities.
            </li>
            <li className="py-2">
              For any other purpose with your consent or if the information was
              provided for that specific reason.
            </li>
          </ul>
          <h2 className="text-xl font-bold">Data Retention</h2>
          <p>
            We retain personal data for as long as your account remains active
            or as necessary to provide you with services. You may request
            deletion of your account and all associated data at any time by
            contacting us at{" "}
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
          <h2 className="text-xl font-bold">
            Cookies and Tracking Technologies
          </h2>
          <p>
            We use essential cookies that are strictly necessary for the site to
            function for purposes such as maintaining your login session. We may
            use other analytics tools to understand how users interact with the
            site and improve content, design, and user experience.
          </p>
          <h2 className="text-xl font-bold">Children&quot;s Privacy </h2>
          <p>
            If you are under 13 years of age, then please do not register with
            or submit any personally identifiable information to CivicX. We do
            not knowingly collect personal information from children under 13
            without parental consent. If CivicX becomes aware that a child under
            13 has provided us with personal data, we will delete such data
            unless legally required to retain it. If you are the parent or legal
            guardian of a child under 13 who has become a registered CivicX
            user, then please contact us at{" "}
            <a
              href={`mailto:contact@civicxsyllabus.org?`}
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              contact@civicxsyllabus.org
            </a>{" "}
            to have that child&quot;s account terminated and information
            deleted.
          </p>
          <h2 className="text-xl font-bold">
            Disclosure of Personal Information
          </h2>
          <p>
            We do not sell or rent your personal information to third parties.
            We may share or disclose data in the following circumstances:
          </p>
          <ul className="list-disc pl-8">
            <li className="py-2">
              With service providers who support Site functionality (e.g.,
              hosting, analytics).
            </li>
            <li className="py-2">
              In aggregate, anonymized formats with partners for educational or
              research purposes.
            </li>
            <li className="py-2">
              When required to comply with legal obligations, court orders, or
              regulatory processes.
            </li>
            <li className="py-2">
              To enforce our Terms of Use or protect our rights and safety.
            </li>
            <li className="py-2">
              As needed in other legally permitted ways, consistent with the
              purposes for which you provided the data.
            </li>
          </ul>
          <h2 className="text-xl font-bold">International Users & GDPR</h2>
          <p>
            If you are located in the EU/EEA, you have the following rights
            under the General Data Protection Regulation (GDPR):
          </p>
          <ul className="list-disc pl-8">
            <li className="py-2">
              Right to access, correct, or delete your data.
            </li>
            <li className="py-2">Right to restrict or object to processing.</li>
            <li className="py-2">Right to data portability.</li>
            <li className="py-2">Right to withdraw consent at any time.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
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
          <h2 className="text-xl font-bold">Third-Party Links</h2>
          <p>
            The Site may link to third-party resources. These links are provided
            for educational purposes only. We are not responsible for the
            content or data practices of third-party websites.
          </p>
          <h2 className="text-xl font-bold">Updates to This Policy</h2>
          <p>
            We may revise this Privacy Policy periodically. Updates will be
            posted on this page with a new Effective Date. Your continued use of
            the Site constitutes acceptance of any updates.
          </p>
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p>
            If you have questions or wish to exercise your data rights, contact
            us at:{" "}
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

export default PrivacyPage;
