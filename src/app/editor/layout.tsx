"use client";

import PrivetLayout from "@/components/shared/PrivetLayout";

const EditorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <PrivetLayout>{children}</PrivetLayout>;
};

export default EditorLayout;
