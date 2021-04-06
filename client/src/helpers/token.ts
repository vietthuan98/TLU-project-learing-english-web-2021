import { IAuthUser } from '@/modules/auth/constants';

const TokenServices = {
    setUser(user: IAuthUser) {
        localStorage.setItem("user", JSON.stringify(user));
    },

    setToken(token: string) {
        localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        const userString = localStorage.getItem("user");
        if (userString) return JSON.parse(userString as string);
    },

    getUserType() {
        const user = this.getUser();
        return user.type;
    },

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.getToken()}`,
        }
    },

    getHeadersToUploadFile() {
        return {
            'Content-Type': 'multipart/form-data',
        }
    },

    removeUser() {
        localStorage.removeItem('user');
    },

    removeToken() {
        localStorage.removeItem('token');
    }
}
export default TokenServices;