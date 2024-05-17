import { Stack, TextInput, Textarea, Button } from "@mantine/core";

interface CategoryFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  editing: boolean;
}

export const CategoryForm = ({
  formData,
  setFormData,
  onSubmit,
  editing,
}: CategoryFormProps) => {
  return (
    <Stack>
      <TextInput
        label="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.currentTarget.value })
        }
      />
      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.currentTarget.value })
        }
      />
      <Button onClick={onSubmit}>
        {editing ? "Update Category" : "Create Category"}
      </Button>
    </Stack>
  );
};
