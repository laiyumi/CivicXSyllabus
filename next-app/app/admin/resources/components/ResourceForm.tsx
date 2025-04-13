"use client";

import ContentTypeAdder from "@/app/components/ContentTypeAdder";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import UploadImage from "@/app/components/UploadImage";
import createResourceSchema from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Post, Tag } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NewResourceFormInputs = z.infer<typeof createResourceSchema>;

const ResourceForm = ({ resource }: { resource?: Post }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NewResourceFormInputs>({
    resolver: zodResolver(createResourceSchema),
    defaultValues: {
      year: undefined, // or some other default value
    },
  });
  const router = useRouter();

  const [uploadImageUrl, setUploadImageUrl] = useState("");

  const [excerpt, setExcerpt] = useState("");
  // const [truncatedText, setTruncatedText] = useState("");

  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setValue("imageUrl", imageUrl);
    setUploadImageUrl(imageUrl);
    console.log("Uploaded Image url: ", imageUrl);
  };

  const handleTagChange = (tagName: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter((name) => name !== tagName)
        : [...prevSelectedTags, tagName]
    );
    // setValue("tags", selectedTags);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryName)
        ? prevSelectedCategories.filter((name) => name !== categoryName)
        : [...prevSelectedCategories, categoryName]
    );
    // setValue("categories", selectedCategories);
  };

  // truncuate the excerpt to 30 words
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/);

    let finalText = inputText;
    if (words.length > 30) {
      finalText = words.slice(0, 30).join(" ");
    }

    setExcerpt(finalText); // update textarea UI
    setValue("excerpt", finalText); // update react-hook-form state
  };

  // Function to fetch tags
  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  console.log("tags: ", tags);
  console.log("categories: ", categories);

  const handleCategoryAdded = useCallback((newCategoryName: string) => {
    fetchCategories();
    setSelectedCategories((prev) => [...prev, newCategoryName]);
  }, []);

  const handleTagAdded = useCallback(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags, setValue]);

  useEffect(() => {
    setValue("categories", selectedCategories);
  }, [selectedCategories, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    data.imageUrl = getValues().imageUrl;
    data.tags = selectedTags;
    data.categories = selectedCategories;

    // for testing purposes
    console.log(data);

    try {
      setIsSubmitting(true);
      await axios.post("/api/resources", data);
      router.push("/admin/resources");
    } catch (error) {
      setIsSubmitting(false);
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
        <div className="flex flex-col  justify-center ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold leading-7 text-base-content">
              Creating new Resource
            </h1>
            <button disabled={isSubmitting} className="btn btn-primary mr-4 ">
              Save
              {isSubmitting && <Spinner />}
            </button>
          </div>

          <div className="flex lg:flex-row xs:flex-col gap-8">
            <div className="justify-self-center lg:w-1/2 xs:w-full flex flex-col gap-6">
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Title *</span>
                <input
                  type="text"
                  defaultValue={resource?.title}
                  placeholder="Enter the title of the resource"
                  className="input input-bordered w-full"
                  {...register("title")}
                />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Source *</span>
                <input
                  type="text"
                  placeholder="What is the source of this resource? "
                  defaultValue={resource?.sourceId}
                  className="input input-bordered w-full"
                  {...register("source")}
                />
                <ErrorMessage>{errors.source?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Year</span>
                <input
                  type="number"
                  placeholder="What year was this resource published/updated? "
                  defaultValue={resource?.year}
                  className="input input-bordered w-full"
                  {...register("year", { valueAsNumber: true })}
                />
                <ErrorMessage>{errors.year?.message}</ErrorMessage>
              </label>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Excerpt *</span>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Please limit to 30 words"
                  value={excerpt}
                  {...register("excerpt")}
                  onChange={handleTextAreaChange}
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
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Thumbnail Image *</span>
                <img
                  src={resource?.imageUrl}
                  className="w-72 h-54 object-cover"
                ></img>
                <UploadImage
                  onImageUpload={handleImageUpload}
                  buttonName="Select Image"
                />
                {uploadImageUrl && (
                  <img
                    src={uploadImageUrl}
                    alt="Uploaded image"
                    className="h-36 w-auto"
                  ></img>
                )}
                <ErrorMessage>{errors.imageUrl?.message}</ErrorMessage>
              </label>
            </div>

            <div className="justify-self-center lg:w-1/2  xs:w-full lg:pl-8">
              <div className="flex flex-col gap-6 pb-16">
                <div className="flex flex-col gap-2">
                  <h2>Topics</h2>
                  <div className="flex gap-3 flex-wrap">
                    {categories?.map((category) => (
                      <div key={category.id}>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleCategoryChange(category.name)}
                          />
                          <span className="label-text pl-3">
                            {category.name}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <ContentTypeAdder
                    type={"categories"}
                    onSuccess={handleCategoryAdded}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Types</h2>
                  <div className="flex gap-3 flex-wrap">
                    {tags?.map((tag) => (
                      <label key={tag.id} className="label cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedTags.includes(tag.name)}
                          onChange={() => handleTagChange(tag.name)}
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

export default ResourceForm;
