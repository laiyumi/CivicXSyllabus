import React, { useState, useEffect } from "react";
import axios from "axios";

const ToggleLikes = ({ resourceId }: { resourceId: string }) => {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLikeDisabled, setIsLikeDisabled] = useState<boolean>(false);

  // get the resource likes
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get(`/api/resources/${resourceId}`);
      setLikes(response.data.likes);
    };
    fetchLikes();
  }, [resourceId]);

  console.log("the number of likes from api: ", likes);

  // handle front end and back end when toggle likes
  const handleToggleLike = async () => {
    try {
      if (hasLiked) {
        // Unlike: Decrement the likes count
        setLikes((prevLikes) => Math.max(prevLikes - 1, 0)); // Prevent negative likes
        await axios.put(`/api/resources/${resourceId}/unlike`);
      } else {
        // Like: Increment the likes count
        setLikes((prevLikes) => prevLikes + 1);
        await axios.put(`/api/resources/${resourceId}/like`);
      }
      setHasLiked(!hasLiked); // Toggle the liked state
      console.log("has liked: ", hasLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
      <div className="rating gap-1" onClick={handleToggleLike}>
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${
            hasLiked ? "bg-red-400" : "bg-red-200"
          }`}
          defaultChecked={hasLiked} // Add this line to conditionally set defaultChecked
        />
      </div>{" "}
      <p>{likes}</p>
    </>
  );
};

export default ToggleLikes;
