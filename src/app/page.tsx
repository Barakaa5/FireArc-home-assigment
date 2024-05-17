"use client";

import { Stack, Title, Button, Group, AppShell } from "@mantine/core";
import { IconCategory, IconArticle, IconTags } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderLayout from "@/clients/components/HeaderLayout";

export default function Home() {
  const router = useRouter();

  return (
    <HeaderLayout>
      <Stack align="center" justify="center" mt={20} px={0} py={20}>
        <Title>Welcome To FireArc Home Assignment</Title>
        <Group>
          <Button
            variant="default"
            leftSection={<IconCategory size={20} />}
            onClick={() => router.push("/categories")}
          >
            Category Management
          </Button>
          <Button
            variant="default"
            leftSection={<IconArticle size={20} />}
            onClick={() => router.push("/articles")}
          >
            Article Management
          </Button>
          <Button
            variant="default"
            leftSection={<IconTags size={20} />}
            onClick={() => router.push("/tags")}
          >
            Tags Management
          </Button>
        </Group>
      </Stack>
    </HeaderLayout>
  );
}
