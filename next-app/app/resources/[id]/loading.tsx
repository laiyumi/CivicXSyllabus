import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingResourceDetailPage = () => {
  const skeletonCategories = [1, 2, 3];
  const skeletonTags = [1, 2, 3, 4];
  const skeletonParagraphs = [1, 2, 3];
  const skeletonRelatedResources = [1, 2, 3];

  return <span className="loading loading-dots loading-md"></span>;
};

export default LoadingResourceDetailPage;
