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
import { set, useForm } from "react-hook-form";
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

  // the image url from the resource
  //   const resourceImageUrl = resource.imageUrl;

  // handle if user uploads a new image
  const [newImageUrl, setnewImageUrl] = useState("");

  //   console.log("initial newImageUrl: ", resourceImageUrl);

  // handle the new image url
  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
    setnewImageUrl(imageUrl);
    console.log("replace image url: ", newImageUrl);
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // sort tags and categories
  const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const resourceTags = resource.tags.map((tag) => tag.id);
  const resourceCategories = resource.categories.map((category) => category.id);

  const [selectedTags, setSelectedTags] = useState<string[]>(resourceTags);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(resourceCategories);

  const checkedTagsRef = useRef(selectedTags);

  // Update the ref whenever the state changes
  useEffect(() => {
    checkedTagsRef.current = selectedTags;
    console.log("checkedTagsRef: ", checkedTagsRef.current);
  }, [selectedTags]);

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
    setValue("tags", selectedTags);
    console.log("current selected tags: ", selectedTags);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];
      return newSelectedCategories;
    });
  };

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    data.imageUrl = getValues("imageUrl");
    data.tags = selectedTags;
    data.categories = selectedCategories;

    // for testing purposes
    console.log("sending data", data);

    try {
      setIsSubmitting(true);
      await axios.put(`/api/resources/${resource.id}`, data);
      router.replace(`/admin/resources/${resource.id}`);
      setIsSubmitting(false);
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

      <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-center pb-12">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold leading-10 text-gray-900 pb-8">
              Editing Resource
            </h2>
            <button disabled={isSubmitting} className="btn btn-primary ">
              Save Changes
              {isSubmitting && <Spinner />}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-16">
            <div className="col-span-2 justify-self-center w-full flex flex-col gap-6">
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
                  defaultValue={resource.excerpt}
                  {...register("excerpt")}
                ></textarea>
                <ErrorMessage>{errors.excerpt?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full  flex gap-2">
                <span className="text-m">Link *</span>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={resource.link}
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
                  defaultValue={resource.content}
                  {...register("content")}
                ></textarea>
                <ErrorMessage>{errors.content?.message}</ErrorMessage>
              </label>
              <div>
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
                    src={resource.imageUrl}
                    className="w-72 h-54 object-cover"
                  ></img>
                )}
                <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
              </div>
            </div>

            <div className="col-span-1 justify-self-center border-l border-gray-900/10 w-full">
              <div className="flex flex-col gap-6 pl-16">
                <div>
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
                <div>
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
