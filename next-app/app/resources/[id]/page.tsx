import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: number };
}

const ResourceDetailPage = ({ params: { id } }: Props) => {
  if (id > 10) notFound();

  return <div>Resource {id} Detail Page</div>;
};

export default ResourceDetailPage;
