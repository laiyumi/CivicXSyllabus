"use client";

import Marquee from "@/components/ui/marquee";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";

export default function MarqueeDemo() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories");
      const categoryData = await categoryResponse.data;
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const firstRow = categories.slice(0, categories.length / 2);
  const secondRow = categories.slice(categories.length / 2);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!selectedCategory) return;
    const queryString = selectedCategory.replace(" ", "%20");
    if (pathname !== `/resources?category=${queryString}`) {
      console.log("test");
      router.replace(`/resources?category=${queryString}`);
    }
  }, [selectedCategory, pathname, router]);

  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((category) => (
          <ReviewCard
            key={category.name}
            {...category}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((category) => (
          <ReviewCard
            key={category.name}
            {...category}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </Marquee>
    </div>
  );
}
