"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import createResourceSchema from "../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import UploadImage from "../upload/page";
import { z } from "zod";
import Spinner from "../components/Spinner";

interface TagProps {
  id: string;
  name: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

type NewResourceFormInputs = z.infer<typeof createResourceSchema>;

const AddAResourcePage = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = handleSubmit(async (data) => {
    data.imageUrl = getValues().imageUrl;
    data.tags = selectedTags;
    data.categories = selectedCategories;

    // for testing purposes
    console.log(data);

    try {
      setIsSubmitting(true);
      console.log(data);
      router.push("/resources");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="my-6">
      <h1 className="text-xl font-bold text-center">Add A Resource</h1>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-12">
          <div className="justify-self-center w-full flex flex-col gap-6 col-start-4 col-span-6">
            <p>
              Please fill out this form to add a resource. If you have a list of
              resources to add, please contact us(civicxsyllabus@gmail.com).
            </p>
            <div className="divider divider-neutral">Personal Information</div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Name *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Email *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <div className="divider divider-neutral">Resource Information</div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Title *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("title")}
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Source *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("source")}
              />
              <ErrorMessage>{errors.source?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Excerpt *</span>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Please limit to 30 words"
                {...register("excerpt")}
              ></textarea>
              <ErrorMessage>{errors.excerpt?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full  flex gap-2">
              <span className="text-m">Link *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("link")}
              />
              <ErrorMessage>{errors.link?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Content *</span>
              <textarea
                className="textarea textarea-bordered h-36"
                placeholder="Please limit to 200 words"
                {...register("content")}
              ></textarea>
              <ErrorMessage>{errors.content?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Thumbnail Image *</span>
              <UploadImage onImageUpload={handleImageUpload} />
              <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
            </label>
            <div className="flex flex-col gap-6">
              <div>
                <h2>Categories</h2>
                <div className="flex gap-3 flex-wrap">
                  {categories?.map((category) => (
                    <label key={category.id} className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span className="label-text pl-3">{category.name}</span>
                    </label>
                  ))}
                </div>
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
              <button disabled={isSubmitting} className="btn btn-primary ">
                Submit
                {isSubmitting && <Spinner />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAResourcePage;
