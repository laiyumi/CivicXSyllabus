"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotifications } from "@/app/contexts/NotificationContext";
import { useContentType, ContentType } from "@/app/hooks/useContentType";

interface ContentTypeAdderProps {
  type: ContentType; // Now using the shared ContentType from the hook
  placeholder?: string;
  buttonText?: string;
  onSuccess?: (newItemName: string) => void; // callback for notifying parent component
}

// Maps content type to display names and default UI text
const contentTypeConfig = {
  tags: {
    endpoint: "/api/tags",
    successMessage: "Type added successfully",
    defaultPlaceholder: "Enter a new type",
    defaultButtonText: "Add",
    displayName: "Type",
  },
  categories: {
    endpoint: "/api/categories",
    successMessage: "Topic added successfully",
    defaultPlaceholder: "Enter a new topic",
    defaultButtonText: "Add",
    displayName: "Topic",
  },
};

const ContentTypeAdder = ({
  type,
  placeholder,
  buttonText,
  onSuccess,
}: ContentTypeAdderProps) => {
  const {
    data: contentItems = [],
    isLoading,
    error: contentError,
    refetch,
  } = useContentType(type);

  const [newContent, setNewContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { showNotification, clearAllNotifications } = useNotifications();

  const config = contentTypeConfig[type];

  // Handle errors from the content hook
  useEffect(() => {
    if (contentError) {
      clearAllNotifications();
      showNotification(
        `Error loading ${type}: ${contentError.message}`,
        "error"
      );
    }
  }, [contentError, showNotification, clearAllNotifications, type]);

  // Show success notifications
  useEffect(() => {
    if (message) {
      clearAllNotifications();
      showNotification(message, "success");
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message, showNotification, clearAllNotifications]);

  const handleAdd = async () => {
    if (!newContent.trim()) {
      showNotification(`${config.displayName} name cannot be empty`, "error");
      return;
    }

    try {
      const response = await axios.post(config.endpoint, {
        name: newContent.trim(),
      });

      if (response.status === 201) {
        const addedName = response.data.name;

        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess(addedName);
        }

        showNotification(config.successMessage, "success");
        setNewContent("");
        refetch();
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          // Zod validation errors - extract the message from the response
          if (Array.isArray(data) && data.length > 0) {
            const errorMessage = data[0]?.message || "Validation failed";
            showNotification(errorMessage, "error");
          } else {
            showNotification("Validation failed", "error");
          }
        } else if (status === 409) {
          // Duplicate error
          showNotification(
            data?.error || `${config.displayName} already exists`,
            "error"
          );
        } else {
          // Other errors
          showNotification(
            data?.error || "An unexpected error occurred",
            "error"
          );
        }
      } else {
        // Network errors or other issues without a response
        showNotification(
          `Failed to add ${config.displayName.toLowerCase()}: ${error.message}`,
          "error"
        );
      }
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder={placeholder || config.defaultPlaceholder}
        value={newContent}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setNewContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button
        type="button"
        className="btn btn-primary btn-outline"
        onClick={handleAdd}
      >
        {buttonText || config.defaultButtonText}
      </button>
    </div>
  );
};

export default ContentTypeAdder;
