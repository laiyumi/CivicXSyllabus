import Image from "next/image";
import Link from "next/link";
import HeroSection from "./HeroSection";
import UseCaseCard from "./components/UseCaseCard/UseCaseCard";
import { getServerSession } from "next-auth";
import Pagination from "./components/Pagination";
import { authOptions } from "./api/auth/authOptions";

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
