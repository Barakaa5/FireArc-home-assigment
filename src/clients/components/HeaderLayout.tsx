import { Anchor, AppShell, Box, Button, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

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
            <Link href="/categories">Categories</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/tags">Tags</Link>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
