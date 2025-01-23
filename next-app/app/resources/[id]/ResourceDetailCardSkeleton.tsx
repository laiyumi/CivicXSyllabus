// "use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResourceDetailCardSkeleton = () => {
  const skeletonItems = Array(3).fill(0);

  // useEffect(() => {
  //   console.log("rendering loading page-------------");
  // }, []);

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl h-[500px] flex flex-row">
        {/* Left-side image skeleton */}
        <div className="lg:w-1/2 md:w-full">
          <Skeleton className="object-cover w-full h-full" height="100%" />
        </div>
        {/* Right-side content skeleton */}
        <div className="card-body flex-auto justify-around">
          {/* Categories skeleton */}
          <div className="flex gap-3 flex-wrap">
            {skeletonItems.map((_, index) => (
              <Skeleton key={index} width={80} height={30} className="badge" />
            ))}
          </div>
          {/* Title skeleton */}
          <Skeleton width="80%" height={40} className="mt-4" />
          {/* Tags skeleton */}
          <div className="card-actions justify-start flex-wrap mt-2">
            {skeletonItems.map((_, index) => (
              <Skeleton key={index} width={60} height={25} className="badge" />
            ))}
          </div>
          {/* Source skeleton */}
          <Skeleton width="50%" height={20} className="mt-4" />
          {/* Actions skeleton */}
          <div className="card-actions justify-between mt-6">
            <Skeleton width={120} height={40} className="rounded-md" />
            <Skeleton width={120} height={40} className="rounded-md" />
          </div>
        </div>
      </div>
      {/* Overview skeleton */}
      <div className="flex w-full flex-col pt-4">
        <h3 className="text-xl pt-4 text-center">
          <Skeleton width={120} />
        </h3>
        <div className="divider"></div>
        <div>
          <Skeleton count={5} />
        </div>
        <div className="divider"></div>
        {/* Related Resources skeleton */}
        <div className="card rounded-box grid place-items-center">
          <h3 className="text-xl pb-4">
            <Skeleton width={180} />
          </h3>
          <div className="flex gap-8 justify-around">
            {skeletonItems.map((_, index) => (
              <Skeleton
                key={index}
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceDetailCardSkeleton;
