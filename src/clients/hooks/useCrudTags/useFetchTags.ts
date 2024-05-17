import axios from "@/lib/axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchTags = () => {
  const { data, error, mutate } = useSWR("/tags", fetcher);
  return {
    tags: data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};
