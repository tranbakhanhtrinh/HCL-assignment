import Toast from "./Toast";
import './Toast.scss'

const ToastContainer = ({ toasts }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container" data-testid="toast-container">
      {toasts.map((props) => (
        <Toast key={props.id} {...props} />
      ))}
    </div>
  );
};

export default ToastContainer;
