"use client";

import React, { useEffect, useState } from "react";
import prisma from "../../../../prisma/client";
import { set, useForm } from "react-hook-form";
import type { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TagProps {
  id: string;
  name: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

interface NewResourceFormInputs {
  title: string;
  excerpt: string;
  content: string;
  link: string;
  imageUrl: string;
  source: string;
  categories: string[];
  tags: string[];
}

const NewResourceForm = () => {
  const { register, handleSubmit } = useForm<NewResourceFormInputs>();
  const router = useRouter();

  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:3000/api/tags", {
        next: { revalidate: 10 },
      });
      const tags = await response.json();
      setTags(tags);
    };

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/api/categories", {
        next: { revalidate: 10 },
      });
      const categories = await response.json();
      setCategories(categories);
    };

    fetchTags();
    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("http://localhost:3000/api/resources", data);
        router.push("http://localhost:3000/resources");
      })}
    >
      <div className="flex flex-col justify-center pb-12">
        <div className="flex justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Creating new Resource
          </h2>
          <button className="btn btn-primary">Save</button>
        </div>

        <div className="grid grid-cols-2 gap-16">
          <div className="justify-self-center w-full flex flex-col gap-6">
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Title</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("title")}
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Source</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("source")}
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Excerpt</span>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Please limit to 30 words"
                {...register("excerpt")}
              ></textarea>
            </label>
            <label className="form-control w-full  flex gap-2">
              <span className="text-m">Link</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("link")}
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Content</span>
              <textarea
                className="textarea textarea-bordered h-36"
                placeholder="Please limit to 200 words"
                {...register("content")}
              ></textarea>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Thumbnail Image</span>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("imageUrl")}
              />
            </label>
          </div>

          <div className="justify-self-center border-l border-gray-900/10 w-full">
            <div className="flex flex-col gap-6 pl-16">
              <div>
                <h2>Categories</h2>
                {categories?.map((category) => (
                  <div key={category.id} className="flex gap-3 flex-wrap">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox" />
                      <span className="label-text pl-3">{category.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <h2>Tags</h2>
                <div className="flex gap-3 flex-wrap">
                  {tags?.map((tag) => (
                    <label key={tag.id} className="label cursor-pointer">
                      <input type="checkbox" className="checkbox" />
                      <span className="label-text pl-3">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewResourceForm;
