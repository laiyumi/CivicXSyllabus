import React from "react";

interface EmailLinkProps {
  email: string;
  subject: string;
  className: string;
}

const EmailLink = ({ email, subject, className }: EmailLinkProps) => {
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  return (
    <div>
      <p className={className}>
        <a href={mailto} target="_blank" rel="noopener noreferrer">
          {email}
        </a>
      </p>
    </div>
  );
};

export default EmailLink;
