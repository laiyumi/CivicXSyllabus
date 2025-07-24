import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-current`} />
  );
};

export default Spinner;
