import { useState } from "react";
import { useFetchArticles } from "./useFetchArticles";
import { useCreateArticle } from "./useCreateArticle";
import { useUpdateArticle } from "./useUpdateArticle";
import { useDeleteArticle } from "./useDeleteArticle";
import { Article } from "@/server/types";

export const useCrudArticles = () => {
  const { articles, error, isLoading } = useFetchArticles();
  const { createArticle } = useCreateArticle();
  const { updateArticle } = useUpdateArticle();
  const { deleteArticle } = useDeleteArticle();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Article>({
    id: "",
    date: "",
    title: "",
    description: "",
    body: "",
    categoryId: "",
    tagIds: [],
    imageUrl: "",
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreateUpdate = async () => {
    if (editing) {
      await updateArticle(editingId!, formData);
    } else {
      await createArticle(formData);
    }
    setModalOpen(false);
    resetFormData();
  };

  const handleEdit = (article: any) => {
    setEditing(true);
    setEditingId(article.id);
    setFormData({
      id: article.id,
      date: article.date,
      title: article.title,
      description: article.description,
      body: article.body,
      categoryId: article.categoryId,
      tagIds: article.tagIds,
      imageUrl: article.imageUrl,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteArticle(id);
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      date: "",
      title: "",
      description: "",
      body: "",
      categoryId: "",
      tagIds: [],
      imageUrl: "",
    });
    setEditing(false);
    setEditingId(null);
  };

  const resetAll = () => {
    resetFormData();
    setModalOpen(false);
  };

  return {
    articles,
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
