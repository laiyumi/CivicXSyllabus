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

  // fetch categories with at least one resource
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await axios.get("/api/categories/notEmpty");
      const categoryData = await categoryResponse.data;
      setCategories(categoryData);
      console.log(categoryData);
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
    <div className="relative flex sm:h-[200px] xs:h-[150px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto">
        <Marquee pauseOnHover className="[--duration:80s]">
          {firstRow.map((category) => (
            <ReviewCard
              key={category.name}
              {...category}
              onClick={() =>
                setSelectedCategory(encodeURIComponent(category.name))
              }
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:80s]">
          {secondRow.map((category) => (
            <ReviewCard
              key={category.name}
              {...category}
              onClick={() =>
                setSelectedCategory(encodeURIComponent(category.name))
              }
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
