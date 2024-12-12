import React, { useState, useEffect } from "react";
import axios from "axios";

const ToggleSave = ({ resourceId }: { resourceId: string }) => {
  const [saved, setSaved] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  const handleToggleSave = async () => {
    try {
      if (hasSaved) {
        // remove the saved resource
      } else {
        // save the resource to the default list
      }
      setHasSaved(!hasSaved); // Toggle the save state
      console.log("current save status: ", hasSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  return (
    <>
      <div className="rating gap-1" onClick={handleToggleSave}>
        <input
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 ${
            hasSaved ? "bg-green-500" : "bg-green-200"
          }`}
          defaultChecked={hasSaved} // Add this line to conditionally set defaultChecked
        />
      </div>{" "}
      <span className="inline-block w-12 text-center">
        {hasSaved ? "Saved" : "Save"}
      </span>
    </>
  );
};

export default ToggleSave;
