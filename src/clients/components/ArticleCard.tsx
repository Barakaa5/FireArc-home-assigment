import {
  Card,
  Image,
  Group,
  Title,
  Text,
  Button,
  Badge,
  Divider,
  Stack,
} from "@mantine/core";
import { CardArticle } from "../types";
import { Tag } from "@/server/types";

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
      <Stack gap={4}>
        <Group justify="apart" mt={10} mb={5}>
          <Title order={4}>Title: {article.title}</Title>
        </Group>
        <Text size="sm" c="dimmed">
          Date: {new Date(article.date).toLocaleDateString()}
        </Text>
        <Text size="sm" c="dimmed">
          Description: {article.description}
        </Text>
        <Text size="sm" c="dimmed">
          Category: {article.category?.title || "None"}
        </Text>
        {Boolean(article?.tags?.length) && (
          <Group>
            Tags:{" "}
            {article.tags?.map((tag: Tag) => (
              <Badge key={tag.id}>{tag.title}</Badge>
            ))}
          </Group>
        )}
        <Divider my={10} />
        <Text size="sm">Body: {article.body}</Text>
      </Stack>

      <Group justify="flex-end" mt={20}>
        <Button size="xs" onClick={() => onEdit(article)}>
          Edit
        </Button>
        <Button size="xs" color="red" onClick={() => onDelete(article.id)}>
          Delete
        </Button>
      </Group>
    </Card>
  );
};
