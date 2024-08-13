"use client";

import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogCard from "./BlogCard";
import AnimationWrapper from "../ui/AnimationWrapper";
import { useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useAppSelector } from "@/redux/hook";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import LoadMoreBtn from "./LoadMoreBtn";
import AppLoading from "../ui/AppLoading";

const LatestBlogs = ({ id }: { id?: string }) => {
  const [page, setPage] = useState(1);
  const { blogSearch, category } = useAppSelector((state) => state.blog);
  const debouncedSearch = useDebounce(blogSearch, 500);

  const queryString = useMemo(() => {
    const info = {
      category: category !== "home" ? category : undefined,
      page,
      id: id?.length ? id : undefined,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };

    return Object.keys(info).reduce((pre, key: string) => {
      if (key === "isSold") {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${false}`;
      } else {
        const value = info[key as keyof typeof info];
        if (value) {
          return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
        }
      }
      return pre;
    }, "");
  }, [category, debouncedSearch, id, page]);

  const { data, isLoading } = useGetBlogsQuery(queryString);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      {data?.data?.data?.length ? (
        data?.data?.data?.map((blog: any, i: number) => (
          <AnimationWrapper
            key={blog?.title}
            transition={{ duration: 1, delay: i * 0.1 }}
          >
            <BlogCard blog={blog} />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No blogs Published Yet." />
      )}
      <LoadMoreBtn state={data?.data} stateFunction={setPage} />
    </>
  );
};

export default LatestBlogs;
