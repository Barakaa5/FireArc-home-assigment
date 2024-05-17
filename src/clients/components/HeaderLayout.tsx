import { Anchor, AppShell, Box, Button, Group } from "@mantine/core";
import Image from "next/image";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 100 }}>
      <AppShell.Header withBorder p={20}>
        <Group justify="space-between">
          <Image src={"/FireArc-Logo.png"} alt="Logo" width={200} height={50} />
          <Group>
            <Anchor href="/categories">Categories</Anchor>
            <Anchor href="/articles">Articles</Anchor>
            <Anchor href="/tags">Tags</Anchor>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
