import React, { useState, useEffect } from "react";
import axios from "axios";

const ToggleLikes = ({ resourceId }: { resourceId: string }) => {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // get the resource likes
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get(`/api/resources/${resourceId}`);
      setLikes(response.data.likes);
    };
    fetchLikes();
  }, [resourceId]);

  // handle front end and back end when toggle likes
  const handleToggleLike = async () => {
    if (loading) return;

    // Optimistically update the UI
    setHasLiked((prev) => !prev);
    setLikes((prev) => (hasLiked ? Math.max(prev - 1, 0) : prev + 1));
    setLoading(true);

    try {
      if (hasLiked) {
        // Unlike: Decrement the likes count
        await axios.put(`/api/resources/${resourceId}/unlike`);
      } else {
        // Like: Increment the likes count
        await axios.put(`/api/resources/${resourceId}/like`);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert state on error
      setHasLiked((prev) => !prev);
      setLikes((prev) => (hasLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-start">
      <div className="rating gap-1" onClick={handleToggleLike}>
        <input
          aria-label={hasLiked ? "Unlike this resource" : "Like this resource"}
          disabled={loading}
          type="checkbox"
          name="rating-3"
          className={`mask mask-heart ${
            hasLiked ? "bg-red-400" : "bg-red-200"
          }`}
          defaultChecked={hasLiked} // Add this line to conditionally set defaultChecked
        />
      </div>{" "}
      <span className="inline-block w-12 text-center">{likes}</span>
    </div>
  );
};

export default ToggleLikes;
