"use client";

import { Stack, Title, Button, Group } from "@mantine/core";
import { IconCategory, IconArticle, IconTags } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/clients/components/HeaderLayout";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <HeaderLayout>
      <Stack align="center" justify="center" mt={20} px={0} py={20}>
        <Title>Welcome To FireArc Home Assignment</Title>
        <Group>
          <Link href="/categories">
            <Button variant="default" leftSection={<IconCategory size={20} />}>
              Category Management
            </Button>
          </Link>

          <Link href="/articles">
            <Button variant="default" leftSection={<IconArticle size={20} />}>
              Article Management
            </Button>
          </Link>

          <Link href="/tags">
            <Button variant="default" leftSection={<IconTags size={20} />}>
              Tags Management
            </Button>
          </Link>
        </Group>
      </Stack>
    </HeaderLayout>
  );
}
