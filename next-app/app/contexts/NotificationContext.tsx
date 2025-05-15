"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import FadeOutMessage from "../components/FadeOutMessage";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: number;
  message: ReactNode;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (
    message: ReactNode,
    type: NotificationType,
    duration?: number
  ) => void;
  removeNotification: (id: number) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Improved showNotification with deduplication
  const showNotification = useCallback(
    (message: ReactNode, type: NotificationType, duration = 3000) => {
      const id = Date.now();

      // Remove duplicate notifications (same message and type)
      setNotifications((prev) => {
        // First remove any existing notifications with the same message and type
        const filtered = prev.filter(
          (notification) =>
            !(notification.message === message && notification.type === type)
        );

        // Then add the new notification
        return [...filtered, { id, message, type, duration }];
      });
    },
    []
  );

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {notifications.map((notification) => (
          <FadeOutMessage
            key={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onAnimationEnd={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
