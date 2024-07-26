import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import { useMemo } from "react";
import AnimationWrapper from "../ui/AnimationWrapper";
import BlogCard from "../home/BlogCard";
import AppLoading from "../ui/AppLoading";

type TSimilarBlogs = {
  blog: TBlog;
};

const SimilarBlogs = ({ blog }: TSimilarBlogs) => {
  const queryString = useMemo(() => {
    const info = {
      category: (blog?.tags as any)[0],
      limit: 5,
      eliminateBlog: blog.slug,
    };

    return Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }

      return pre;
    }, "");
  }, [blog]);

  const { data, isLoading } = useGetBlogsQuery(queryString);

  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <>
      {data?.data?.data?.length ? (
        <>
          <h1 className="text-2xl mt-14 mb-10 font-medium">Similar Blogs</h1>
          {data?.data?.data?.map((blog: any, i: number) => (
            <AnimationWrapper
              key={i}
              transition={{ duration: 1, delay: i * 0.08 }}
            >
              <BlogCard blog={blog} />
            </AnimationWrapper>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SimilarBlogs;
