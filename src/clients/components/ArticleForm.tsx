import { Stack, TextInput, Textarea, Button } from "@mantine/core";
import { CardArticle } from "../types";
import { getRandomImage } from "../utils";

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
      <Button onClick={onSubmit}>
        {editing ? "Update Article" : "Create Article"}
      </Button>
    </Stack>
  );
};
