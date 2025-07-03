import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { listId: string };
}): Promise<Metadata> {
  const { listId } = params;

  try {
    // Fetch list data for metadata
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/lists/${listId}/shared`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        title: "List Not Found - CivicX Syllabus",
        description:
          "The requested list could not be found or is not available for public viewing.",
      };
    }

    const list = await response.json();

    return {
      title: `${list.name} - Shared List - CivicX Syllabus`,
      description: `Explore ${list.posts.length} curated resources in "${list.name}" shared by ${list.user.name || list.user.email}.`,
      openGraph: {
        title: `${list.name} - Shared List`,
        description: `Explore ${list.posts.length} curated resources in "${list.name}".`,
        type: "website",
        url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/shared/list/${listId}`,
      },
      twitter: {
        card: "summary_large_image",
        title: `${list.name} - Shared List`,
        description: `Explore ${list.posts.length} curated resources in "${list.name}".`,
      },
    };
  } catch (error) {
    return {
      title: "Shared List - CivicX Syllabus",
      description: "Explore curated resources shared by the CivicX community.",
    };
  }
}
