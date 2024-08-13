"use client";

import BlogContent from "@/components/blog/BlogContent";
import BlogInteraction from "@/components/blog/BlogInteraction";
import CommentContainer from "@/components/blog/CommentContainer";
import SimilarBlogs from "@/components/blog/SimilarBlogs";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppLoading from "@/components/ui/AppLoading";
import { useGetBlogBySlugQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import { getDay } from "@/utils/formateDate";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const BlogDetails = () => {
  const [commentWrapper, setCommentWrapper] = useState(false);
  const { slug } = useParams();
  const { data, isLoading } = useGetBlogBySlugQuery({ slug });
  const blog = data?.data as TBlog;

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AnimationWrapper>
      <CommentContainer
        blog={blog}
        commentWrapper={commentWrapper}
        setCommentWrapper={setCommentWrapper}
      />

      <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
        <img src={blog?.banner} alt="" className="aspect-video" />
        <div className="mt-12">
          <h2>{blog?.title}</h2>
          <div className="flex max-sm:flex-col justify-between my-8">
            <div className="flex gap-5 ">
              <img
                src={blog?.author?.personalInfo?.profileImg}
                alt="avatar"
                className="size-12 rounded-full"
              />
              <p className="capitalize">
                {blog?.author?.personalInfo?.fullName} <br /> @
                <Link
                  className="underline"
                  href={`/user/${blog?.author?.personalInfo?.username}`}
                >
                  {blog?.author?.personalInfo?.username}
                </Link>
              </p>
            </div>
            <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
              Published on {getDay(blog?.createdAt)}
            </p>
          </div>
        </div>
        <BlogInteraction
          commentWrapper={commentWrapper}
          setCommentWrapper={setCommentWrapper}
          blog={blog}
        />

        <div className="my-12 font-gelasio blog-page-content">
          {blog.content?.map((content: any, i) => (
            <div key={i} className="my-4 md:my-8">
              <BlogContent content={content} />
            </div>
          ))}
        </div>

        <BlogInteraction
          commentWrapper={commentWrapper}
          setCommentWrapper={setCommentWrapper}
          blog={blog}
        />
        <SimilarBlogs blog={blog} />
      </div>
    </AnimationWrapper>
  );
};

export default BlogDetails;