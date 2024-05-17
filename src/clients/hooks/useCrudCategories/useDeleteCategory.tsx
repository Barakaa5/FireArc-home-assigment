import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useDeleteCategory = () => {
  const { mutate } = useSWRConfig();

  const deleteCategory = async (id: string) => {
    await axios.delete(`/categories?id=${id}`);
    mutate("/categories"); // Revalidate the categories route
  };

  return { deleteCategory };
};
