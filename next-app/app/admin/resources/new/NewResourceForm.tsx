"use client";

import React, { useEffect, useState } from "react";
import prisma from "../../../../prisma/client";
import { set, useForm } from "react-hook-form";
import type { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadImage from "@/app/upload/page";
import { zodResolver } from "@hookform/resolvers/zod";
import createResourceSchema from "@/app/validationSchemas";
import { z } from "zod";

interface TagProps {
  id: string;
  name: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

type NewResourceFormInputs = z.infer<typeof createResourceSchema>;

// interface NewResourceFormInputs {
//   title: string;
//   excerpt: string;
//   content: string;
//   link: string;
//   imageUrl: string;
//   source: string;
//   categories: string[];
//   tags: string[];
// }

const NewResourceForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NewResourceFormInputs>({
    resolver: zodResolver(createResourceSchema),
  });
  const router = useRouter();

  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [error, setError] = useState("");

  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
    setValue("tags", selectedTags);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
    setValue("categories", selectedCategories);
  };

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
    <div>
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          data.imageUrl = getValues().imageUrl;
          data.tags = selectedTags;
          data.categories = selectedCategories;

          // for testing purposes
          console.log(data);

          try {
            await axios.post("/api/resources", data);
            router.push("/admin/resources");
          } catch (error) {
            setError("An unexpected error occurred");
          }
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
                <span className="text-m">Title *</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Source *</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("source")}
                />
                {errors.source && (
                  <p className="text-red-500 text-xs italic">
                    {errors.source.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Excerpt *</span>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Please limit to 30 words"
                  {...register("excerpt")}
                ></textarea>
                {errors.excerpt && (
                  <p className="text-red-500 text-xs italic">
                    {errors.excerpt.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full  flex gap-2">
                <span className="text-m">Link *</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("link")}
                />
                {errors.link && (
                  <p className="text-red-500 text-xs italic">
                    {errors.link.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Content *</span>
                <textarea
                  className="textarea textarea-bordered h-36"
                  placeholder="Please limit to 200 words"
                  {...register("content")}
                ></textarea>
                {errors.content && (
                  <p className="text-red-500 text-xs italic">
                    {errors.content.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Thumbnail Image *</span>
                <UploadImage onImageUpload={handleImageUpload} />
                {errors.imageUrl && (
                  <p className="text-red-500 text-xs italic">
                    {errors.imageUrl.message}
                  </p>
                )}
              </label>
            </div>

            <div className="justify-self-center border-l border-gray-900/10 w-full">
              <div className="flex flex-col gap-6 pl-16">
                <div>
                  <h2>Categories</h2>
                  {categories?.map((category) => (
                    <div key={category.id} className="flex gap-3 flex-wrap">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                        />
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
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagChange(tag.id)}
                        />
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
    </div>
  );
};

export default NewResourceForm;
