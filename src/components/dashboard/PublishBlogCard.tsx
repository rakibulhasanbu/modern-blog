import { TBlog } from "@/types";
import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BlogStats from "./BlogStats";
import { toast } from "react-toastify";
import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";

type TPublishedBlogCard = {
  blog: TBlog;
};

const PublishBlogCard = ({ blog }: TPublishedBlogCard) => {
  const [showStats, setShowStats] = useState(false);

  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDeleteBlog = async (slug: string) => {
    await deleteBlog(slug)
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Blog deleted Successfully.");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  return (
    <>
      <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
        <Image
          src={blog?.banner as string}
          alt="banner image"
          className="max-md:hidden lg:hidden xl:block size-28 flex-none bg-grey object-cover"
          width={120}
          height={120}
        />
        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div className="">
            <Link
              className="blog-title mb-4 hover:underline"
              href={`/blog/${blog?.slug}`}
            >
              {blog?.title}
            </Link>
            <p className="line-clamp-1">
              Published on {getDay(blog?.createdAt)}
            </p>
          </div>

          <div className="flex gap-6 mt-3">
            <Link
              className="pr-4 py-2 underline"
              href={`/editor?slug=${blog?.slug}`}
            >
              Edit
            </Link>
            <button
              onClick={() => setShowStats((prev) => !prev)}
              className="lg:hidden pr-4 py-2 underline"
            >
              Stats
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleDeleteBlog(blog?.slug)}
              className="pr-4 py-2 underline text-red"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="max-lg:hidden">
          <BlogStats stats={blog?.activity} />
        </div>
      </div>
      {showStats && (
        <div className="lg:hidden">
          <BlogStats stats={blog?.activity} />
        </div>
      )}
    </>
  );
};

export default PublishBlogCard;
