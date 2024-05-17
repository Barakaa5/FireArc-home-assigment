import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useFetchCategories } from "./useFetchCategories";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";
import { useDeleteCategory } from "./useDeleteCategory";

export const useCrudCategories = () => {
  const { categories, error, isLoading } = useFetchCategories();
  const { createCategory } = useCreateCategory();
  const { updateCategory } = useUpdateCategory();
  const { deleteCategory } = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreateUpdate = async () => {
    if (editing) {
      await updateCategory(editingId!, formData);
    } else {
      await createCategory(formData);
    }
    setModalOpen(false);
    resetFormData();
  };

  const handleEdit = (category: any) => {
    setEditing(true);
    setEditingId(category.id);
    setFormData({
      title: category.title,
      description: category.description,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
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
    categories,
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
