import { useState, useEffect, ReactNode } from "react";

interface FadeOutMessageProps {
  message: ReactNode;
  duration?: number; // default is 3 seconds
  onAnimationEnd?: () => void;
  type: "success" | "error" | "info" | "warning";
}

const FadeOutMessage: React.FC<FadeOutMessageProps> = ({
  message,
  duration = 3000,
  onAnimationEnd,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Reset isVisible to true when message changes
  useEffect(() => {
    setIsVisible(true);
  }, [message]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsVisible(false);
  //   }, duration);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [message, duration]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      // Call onAnimationEnd after the fade out animation duration (500ms)
      setTimeout(() => {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, duration, onAnimationEnd]);

  const handleAnimationEnd = () => {
    if (onAnimationEnd) {
      onAnimationEnd();
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const alertType = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  return (
    <div
      //   role="alert"
      className={`alert ${alertType[type]} transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

export default FadeOutMessage;
