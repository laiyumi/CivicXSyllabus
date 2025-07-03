"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import { exportListToPDF, generatePDFBlob } from "@/app/utils/pdfExport";
import PDFPreviewModal from "../../../components/PDFPreviewModal";

type PostWithRelations = Prisma.PostGetPayload<{
  include: { categories: true; tags: true; source: true };
}>;

type ListWithPosts = Prisma.ListGetPayload<{
  include: {
    posts: {
      include: {
        categories: true;
        tags: true;
        source: true;
      };
    };
    user: {
      select: {
        name: true;
        email: true;
      };
    };
  };
}>;

const SharedListPage = () => {
  const params = useParams();
  const listId = params.listId as string;

  const [list, setList] = useState<ListWithPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchSharedList = async () => {
      if (!listId) {
        setError("List ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/lists/${listId}/shared`);
        setList(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching shared list:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load shared list. It may be private or no longer available."
        );
        setLoading(false);
      }
    };

    fetchSharedList();
  }, [listId]);

  // Preview PDF before downloading
  const handlePreviewPDF = async () => {
    if (!list || !list.posts.length) {
      alert("No content to export");
      return;
    }

    try {
      setExporting(true);
      const baseUrl = window.location.origin;

      // Create PDF content with resource URLs
      const pdfData = {
        title: list.name,
        resources: list.posts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          categories: post.categories.map((cat) => cat.name).join(", "),
          tags: post.tags.map((tag) => tag.name).join(", "),
          year: post.year,
          url: `${baseUrl}/resources/${post.id}`,
        })),
        createdBy: list.user.name || list.user.email || "Unknown",
      };

      const blobUrl = await generatePDFBlob(pdfData);

      // Create filename for display
      const sanitizedTitle = list.name
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const sanitizedCreator = (list.user.name || list.user.email || "Unknown")
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const fileName = `${sanitizedTitle}_${sanitizedCreator}_resources.pdf`;

      setPdfPreviewUrl(blobUrl);
      setPdfFileName(fileName);
      setShowPDFPreview(true);
    } catch (error) {
      console.error("Failed to generate PDF preview:", error);
      alert("Failed to generate PDF preview");
    } finally {
      setExporting(false);
    }
  };

  // Download PDF (called from preview modal)
  const handleDownloadPDF = async () => {
    if (!list || !list.posts.length) {
      alert("No content to export");
      return;
    }

    try {
      const baseUrl = window.location.origin;

      // Create PDF content with resource URLs
      const pdfData = {
        title: list.name,
        resources: list.posts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          categories: post.categories.map((cat) => cat.name).join(", "),
          tags: post.tags.map((tag) => tag.name).join(", "),
          year: post.year,
          url: `${baseUrl}/resources/${post.id}`,
        })),
        createdBy: list.user.name || list.user.email || "Unknown",
      };

      await exportListToPDF(pdfData);
      setShowPDFPreview(false);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export list to PDF");
    }
  };

  // Close PDF preview and clean up blob URL
  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-error mb-4">List Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "This list is not available for public viewing."}
          </p>
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="">
          {/* Header */}
          <div className="text-center mb-10 flex justify-between place-items-end">
            <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold">{list.name}</h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  className="text-red-600 fill-current"
                >
                  <path d="M23.3 5.076a6.582 6.582 0 0 0-10.446-1.71L12 4.147l-.827-.753a6.52 6.52 0 0 0-5.688-1.806A6.47 6.47 0 0 0 .7 5.075a6.4 6.4 0 0 0 1.21 7.469l9.373 9.656a1 1 0 0 0 1.434 0l9.36-9.638A6.41 6.41 0 0 0 23.3 5.076"></path>
                </svg>
                {list.posts.length} resource{list.posts.length !== 1 ? "s" : ""}
                <p className="text-gray-600">
                  • Created by{" "}
                  <span className="font-semibold">
                    {list.user.name || list.user.email}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                className="btn btn-outline btn-primary"
                onClick={handlePreviewPDF}
                disabled={exporting}
              >
                {exporting ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Preview PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              className={`btn btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              Grid
            </button>
            <button
              className={`btn btn-sm ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              List
            </button>
          </div>

          {/* Resources Display */}
          {list.posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">This list is empty.</p>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {list.posts.map((post) => (
                <div
                  key={post.id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <figure className="w-full h-[300px] relative md:h-[250px] xs: h-[200px]">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.map((category) => (
                        <div
                          key={category.id}
                          className="badge badge-secondary badge-sm md:badge-md"
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                    <h2 className="card-title">{post.title}</h2>
                    <p className="text-sm">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="badge badge-outline badge-sm md:badge-md"
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                    <div className="card-actions justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                          />
                        </svg>
                        {post.year}
                      </div>
                      <Link
                        href={`/resources/${post.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Resource</th>
                    <th>Topics</th>
                    <th>Type</th>
                    <th>Year</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.posts.map((post, index) => (
                    <tr key={post.id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="rounded-xl h-12 w-12">
                              <img src={post.imageUrl} alt={post.title} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-md">
                              {post.title}
                            </div>
                            <div className="text-sm opacity-50 line-clamp-2">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {post.categories.map((category) => (
                            <span
                              key={category.id}
                              className="badge badge-secondary whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="badge badge-outline whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{post.year}</td>
                      <th>
                        <Link
                          href={`/resources/${post.id}`}
                          className="btn btn-ghost"
                        >
                          View
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Resource</th>
                    <th>Topics</th>
                    <th>Type</th>
                    <th>Year</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-gray-500 mb-4">Want to create your own lists?</p>
            <Link href="/auth/signin" className="btn btn-outline btn-primary">
              Sign In to Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={showPDFPreview}
        onClose={handleClosePDFPreview}
        pdfUrl={pdfPreviewUrl}
        fileName={pdfFileName}
        onDownload={handleDownloadPDF}
      />
    </>
  );
};

export default SharedListPage;
