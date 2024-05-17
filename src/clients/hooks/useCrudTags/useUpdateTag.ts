import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useUpdateTag = () => {
  const { mutate } = useSWRConfig();

  const updateTag = async (
    id: string,
    formData: { title: string; description: string }
  ) => {
    await axios.put(`/tags?id=${id}`, formData);
    mutate("/tags"); // Revalidate the tags route
  };

  return { updateTag };
};
