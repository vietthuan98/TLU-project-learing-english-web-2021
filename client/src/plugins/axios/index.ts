import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import TokenServices from "@/helpers/token";

export interface Response extends AxiosResponse {
  success: boolean;
  message: string;
  data: {};
  code: number;
}

const axiosInstance = axios.create({
  baseURL: "/",
  headers: {}
});

//func logout -> remove token from local -> redirect login page
export const logout = () => {
  TokenServices.removeToken();
  TokenServices.removeUser();
};

axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
  //handle token
  request.headers = {
    ...TokenServices.getHeaders()
  };
  request.params = { ...request.params, v: Date.now() };
  return request;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 200) response.data.success = true;
    return response.data;
  },
  error => {
    if (error.response) {
      if (error.response.data.code === 401) {
        //"Unauthorized"
        logout();
      }
      //check code unauthorized -> call logout()
      error.response.data = {
        ...(error?.response?.data || {}),
        success: false
      };
      return error?.response?.data;
    } else if (error.request) {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        isRequestError: true,
        message: error.message
      };
      return error.request?.data;
    }
  }
);

export default axiosInstance;
