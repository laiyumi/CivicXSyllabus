import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Your Roadmap to Civic Innovation</h1>
      <h2>
        Explore a curated collection of resources and tools to build impactful
        projects for public interest.
      </h2>
      <Link href="/resources" className="btn btn-primary mt-4">
        Search
      </Link>
      <div>
        <div>
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
