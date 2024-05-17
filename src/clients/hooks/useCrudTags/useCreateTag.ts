import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useCreateTag = () => {
  const { mutate } = useSWRConfig();

  const createTag = async (formData: {
    title: string;
    description: string;
  }) => {
    await axios.post("/tags", formData);
    mutate("/tags"); // Revalidate the tags route
  };

  return { createTag };
};
