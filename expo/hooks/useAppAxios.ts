import axios, { AxiosInstance } from "axios";
import { useSession } from "@/providers/AuthProvider";

export default function useAppAxios(): AxiosInstance {
  const { session } = useSession();

  let instance: AxiosInstance = axios.create();

  instance.interceptors.request.use(
    function (config) {
      if (session) {
        const sessionInfo = JSON.parse(session);
        config.headers["X-Apple-Id-Token"] = sessionInfo["identityToken"];
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  return instance;
}
