import { Category } from "@/server/types";
import { Card, Group, Title, Text, Button } from "@mantine/core";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  return (
    <Card shadow="sm" padding="lg" mt={20} w={300}>
      <Group justify="apart" mt={10} mb={5}>
        <Title order={4}>Title: {category.title}</Title>
      </Group>
      <Text size="sm" c="dimmed">
        Description: {category.description}
      </Text>
      <Group justify="flex-end" mt={10}>
        <Button size="xs" onClick={() => onEdit(category)}>
          Edit
        </Button>
        <Button size="xs" color="red" onClick={() => onDelete(category.id)}>
          Delete
        </Button>
      </Group>
    </Card>
  );
};
