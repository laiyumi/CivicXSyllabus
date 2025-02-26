"use client";
import { Category, Tag } from "@prisma/client";
import axios from "axios";
import apiClient from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import { UserSubmittedResourceSchema } from "../validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import Link from "next/link";

type UserSubmittedFormInputs = z.infer<typeof UserSubmittedResourceSchema>;

const AddAResourcePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmittedFormInputs>({
    resolver: zodResolver(UserSubmittedResourceSchema),
  });

  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [newTags, setNewTags] = useState<string>("");
  const [newCategories, setNewCategories] = useState<string>("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagChange = (tagName: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter((name) => name !== tagName)
        : [...prevSelectedTags, tagName]
    );
    // console.log("setting tags to: ", selectedTags);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryName)
        ? prevSelectedCategories.filter((name) => name !== categoryName)
        : [...prevSelectedCategories, categoryName]
    );
    // console.log("setting categories to: ", selectedCategories);
  };

  useEffect(() => {
    console.log("Updated selectedTags:", selectedTags);
    console.log("Updated selectedCategories:", selectedCategories);
  }, [selectedTags, selectedCategories]);

  const addNewTagAndCategory = () => {
    if (newTags.trim()) {
      // if it is not empty
      setSelectedTags((prevTags) => [...prevTags, newTags.trim()]);
      setNewTags("");
    }
    if (newCategories.trim()) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        newCategories.trim(),
      ]);
      setNewCategories("");
    }
  };

  // Display current tagories and tags
  useEffect(() => {
    const fetchData = async () => {
      const tasResponse = await apiClient.get("/tags");
      const tags = await tasResponse.data;
      setTags(tags);

      const categoryResponse = await apiClient.get("/categories");
      const categories = await categoryResponse.data;
      setCategories(categories);
    };
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log("onSubmit called!");

    addNewTagAndCategory();
    // combine selected tags and new tags into a string array
    const inputTagsArray = selectedTags.join(",");
    const inputCategoriesArray = selectedCategories.join(",");

    console.log("body tags: ", inputTagsArray);
    console.log("body categories: ", inputCategoriesArray);

    data.tags = inputTagsArray;
    data.categories = inputCategoriesArray;

    // call endpoints to send data to airtable
    try {
      setIsSubmitting(true);
      await axios.post("/add-a-resource", data);
      console.log("sending data object to endpoint: ", data);
      router.replace("/add-a-resource/submission-success");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="my-10">
      <h1 className="text-2xl text-center font-normal">Add A Resource</h1>
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Error alert icon</title>
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
        <div className="grid grid-cols-12">
          <div className="justify-self-center flex flex-col lg:gap-6 lg:col-start-4 lg:col-span-6 sm:gap-4 xs:gap-2 xs:col-start-2 xs:col-span-10">
            <div className="justify-self-center w-full flex flex-col gap-4 my-6">
              <p>
                Thank you for contributing to Civic X Syllabus and sharing your
                resources with us!
              </p>
              <div>
                To submit a resource, please fill out the form below. If you
                have multiple resources to add, feel free to contact us at{" "}
                <a
                  href={`mailto:civicxsyllabus@gmail.com?subject=Sharing Some Useful Resources`}
                  target="_blank"
                  className="text-blue-600 underline"
                  rel="noopener noreferrer"
                >
                  civicxsyllabus@gmail.com
                </a>
                .
              </div>
              <p>We’ll send you the link once your resource is confirmed.</p>
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 shrink-0"
                >
                  <title>Information icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Required field is mark with an asterisk.</span>
              </div>
              <div>
                <h2 className="divider divider-neutral">
                  Resource Submission Guidelines
                </h2>
                <p className="pb-4">
                  Before submitting a resource to our platform, please review
                  the following criteria to ensure it meets our standards. This
                  helps us maintain high-quality, relevant, and accessible
                  content for our users.
                </p>
                <ul
                  role="list"
                  className="marker:text-slate-400 list-disc pl-8 space-y-3 pb-4"
                >
                  <li>
                    <strong>Subject Alignment: </strong>The resource should
                    offer actionable insights into known civic issues and
                    address the needs of key civic audiences, including civic
                    professionals, policymakers, public policy professionals,
                    students, professors, and curious civic innovation
                    enthusiasts.
                  </li>
                  <li>
                    <strong>Timeliness or Timelessness: </strong>The resource
                    should be timely and relevant. Ideally, we expect resources
                    that are about two years old, given that knowledge across
                    the civic innovation landscape moves at the speed of light.
                    However, we will host and accept submissions that are older
                    than two years and hold timeless civic lessons.
                  </li>
                  <li>
                    <strong>Legitimacy: </strong>We expect the resource to be
                    from credible, verifiable sources.
                  </li>
                  <li>
                    <strong>Accessibility: </strong>The resource should be
                    clear, intuitive, and user-friendly, providing an equal
                    experience for different user demographics.
                  </li>
                  <li>
                    <strong>Openness: </strong> While we especially prefer
                    open-source resources not hidden behind a paywall, we will
                    consider hosting paywalled resources for the benefit of the
                    section of our audiences who may have access to paywalled
                    resources through their organizations.
                  </li>
                </ul>
                <Link
                  href="/criteria"
                  className="flex gap-2 justify-end items-center text-blue-600 underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                  <p>Learn More about Civic X Syllabus Submission Criteria</p>
                </Link>
              </div>
            </div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Your Name *</span>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("name")}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Your Email *</span>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("email")}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </label>
            <h2 className="divider divider-neutral">Resource Information</h2>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Resource Name *</span>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("resourceName")}
              />
              <ErrorMessage>{errors.resourceName?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Resource Link *</span>
              <input
                type="text"
                placeholder="The link to the resource itself"
                className="input input-bordered w-full"
                {...register("resourceLink")}
              />
              <ErrorMessage>{errors.resourceLink?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Short Description *</span>
              <textarea
                className="textarea textarea-bordered h-24 text-base placeholder:text-m"
                placeholder="A one-sentence summary description"
                {...register("description")}
              ></textarea>
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">
                Why do you think it is a best fit? *
              </span>
              <textarea
                placeholder="Use 2-3 sentences to explain why you think this resource should be included in Civic X Syllabus."
                className="textarea textarea-bordered h-36 text-base placeholder:text-m"
                {...register("bestFit")}
              ></textarea>
              <ErrorMessage>{errors.bestFit?.message}</ErrorMessage>
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">
                Why do you think this resource should be added to Civic X
                Syllabus? (optional)
              </span>
              <textarea
                className="textarea textarea-bordered h-36 text-base placeholder:text-m"
                placeholder="When did it start? Who is it for? What impact has it made? How can others get involved?"
                {...register("moreInfo")}
              ></textarea>
              <ErrorMessage>{errors.moreInfo?.message}</ErrorMessage>
            </label>

            <h2 className="divider divider-neutral">Categories</h2>
            <div className="flex flex-col gap-6">
              <p>What categories would you add this resource to?</p>
              <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {categories?.map((category) => (
                  <label
                    key={category.id}
                    className="label cursor-pointer justify-start"
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => handleCategoryChange(category.name)}
                    />
                    <span className="label-text pl-2">{category.name}</span>
                  </label>
                ))}
              </div>
              <p>
                If you can’t find a suitable category, please enter 1-3
                categories(separate by commas) that you think fit best.
              </p>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Enter New Categories:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  onChange={(e) => setNewCategories(e.target.value)}
                />
              </label>
            </div>

            <h2 className="divider divider-neutral">Tags</h2>
            <div className="flex flex-col gap-6">
              <p>What tags would you attach to this resource?</p>
              <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {tags?.map((tag) => (
                  <label
                    key={tag.id}
                    className="label cursor-pointer justify-start"
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedTags.includes(tag.name)}
                      onChange={(e) => handleTagChange(tag.name)}
                    />
                    <span className="label-text pl-2">{tag.name}</span>
                  </label>
                ))}
              </div>
              <p>
                If you can’t find a suitable tag, please enter 1-3 tags(separate
                by commas) that you think fit best.
              </p>
              <label className="form-control w-full flex gap-2">
                <span className="text-m">Enter New Tags:</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </label>
            </div>
            <button
              disabled={isSubmitting}
              className="btn btn-primary"
              type="submit"
            >
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
