"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Alert from "../components/alert";

type AlertType =
  | "alert-success"
  | "alert-error"
  | "alert-warning"
  | "alert-info";

type Alert = {
  type: AlertType;
  message: string;
};

type AlertContext = {
  showAlert: (type: AlertType, message: string) => void;
};

type AlertContextProvider = {
  children: ReactNode;
};

// Create a new context for the Alert
export const AlertContext = createContext<AlertContext>({
  showAlert: () => {},
});

export const AlertProvider: React.FC<AlertContextProvider> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<Alert[]>([]);

  // Function to hide an alert based on its index
  const hideAlert = (index: number) => {
    setAlertMessages((prev) => prev.filter((_, i) => i !== index));
  };

  // Stable reference
  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlertMessages((prev) => [...prev, { type, message }]);
  }, []);

  // UseEffect hook to remove the first alert message after 8 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAlertMessages((prevItems) => {
  //       if (prevItems.length > 0) {
  //         return prevItems.slice(1); // Remove the first alert
  //       }

  //       return prevItems;
  //     });
  //   }, 8 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // Context value containing the showAlert function
  const contextValue: AlertContext = useMemo<AlertContext>(
    () => ({ showAlert }),
    [showAlert]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMessages((prev) => (prev.length ? prev.slice(1) : prev));
    }, 8 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alertMessages.map((alert, index) => (
        <Alert
          message={alert.message}
          type={alert.type}
          key={index}
          onClose={() => hideAlert(index)}
        />
      ))}
    </AlertContext.Provider>
  );
};
