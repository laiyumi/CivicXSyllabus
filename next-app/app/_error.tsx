// pages/_error.tsx

import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
      <p>
        {statusCode
          ? `A server error occurred: ${statusCode}`
          : "An unexpected error has occurred."}
      </p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
