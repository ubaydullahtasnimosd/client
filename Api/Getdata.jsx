import axios from "axios";

export const BaseUrl = "https://server-iota-ebon-83.vercel.app";

export const api = axios.create({
  baseURL: `${BaseUrl}/api/v1`,
});
