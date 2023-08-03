import { createContext, useCallback, useState } from "react";
import ToastContainer from "../components/Toast/ToastContainer";

const defaultValue = {
  addToast: () => {},
  removeToast: () => {},
  show: false
};

export const ToastContext = createContext(defaultValue);

let id = 0;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (value, type) => {
      setToasts((toasts) => [...toasts, { id: id++, value, type }]);
    },
    [setToasts]
  );  

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
