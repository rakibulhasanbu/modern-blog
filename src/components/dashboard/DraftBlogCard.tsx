import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import Link from "next/link";
import { toast } from "react-toastify";

type TDraftBlogCard = {
  blog: TBlog;
  index: number;
};

const DraftBlogCard = ({ blog, index }: TDraftBlogCard) => {
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
    <div className="flex gap-5 lg:gap-10 border-b mb-6 border-grey pb-6">
      <h1 className="blog-index text-center pl-4 md:pl-6 flex-none">
        {index < 10 ? "0" + (index + 1) : index}
      </h1>
      <div className="">
        <h1 className="blog-title mb-3">{blog?.title}</h1>
        <p className="line-clamp-2 font-gelasio">
          {blog?.description?.length ? blog.description : "No Description"}
        </p>
        <div className="flex gap-6 mt-3">
          <Link
            className="pr-4 py-2 underline"
            href={`/editor?slug=${blog?.slug}`}
          >
            Edit
          </Link>
          <button
            disabled={isLoading}
            onClick={() => handleDeleteBlog(blog?.slug)}
            className="pr-4 py-2 underline text-red"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftBlogCard;
