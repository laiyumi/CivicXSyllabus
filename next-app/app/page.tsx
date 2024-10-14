import Image from "next/image";
import Link from "next/link";
import HeroSection from "./HeroSection";
import UseCaseCard from "./components/UseCaseCard/UseCaseCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  // access session on the server
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <HeroSection />
      <div>
        <div>
          <UseCaseCard />
        </div>
      </div>
    </main>
  );
}
