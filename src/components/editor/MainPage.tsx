"use client";

import AppLoading from "@/components/ui/AppLoading";
import { useGetBlogBySlugQuery } from "@/redux/features/blog/blogApi";
import { setBlog, setBlogContent } from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import PublishForm from "./PublishForm";
import BlogEditor from "./BlogEditor";

const MainPage = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();

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

export default MainPage;
