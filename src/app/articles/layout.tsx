"use client";
import HeaderLayout from "@/clients/components/HeaderLayout";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderLayout>{children}</HeaderLayout>;
}
