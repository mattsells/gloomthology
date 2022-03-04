import axios from 'axios';

const http = axios.create({
  baseURL: '/api/',
});

http.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error)
);

export default http;
