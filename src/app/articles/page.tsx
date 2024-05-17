"use client";

import { ArticleCard, ArticleForm } from "@/clients/components";
import { useCrudArticles } from "@/clients/hooks";
import { CardArticle } from "@/clients/types";
import { Stack, Title, Button, Modal, Box, Loader, Group } from "@mantine/core";

export default function ArticleList() {
  const {
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
  } = useCrudArticles();

  return (
    <Stack align="center" justify="center" mt={20} px={0} py={20}>
      <Title>Articles</Title>
      <Button onClick={() => setModalOpen(true)}>Create New Article</Button>
      {articles && (
        <Group>
          {articles.map((article: CardArticle) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Group>
      )}
      {isLoading && <Loader mt={40} />}
      {error && <Box>Failed to load articles</Box>}
      {!articles && !isLoading && !error && <Box>No articles found</Box>}
      <Modal
        opened={modalOpen}
        onClose={resetAll}
        title={editing ? "Edit Article" : "Create Article"}
      >
        <ArticleForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateUpdate}
          editing={editing}
        />
      </Modal>
    </Stack>
  );
}
