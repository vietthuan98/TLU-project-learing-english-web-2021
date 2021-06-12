import axios, { Response } from "@/plugins/axios";
import { RegisterBody, LoginBody, AuthUser } from "@/modules/auth/constants";

const API_URL = process.env.VUE_APP_API_URL;
export interface AuthResponse extends Response {
  data: {
    token: string;
    user: AuthUser;
  };
}
class AuthAPI {
  prefix: string;
  url: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.url = `${API_URL}${this.prefix}`;
  }

  async login(param: LoginBody): Promise<AuthResponse> {
    const url = `${this.url}/login`;
    return await axios.post(url, param);
  }

  async register(data: RegisterBody): Promise<AuthResponse> {
    console.log("BASE_URL: ", process.env);
    const url = `${this.url}/register`;
    console.log("url:", url);
    return await axios.post(url, data);
  }
}

const authAPI = new AuthAPI("/auth");
export default authAPI;
