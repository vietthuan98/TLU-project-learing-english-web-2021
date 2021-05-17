import axios, { Response } from "@/plugins/axios";

const API_URL = process.env.VUE_APP_API_URL;

class BaseAPI<P, F, DResponse extends Response, LResponse extends Response> {
  prefix: string;
  url: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.url = `${API_URL}${this.prefix}`;
  }

  async fetch(params: P): Promise<LResponse> {
    return await axios.get(this.url, { params });
  }

  async detail(id: string): Promise<DResponse> {
    return await axios.get(this.url + "/" + id);
  }

  async create(data: F): Promise<DResponse> {
    return await axios.post(this.url, data);
  }

  async update(id: string, data: F): Promise<DResponse> {
    return await axios.patch(this.url + "/" + id, data);
  }
}

export default BaseAPI;
