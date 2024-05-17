import {
  Stack,
  TextInput,
  Textarea,
  Button,
  Select,
  MultiSelect,
} from "@mantine/core";
import { CardArticle } from "../types";
import { useFetchCategories } from "../hooks/useCrudCategories/useFetchCategories";
import { Category, Tag } from "@/server/types";
import { useFetchTags } from "../hooks/useCrudTags/useFetchTags";

interface ArticleFormProps {
  formData: CardArticle;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  editing: boolean;
}
export const ArticleForm = ({
  formData,
  setFormData,
  onSubmit,
  editing,
}: ArticleFormProps) => {
  const { categories } = useFetchCategories();
  const { tags } = useFetchTags();

  return (
    <Stack>
      <TextInput
        label="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.currentTarget.value })
        }
      />
      <TextInput
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.currentTarget.value })
        }
      />
      <Textarea
        label="Body"
        value={formData.body}
        onChange={(e) =>
          setFormData({ ...formData, body: e.currentTarget.value })
        }
      />
      <Select
        label="Category"
        placeholder="Select a category"
        value={formData.categoryId}
        onChange={(value) => setFormData({ ...formData, categoryId: value })}
        data={
          categories?.map((category: Category) => ({
            value: category.id,
            label: category.title,
          })) || []
        }
      />
      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        value={formData.tagIds}
        onChange={(value) => setFormData({ ...formData, tagIds: value })}
        data={
          tags?.map((tag: Tag) => ({ value: tag.id, label: tag.title })) || []
        }
      />
      <Button onClick={onSubmit}>
        {editing ? "Update Article" : "Create Article"}
      </Button>
    </Stack>
  );
};
