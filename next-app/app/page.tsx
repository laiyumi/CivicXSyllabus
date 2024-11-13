import { getServerSession } from "next-auth";
import HeroSection from "./HeroSection";
import { authOptions } from "./api/auth/authOptions";
import UseCaseCard from "./components/UseCaseCard/UseCaseCard";
import { Metadata } from "next";

export default async function Home() {
  // access session on the server
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  return (
    <main>
      <HeroSection />
      <div>
        <div>
          <UseCaseCard />
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Civic X Syllabus",
  description: "Homepage for Civic X Syllabus",
};
