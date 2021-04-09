import axios, { Response } from '@/plugins/axios';
import { IRegisterBody, ILoginBody, IAuthUser } from '@/modules/auth/constants';

const API_URL = process.env.VUE_APP_API_URL;

class BaseAPI {
    prefix: string;
    url: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.url = `${API_URL}${this.prefix}`;
    }
}

export default BaseAPI;