"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import UploadImage from "@/app/components/UploadImage";
import createResourceSchema from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { get } from "http";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Resource extends Post {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  source: { id: string; name: string };
}

type NewResourceFormInputs = z.infer<typeof createResourceSchema>;

const EditResourceForm = ({ resource }: { resource: Resource }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NewResourceFormInputs>({
    resolver: zodResolver(createResourceSchema),
    defaultValues: {
      imageUrl: resource.imageUrl,
    },
  });
  const router = useRouter();

  // handle if user uploads a new image
  const [newImageUrl, setnewImageUrl] = useState("");

  const [message, setMessage] = useState("");

  // handle the new image url
  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
    setnewImageUrl(imageUrl);
    console.log("replace image url: ", newImageUrl);
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // sort tags and categories
  tags.sort((a, b) => a.name.localeCompare(b.name));
  categories.sort((a, b) => a.name.localeCompare(b.name));

  // get the resource's tags id
  const resourceTags = resource.tags.map((tag) => tag.id);
  const resourceCategories = resource.categories.map((category) => category.id);

  const [selectedTags, setSelectedTags] = useState<string[]>(resourceTags);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(resourceCategories);

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId];
      setValue("tags", updatedTags);
      console.log("after updating tags: ", updatedTags);

      return updatedTags;
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];

      setValue("categories", updatedCategories);
      console.log("after updating categories: ", updatedCategories);

      return updatedCategories;
    });
  };

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // get all tags and categories from the db
  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get("/api/tags");
      const tags = await response.data;
      setTags(tags);
    };

    const fetchCategories = async () => {
      const response = await axios.get("/api/categories");
      const categories = await response.data;
      setCategories(categories);
    };

    fetchTags();
    fetchCategories();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted");

    data.imageUrl = getValues("imageUrl");
    data.tags = getValues("tags");
    data.categories = getValues("categories");

    // for testing purposes
    console.log("sending data", data);

    try {
      setIsSubmitting(true);
      const response = await axios.put(`/api/resources/${resource?.id}`, data);
      if (response.status === 200) {
        setMessage("Resource updated successfully");
        router.replace(`/admin/resources/${resource?.id}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  });

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

      <form>
        <div className="flex flex-col justify-center pb-12">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold leading-10 text-base-content pb-8">
              Editing Resource
            </h1>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="btn btn-primary "
            >
              Save Changes
              {isSubmitting && <Spinner />}
            </button>
          </div>

          <div className="flex lg:flex-row xs:flex-col gap-8">
            <div className="justify-self-center lg:w-1/2 xs:w-full flex flex-col gap-6">
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Title *</span>
                <input
                  type="text"
                  defaultValue={resource.title}
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
                  defaultValue={resource.source.name}
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
                  defaultValue={resource?.excerpt}
                  {...register("excerpt")}
                ></textarea>
                <ErrorMessage>{errors.excerpt?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full  flex gap-2">
                <span className="text-m">Link *</span>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={resource?.link}
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
                  defaultValue={resource?.content}
                  {...register("content")}
                ></textarea>
                <ErrorMessage>{errors.content?.message}</ErrorMessage>
              </label>
              <div className="flex flex-col gap-6">
                <label className="form-control w-full flex gap-4">
                  <span className="text-m ">Thumbnail Image *</span>
                  <UploadImage
                    onImageUpload={handleImageUpload}
                    buttonName="Replace"
                  />
                </label>
                {newImageUrl ? (
                  <img
                    src={newImageUrl}
                    alt="Uploaded image"
                    className="w-72 h-54 object-cover"
                  ></img>
                ) : (
                  <img
                    src={resource?.imageUrl}
                    className="w-72 h-54 object-cover"
                  ></img>
                )}
                <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
              </div>
            </div>

            <div className="justify-self-center lg:w-1/2  xs:w-full lg:pl-8">
              <div className="flex flex-col gap-6 pb-16">
                <div className="flex flex-col gap-2">
                  <h2>Categories</h2>
                  <div className="flex gap-3 flex-wrap">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          <span className="label-text pl-3">
                            {category.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Tags</h2>
                  <div className="flex gap-3 flex-wrap">
                    {tags.map((tag) => (
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

export default EditResourceForm;
