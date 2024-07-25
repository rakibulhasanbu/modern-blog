import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TBlog } from "@/types";
import Link from "next/link";

type TBlogInteraction = {
  blog: TBlog;
};

const BlogInteraction = ({ blog }: TBlogInteraction) => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="">
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button className="size-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-heart text-xl"></i>
          </button>
          <p className="text-xl text-dark-grey">
            {blog?.activity?.total_likes}
          </p>

          <button className="size-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-comment-dots text-xl"></i>
          </button>
          <p className="text-xl text-dark-grey">
            {blog?.activity?.total_comments}
          </p>
        </div>
        <div className="flex gap-6 items-center">
          {blog?.author?.personalInfo?.username === user?.username && (
            <Link
              href={`/editor?slug=${blog?.slug}`}
              className="underline hover:text-purple"
            >
              Edit
            </Link>
          )}
          <Link
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=Read${blog?.title}&url=${location?.href}`}
          >
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </div>
  );
};

export default BlogInteraction;
