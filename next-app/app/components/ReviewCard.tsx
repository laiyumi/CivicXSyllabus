"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { Category, Tag } from "@prisma/client";
import { useEffect, useState } from "react";

const ReviewCard = ({ name }: { name: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

export default function MarqueeDemo() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await fetch(
        "http://localhost:3000/api/categories",
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
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((category) => (
          <ReviewCard key={category.name} {...category} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((category) => (
          <ReviewCard key={category.name} {...category} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
