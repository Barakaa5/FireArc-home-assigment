"use client";
import HeaderLayout from "@/clients/components/HeaderLayout";

export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderLayout>{children}</HeaderLayout>;
}
