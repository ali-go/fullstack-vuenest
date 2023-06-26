import axios from 'axios';
import { TIME_OUT, BASE_URL } from './config';
const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.error(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.error(err);
  }
);

export { instance };
