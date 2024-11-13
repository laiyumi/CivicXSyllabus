import { getServerSession } from "next-auth";
import HeroSection from "./HeroSection";
import { authOptions } from "./api/auth/authOptions";
import UseCaseCard from "./components/UseCaseCard/UseCaseCard";

export default async function Home() {
  // access session on the server
  const session = await getServerSession(authOptions);

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
