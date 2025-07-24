"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Microlink from "@microlink/react";
import axios from "axios";
import { Blog } from "@prisma/client";

const BlogPage = () => {
  const [previewData, setPreviewData] = useState(null);

  const [blogPostsData, setBlogPostsData] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blogs");
      setBlogPostsData(res.data);
    };
    fetchBlogs();
  }, []);

  const featuredPost = blogPostsData.find((post) => post.featured);
  const regularPosts = blogPostsData.filter((post) => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-base-300">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-base-content">
              Our Blog
            </h1>
            <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
              Insights and thoughts on Civic Innovation
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-bold text-base-content">Featured</h2>
            </div>
            <div className="featured-microlink card bg-base-100 shadow-xl hover:-translate-y-2 transition ease-in-out delay-100 duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none w-full h-[250px]">
              <Microlink
                url={featuredPost.link}
                lazy
                direction="ltr"
                className="rounded-xl border-transparent border-0 min-w-full min-h-full"
              />
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section>
          <h2 className="text-xl font-bold mb-8 text-base-content">
            Latest Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <div key={post.id}>
                <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition ease-in-out delay-100 duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none w-fit md:w-auto">
                  <Microlink
                    url={post.link}
                    lazy
                    size="large"
                    className="rounded-xl border-transparent border-0"
                  />
                </div>{" "}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
