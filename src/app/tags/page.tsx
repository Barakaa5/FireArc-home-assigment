"use client";

import { TagCard, TagForm } from "@/clients/components";
import { useCrudTags } from "@/clients/hooks/useCrudTags/useCrudTags";
import { Tag } from "@/server/types";
import { Stack, Title, Button, Modal, Box, Loader } from "@mantine/core";

export default function TagList() {
  const {
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
  } = useCrudTags();

  return (
    <Stack align="center" justify="center" mt={20} px={0} py={20}>
      <Title>Tags</Title>
      <Button onClick={() => setModalOpen(true)}>Create New Tag</Button>
      {tags && (
        <Stack>
          {tags.map((tag: Tag) => (
            <TagCard
              key={tag.id}
              tag={tag}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      )}
      {isLoading && <Loader mt={40} />}
      {error && <Box>Failed to load tags</Box>}
      {!tags && !isLoading && !error && <Box>No tags found</Box>}
      <Modal
        opened={modalOpen}
        onClose={resetAll}
        title={editing ? "Edit Tag" : "Create Tag"}
      >
        <TagForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateUpdate}
          editing={editing}
        />
      </Modal>
    </Stack>
  );
}
