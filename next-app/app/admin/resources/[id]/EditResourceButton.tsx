import Link from "next/link";
import React from "react";

const EditResourceButton = ({ resourceId }: { resourceId: string }) => {
  return (
    <Link
      href={`/admin/resources/${resourceId}/edit`}
      className="btn btn-primary "
    >
      Edit
    </Link>
  );
};

export default EditResourceButton;
