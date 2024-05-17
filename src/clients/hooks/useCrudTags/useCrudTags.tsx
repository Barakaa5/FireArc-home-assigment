import { useState } from "react";
import { useFetchTags } from "./useFetchTags";
import { useCreateTag } from "./useCreateTag";
import { useUpdateTag } from "./useUpdateTag";
import { useDeleteTag } from "./useDeleteTag";

export const useCrudTags = () => {
  const { tags, error, isLoading } = useFetchTags();
  const { createTag } = useCreateTag();
  const { updateTag } = useUpdateTag();
  const { deleteTag } = useDeleteTag();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreateUpdate = async () => {
    if (editing) {
      await updateTag(editingId!, formData);
    } else {
      await createTag(formData);
    }
    setModalOpen(false);
    resetFormData();
  };

  const handleEdit = (tag: any) => {
    setEditing(true);
    setEditingId(tag.id);
    setFormData({
      title: tag.title,
      description: tag.description,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTag(id);
  };

  const resetFormData = () => {
    setFormData({ title: "", description: "" });
    setEditing(false);
    setEditingId(null);
  };

  const resetAll = () => {
    resetFormData();
    setModalOpen(false);
  };

  return {
    tags,
    modalOpen,
    formData,
    editing,
    error,
    isLoading,
    setModalOpen,
    setFormData,
    handleCreateUpdate,
    handleEdit,
    handleDelete,
    resetAll,
  };
};
