"use client";

import BlogEditor from "@/components/editor/BlogEditor";
import PublishForm from "@/components/editor/PublishForm";
import { useAppSelector } from "@/redux/hook";

const Page = () => {
  const { editorState } = useAppSelector((state) => state.blog);
  return <>{editorState === "editor" ? <BlogEditor /> : <PublishForm />}</>;
};

export default Page;
