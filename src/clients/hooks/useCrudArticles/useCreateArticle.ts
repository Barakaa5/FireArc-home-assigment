import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useCreateArticle = () => {
  const { mutate } = useSWRConfig();

  const createArticle = async (formData: {
    title: string;
    description: string;
    body: string;
  }) => {
    await axios.post("/articles", formData);
    mutate("/articles"); // Revalidate the articles route
  };

  return { createArticle };
};
