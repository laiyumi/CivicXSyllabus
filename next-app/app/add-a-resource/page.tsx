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
    <div className="my-10">
      <h1 className="text-xl font-bold text-center">Add A Resource</h1>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-12">
          <div className="justify-self-center w-full flex flex-col gap-6 col-start-4 col-span-6">
            <div className="justify-self-center w-full flex flex-col gap-4 my-6">
              <p>
                Thank you for contributing to Civic X Syllabus and sharing your
                resources with us!
              </p>
              <p>
                Please fill out this form to submit a resource that you believe
                should be included here. If you have multiple resources to add,
                feel free to contact us at civicxsyllabus@gmail.com.
              </p>
              <p>We’ll send you the link once your resource is confirmed.</p>
            </div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Your Name *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Your Email *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <div className="divider divider-neutral">Resource Information</div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Resource Name *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("title")}
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full  flex gap-2">
              <span className="text-m">Resource Link *</span>
              <input
                type="text"
                placeholder="The link to the resource itself"
                className="input input-bordered w-full"
                {...register("link")}
              />
              <ErrorMessage>{errors.link?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Short Description *</span>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="A one-sentence summary description"
                {...register("excerpt")}
              ></textarea>
              <ErrorMessage>{errors.excerpt?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Tell me more about the resource</span>
              <textarea
                className="textarea textarea-bordered h-36"
                placeholder="When did it start? Who is it for? What impact has it made? How can others get involved?"
                {...register("content")}
              ></textarea>
              <ErrorMessage>{errors.content?.message}</ErrorMessage>
            </label>

            <label className="form-control w-full flex gap-2">
              <span className="text-m">
                Why do you think it is a best fit? *
              </span>
              <textarea
                className="textarea textarea-bordered h-36"
                {...register("content")}
              ></textarea>
              <ErrorMessage>{errors.content?.message}</ErrorMessage>
            </label>
            <div className="divider divider-neutral">Categories</div>
            <div className="flex flex-col gap-6">
              <p>What categories do you think this resource belongs to?</p>
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
              <p>
                If you can’t find a suitable category, please enter 1-3
                categories that you think fit best.
              </p>
              <label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="divider divider-neutral">Tags</div>
            <div className="flex flex-col gap-6">
              <p>What tags do you think should be attached to this resource?</p>

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
              <p>
                If you can’t find a suitable tag, please enter 1-3 tags that you
                think fit best.
              </p>
              <label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <button disabled={isSubmitting} className="btn btn-primary ">
              Submit
              {isSubmitting && <Spinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAResourcePage;
