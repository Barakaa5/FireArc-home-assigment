import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useDeleteArticle = () => {
  const { mutate } = useSWRConfig();

  const deleteArticle = async (id: string) => {
    await axios.delete(`/articles?id=${id}`);
    mutate("/articles"); // Revalidate the articles route
  };

  return { deleteArticle };
};
