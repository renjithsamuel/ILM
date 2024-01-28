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
  baseURL: "http://localhost:8000/ilm/v1/",
});

export const PrivateAxios = axios.create({
  baseURL: "http://localhost:8000/ilm/v1/",
  headers: {
    authorization: `Bearer ${Cookie.access_token}`,
    Session: `${Cookie.session}`,
  },
});
