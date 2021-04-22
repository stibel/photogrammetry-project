import {toast} from "react-toastify";

const Toast = (msg, type) => {
    switch (type) {
        case "e":
            return toast.error(msg);
        case "s":
            return toast.success(msg);
        case "w":
            return toast.warn(msg);
        default:
            return toast(msg);
    }
};

export default Toast