"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const DashboardSummary = () => {
  const [counts, setCounts] = useState({
    resources: 0,
    users: 0,
    sources: 0,
    categories: 0,
    tags: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resourcesRes, usersRes, sourcesRes, categoriesRes, tagsRes] =
          await Promise.all([
            fetch("/api/resources").then((res) => res.json()),
            fetch("/api/users").then((res) => res.json()),
            fetch("/api/sources").then((res) => res.json()),
            fetch("/api/categories").then((res) => res.json()),
            fetch("/api/tags").then((res) => res.json()),
          ]);

        setCounts({
          resources: resourcesRes.length,
          users: usersRes.length,
          sources: sourcesRes.length,
          categories: categoriesRes.length,
          tags: tagsRes.length,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containers = [
    { label: "Resources", value: counts.resources },
    { label: "Users", value: counts.users },
    { label: "Sources", value: counts.sources },
    { label: "Categories", value: counts.categories },
    { label: "Tags", value: counts.tags },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex justify-start pb-5">
          <h1 className="text-2xl text-center">Dashboard</h1>
        </div>
        <div className="stats md:stats-horizontal	 sm:stats-vertical shadow w-full ">
          {containers.map((container) => (
            <Link
              key={container.label}
              href={`/admin/${container.label.toLowerCase()}`}
              className="hover:bg-slate-200"
            >
              <div className="stat place-items-center gap-2">
                <h2 className="stat-title">{container.label}</h2>
                <div className="stat-value">{container.value}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
