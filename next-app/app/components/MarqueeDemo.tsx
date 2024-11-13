"use client";

import Marquee from "@/components/ui/marquee";
import { Category, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReviewCard } from "./ReviewCard";

export default function MarqueeDemo() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/categories`,
        {
          next: { revalidate: 10 },
        }
      );
      const categoryData = await categoryResponse.json();
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const firstRow = categories.slice(0, categories.length / 2);
  const secondRow = categories.slice(categories.length / 2);

  const router = useRouter();

  const handleCategory = (category: Category) => {
    const query = category.name.replace(" ", "%20");
    console.log(`redirecting to : resources?category=${query}`);
    router.push(`/resources?category=${query}`);
  };

  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((category) => (
          <ReviewCard
            key={category.name}
            {...category}
            onClick={() => handleCategory(category)}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((category) => (
          <ReviewCard
            key={category.name}
            {...category}
            onClick={() => handleCategory(category)}
          />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
