import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useCreateCategory = () => {
  const { mutate } = useSWRConfig();

  const createCategory = async (formData: {
    title: string;
    description: string;
  }) => {
    await axios.post("/categories", formData);
    mutate("/categories"); // Revalidate the categories route
  };

  return { createCategory };
};
