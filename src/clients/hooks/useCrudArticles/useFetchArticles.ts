import axios from "@/lib/axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchArticles = () => {
  const { data, error, mutate } = useSWR("/articles", fetcher);
  console.log("data", data);

  return {
    articles: data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};
