import { AuthUser } from "@/modules/auth/constants";

const TokenServices = {
  setUser(user: AuthUser) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUser(): Record<string, string> {
    const userString = localStorage.getItem("user");
    if (userString) return JSON.parse(userString as string);
    return {};
  },

  getUserType() {
    const user = this.getUser();
    return user.type;
  },

  getUserRoles() {
    const user = this.getUser();
    return user.roles;
  },

  getHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`
    };
  },

  getHeadersToUploadFile() {
    return {
      "Content-Type": "multipart/form-data"
    };
  },

  removeUser() {
    localStorage.removeItem("user");
  },

  removeToken() {
    localStorage.removeItem("token");
  }
};
export default TokenServices;
