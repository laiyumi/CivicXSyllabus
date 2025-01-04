import { Metadata } from "next";
import prisma from "../../../prisma/client";

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  console.log("generating the meta data...");
  const resource = await prisma.post.findUnique({
    where: { id },
  });

  if (!resource) {
    throw new Error(`Resource with id ${id} not found`);
  }

  const metadata: Metadata = {
    title: resource.title,
    description: "Details of " + resource.title,
  };

  return metadata;
}
