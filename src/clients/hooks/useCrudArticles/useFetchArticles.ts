import axios from "@/lib/axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchArticles = () => {
  const { data, error, isLoading } = useSWR("/articles", fetcher);

  return {
    articles: data,
    error,
    isLoading,
  };
};
