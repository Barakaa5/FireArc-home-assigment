import { Stack, TextInput, Textarea, Button } from "@mantine/core";

interface TagFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  editing: boolean;
}

export const TagForm = ({
  formData,
  setFormData,
  onSubmit,
  editing,
}: TagFormProps) => {
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
        {editing ? "Update Tag" : "Create Tag"}
      </Button>
    </Stack>
  );
};
