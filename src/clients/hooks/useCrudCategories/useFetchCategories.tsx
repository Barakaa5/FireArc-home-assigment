import axios from "@/lib/axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchCategories = () => {
  const { data, error, isLoading } = useSWR("/categories", fetcher);
  return {
    categories: data,
    error,
    isLoading,
  };
};
