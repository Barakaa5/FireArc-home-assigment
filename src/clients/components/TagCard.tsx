import { Tag } from "@/server/types";
import { Card, Group, Title, Text, Button } from "@mantine/core";

interface TagCardProps {
  tag: Tag;
  onEdit: (tag: Tag) => void;
  onDelete: (id: string) => void;
}

export const TagCard = ({ tag, onEdit, onDelete }: TagCardProps) => {
  return (
    <Card shadow="sm" padding="lg" w={300} mt={20}>
      <Group justify="apart" mt={10} mb={5}>
        <Title order={4}>Title: {tag.title}</Title>
      </Group>
      <Text size="sm" c="dimmed">
        Description: {tag.description}
      </Text>
      <Group justify="flex-end" mt={20}>
        <Button size="xs" onClick={() => onEdit(tag)}>
          Edit
        </Button>
        <Button size="xs" color="red" onClick={() => onDelete(tag.id)}>
          Delete
        </Button>
      </Group>
    </Card>
  );
};
