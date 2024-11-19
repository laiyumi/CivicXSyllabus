"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import createResourceSchema from "../validationSchemas";
import { Tag, Category } from "@prisma/client";

// type NewResourceFormInputs = z.infer<typeof createResourceSchema>;

const AddAResourcePage = () => {
  // test get endpoint

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const response = await axios.get("/api/add-a-resource");
  //   const resources = await response.data;
  //   console.log(resources);
  // };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
      const tasResponse = await axios.get("/api/tags");
      const tags = await tasResponse.data;
      setTags(tags);

      const categoryResponse = await axios.get("/api/categories");
      const categories = await categoryResponse.data;
      setCategories(categories);
    };
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
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
      await axios.post("/api/add-a-resource", data);
      console.log("sending data object to endpoint: ", data);
      router.replace("/resources");
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
                {...register("name")}
              />
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Your Email *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("email")}
              />
            </label>
            <div className="divider divider-neutral">Resource Information</div>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Resource Name *</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("resourceName")}
              />
              {/* <ErrorMessage>{errors.title?.message}</ErrorMessage> */}
            </label>
            <label className="form-control w-full  flex gap-2">
              <span className="text-m">Resource Link *</span>
              <input
                type="text"
                placeholder="The link to the resource itself"
                className="input input-bordered w-full"
                {...register("resourceLink")}
              />
              {/* <ErrorMessage>{errors.link?.message}</ErrorMessage> */}
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Short Description *</span>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="A one-sentence summary description"
                {...register("description")}
              ></textarea>
              {/* <ErrorMessage>{errors.excerpt?.message}</ErrorMessage> */}
            </label>
            <label className="form-control w-full flex gap-2">
              <span className="text-m">Tell me more about the resource</span>
              <textarea
                className="textarea textarea-bordered h-36"
                placeholder="When did it start? Who is it for? What impact has it made? How can others get involved?"
                {...register("moreInfo")}
              ></textarea>
              {/* <ErrorMessage>{errors.content?.message}</ErrorMessage> */}
            </label>

            <label className="form-control w-full flex gap-2">
              <span className="text-m">
                Why do you think it is a best fit? *
              </span>
              <textarea
                className="textarea textarea-bordered h-36"
                {...register("bestFit")}
              ></textarea>
              {/* <ErrorMessage>{errors.content?.message}</ErrorMessage> */}
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
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => handleCategoryChange(category.name)}
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
                  onChange={(e) => setNewCategories(e.target.value)}
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
                      checked={selectedTags.includes(tag.name)}
                      onChange={(e) => handleTagChange(tag.name)}
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
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </label>
            </div>
            <button
              disabled={isSubmitting}
              onClick={addNewTagAndCategory}
              className="btn btn-primary"
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
