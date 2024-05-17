import { Card, Image, Group, Title, Text, Button } from "@mantine/core";
import { CardArticle } from "../types";

interface ArticleCardProps {
  article: CardArticle;
  onEdit: (article: any) => void;
  onDelete: (id: string) => void;
}

export const ArticleCard = ({
  article,
  onEdit,
  onDelete,
}: ArticleCardProps) => {
  return (
    <Card shadow="sm" padding="lg" w={300} mt={20}>
      <Card.Section>
        <Image src={article.imageUrl} height={160} alt="Article Image" />
      </Card.Section>
      <Group justify="apart" mt={10} mb={5}>
        <Title order={4}>Title: {article.title}</Title>
      </Group>
      <Text size="sm" c="dimmed">
        Description: {article.description}
      </Text>
      <Text size="sm" mt={10}>
        Body: {article.body}
      </Text>
      <Group justify="flex-end" mt={20}>
        <Button onClick={() => onEdit(article)}>Edit</Button>
        <Button color="red" onClick={() => onDelete(article.id)}>
          Delete
        </Button>
      </Group>
    </Card>
  );
};
