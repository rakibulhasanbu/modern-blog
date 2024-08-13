"use client";

import { useGetTrendingBlogsQuery } from "@/redux/features/blog/blogApi";
import AnimationWrapper from "../ui/AnimationWrapper";
import MinimalBlogPost from "./MinimalBlogPost";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import AppLoading from "../ui/AppLoading";

const TrendingBlogs = () => {
  const { data, isLoading } = useGetTrendingBlogsQuery("");

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      {data?.data?.length ? (
        data?.data?.map((blog: any, i: number) => (
          <AnimationWrapper
            key={i}
            transition={{ duration: 1, delay: i * 0.1 }}
          >
            <MinimalBlogPost blog={blog} index={i} />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No trending blogs found!" />
      )}
    </>
  );
};

export default TrendingBlogs;
