"use client";

import { CategoryCard, CategoryForm } from "@/clients/components";
import { useCrudCategories } from "@/clients/hooks/useCrudCategories/useCrudCategories";
import { Category } from "@/server/types";
import { Stack, Title, Button, Modal, Box, Loader, Group } from "@mantine/core";

export default function CategoryList() {
  const {
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
  } = useCrudCategories();

  return (
    <Stack align="center" justify="center" mt={20} px={0} py={20}>
      <Title>Categories</Title>
      <Button onClick={() => setModalOpen(true)}>Create New Category</Button>
      {categories && (
        <Group>
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Group>
      )}
      {isLoading && <Loader mt={40} />}
      {error && <Box>Failed to load categories</Box>}
      {!categories && !isLoading && !error && <Box>No categories found</Box>}
      <Modal
        opened={modalOpen}
        onClose={resetAll}
        title={editing ? "Edit Category" : "Create Category"}
      >
        <CategoryForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateUpdate}
          editing={editing}
        />
      </Modal>
    </Stack>
  );
}
