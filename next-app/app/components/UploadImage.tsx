"use client";

import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

interface Props {
  onImageUpload: (imageUrl: string) => void;
  buttonName: string;
}

const UploadImage = ({ onImageUpload, buttonName }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [publicId, setPublicId] = useState<string>();

  return (
    <>
      <CldUploadWidget
        uploadPreset="j5cvqjdg"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1",
            },
            fonts: {
              default: {
                active: true,
              },
            },
          },
        }}
        onSuccess={(result) => {
          if (result.event != "success") return;
          const info = result.info as CloudinaryResult;
          setImageUrl(info.secure_url);
          setPublicId(info.public_id);
          onImageUpload(info.secure_url);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="btn btn-primary btn-outline"
            onClick={() => open()}
          >
            {buttonName}
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadImage;
