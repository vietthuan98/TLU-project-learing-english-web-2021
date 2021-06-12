import axios, { Response } from "@/plugins/axios";
import { RegisterBody, LoginBody, AuthUser } from "@/modules/auth/constants";

const API_URL = process.env.VUE_APP_API_URL;
export interface AuthResponse extends Response {
  data: {
    token: string;
    user: AuthUser;
  };
  success: boolean;
  message: string;
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
    const url = `${this.url}/register`;
    return await axios.post(url, data);
  }

  async updateProfile(data: Record<string, any>): Promise<AuthResponse> {
    const url = `${this.url}/profile`;
    return await axios.patch(url, data);
  }
}

const authAPI = new AuthAPI("/auth");
export default authAPI;
