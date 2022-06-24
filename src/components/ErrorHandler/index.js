import axiosInstance from "../../services/axiosInstance"
import useSnackbar from "../../hooks/useSnackbar";

const ErrorHandler = ({ children }) => {

    const { showSnakbar } = useSnackbar()

    // axiosInstance.interceptors.response.use(res => {
    //     return res.data;
    // }, (error) => {
    //     const { data } = error.response
    //     showSnakbar({ variant: "error", message: data.message })
    //     return Promise.reject(data)
    // });

    return children
}

export default ErrorHandler