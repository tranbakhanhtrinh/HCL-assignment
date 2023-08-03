import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

const useToast = () => {
  const { addToast, removeToast } = useContext(ToastContext);
  
  const success = (value) => {
    addToast(value, "success");
  };

  const error = (value) => {
    addToast(value, "error");
  };

  return { success, error, remove: removeToast };
};

export default useToast;
