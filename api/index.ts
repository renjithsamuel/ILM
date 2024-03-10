import axios from "axios";
import { QueryClient, DefaultOptions } from "react-query";
import { Cookie } from "@/utils/cookies";

const queryClientOptions: DefaultOptions = {
  queries: {
    cacheTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryClientOptions,
});

export const PublicAxios = axios.create({
  baseURL: "http://localhost:8000/ilm-service/v1/",
  headers: {
    "Content-Type":  "application/json",
  },
});

export const PrivateAxios = axios.create({
  baseURL: "http://localhost:8000/ilm-service/v1/",
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    authorization: `Bearer ${Cookie.access_token}`,
    "Content-Type":  "application/json",
  },
});
