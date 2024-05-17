import axios from "@/lib/axios";
import { useSWRConfig } from "swr";

export const useDeleteTag = () => {
  const { mutate } = useSWRConfig();

  const deleteTag = async (id: string) => {
    await axios.delete(`/tags?id=${id}`);
    mutate("/tags"); // Revalidate the tags route
  };

  return { deleteTag };
};
