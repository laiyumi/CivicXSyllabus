"use client";

import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt="an image" />
      )}
      <p>{imageUrl}</p>

      <CldUploadWidget
        uploadPreset="j5cvqjdg"
        onSuccess={(result) => {
          if (result.event != "success") return;
          const info = result.info as CloudinaryResult;
          setImageUrl(info.secure_url);
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadImage;
