import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast({ autoClose: 1000, position: toast.POSITION.TOP_CENTER });

// add more config via the options object
const successToast = (message, options = {}) =>
  toast.success(message, {
    ...options,
  });

const errorToast = (message, options = {}) =>
  toast.error(message, {
    ...options,
  });

export { successToast, errorToast };
