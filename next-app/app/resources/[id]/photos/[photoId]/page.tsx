import React from "react";

interface Props {
  params: {
    id: number;
    photoId: number;
  };
}

const ResourcePhotoDetail = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      Resource {id} Photo Detail {photoId}
    </div>
  );
};

export default ResourcePhotoDetail;
