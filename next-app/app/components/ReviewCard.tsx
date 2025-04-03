"use client";
import { cn } from "@/lib/utils";
import { on } from "events";

interface ReviewCardProps {
  name: string;
  onClick: () => void;
}

// export const ReviewCard = ({ name, onClick }: ReviewCardProps) => {
//   return (
//     <figure
//       onClick={onClick}
//       className={cn(
//         "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
//         // light styles
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         // dark styles
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {name}
//           </figcaption>
//           {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
//         </div>
//       </div>
//       {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
//     </figure>
//   );
// };

export const ReviewCard = ({ name, onClick }: ReviewCardProps) => {
  return (
    <figure
      onClick={onClick}
      className={cn(
        "relative inline-flex cursor-pointer overflow-hidden rounded-xl p-2 sm:p-3 md:p-4 mx-1",
        // width adjustment - auto width based on content
        "w-auto min-w-min whitespace-nowrap",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        <div className="flex flex-col">
          <figcaption className="text-xs xs:text-sm sm:text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};
