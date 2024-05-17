import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useUpdateCategory = () => {
  const { mutate } = useSWRConfig();

  const updateCategory = async (
    id: string,
    formData: { title: string; description: string }
  ) => {
    await axios.put(`/categories?id=${id}`, formData);
    mutate("/categories"); // Revalidate the categories route
  };

  return { updateCategory };
};
