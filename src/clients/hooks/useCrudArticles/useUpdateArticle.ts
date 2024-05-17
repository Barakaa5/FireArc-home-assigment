import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useUpdateArticle = () => {
  const { mutate } = useSWRConfig();

  const updateArticle = async (
    id: string,
    formData: { title: string; description: string; body: string }
  ) => {
    await axios.put(`/articles?id=${id}`, formData);
    mutate("/articles"); // Revalidate the articles route
  };

  return { updateArticle };
};
