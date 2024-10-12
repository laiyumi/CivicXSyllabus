import Image from "next/image";
import Link from "next/link";
import HeroSection from "./HeroSection";
import UseCaseCard from "./components/UseCaseCard/UseCaseCard";

export default function Home() {
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
