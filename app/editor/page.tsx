"use client";

import BlogEditor from "@/components/editor/BlogEditor";
import PublishForm from "@/components/editor/PublishForm";
import AppLoading from "@/components/ui/AppLoading";
import { useGetBlogBySlugQuery } from "@/redux/features/blog/blogApi";
import { setBlog, setBlogContent } from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const slug = useSearchParams().get("slug");

  const { data, isLoading } = useGetBlogBySlugQuery(
    { slug, mode: "edit" },
    { skip: !slug }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(setBlogContent(data?.data?.content));
      dispatch(
        setBlog({
          title: data?.data?.title,
          banner: data?.data?.banner,
          tags: data?.data?.tags,
          description: data?.data?.description,
        })
      );
    }
    if (!slug) {
      dispatch(setBlogContent([]));
      dispatch(
        setBlog({
          blog: {
            title: "",
            banner: "",
            tags: [],
            description: "",
          },
        })
      );
    }
  }, [data, dispatch, slug]);

  if (isLoading) {
    <AppLoading />;
  }

  const { editorState } = useAppSelector((state) => state.blog);
  return (
    <>
      {editorState === "editor" ? (
        <BlogEditor content={data?.data?.content} slug={slug} />
      ) : (
        <PublishForm slug={slug} />
      )}
    </>
  );
};

export default Page;
