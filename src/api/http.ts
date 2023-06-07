import axios, {AxiosInstance} from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: "https://randomuser.me/api",
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
  },
});

export default http