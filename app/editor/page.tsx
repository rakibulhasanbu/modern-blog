"use client";

import BlogEditor from "@/components/editor/BlogEditor";
import PublishForm from "@/components/editor/PublishForm";
import { useAppSelector } from "@/redux/hook";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const slug = useSearchParams().get("slug");
  console.log(slug);
  const { editorState } = useAppSelector((state) => state.blog);
  return <>{editorState === "editor" ? <BlogEditor /> : <PublishForm />}</>;
};

export default Page;
