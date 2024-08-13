"use client";

import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useGetIsLikedByUserQuery,
  useLikeBlogMutation,
} from "@/redux/features/blog/blogApi";
import { useAppSelector } from "@/redux/hook";
import { TBlog } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type TBlogInteraction = {
  blog: TBlog;
  commentWrapper: boolean;
  setCommentWrapper: (commentWrapper: boolean) => void;
};

const BlogInteraction = ({
  blog,
  commentWrapper,
  setCommentWrapper,
}: TBlogInteraction) => {
  // const location = getLocationOrigin();

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data: isLikedData, refetch } = useGetIsLikedByUserQuery(blog?._id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [likeBlog, { data, isSuccess }] = useLikeBlogMutation();
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const handleLike = async () => {
    if (token) {
      setIsLikedByUser((prev) => !prev);

      const submittedData = {
        likedByUser: isLikedByUser,
        id: blog?._id,
      };

      await likeBlog(submittedData);
    } else {
      return toast.error("Please login to like this blog.");
    }
  };

  useEffect(() => {
    refetch();
    if (token && isLikedData) {
      if (isLikedData?.data?._id) {
        setIsLikedByUser(Boolean(isLikedData));
      }
    }
  }, [isLikedData?.data?._id]);

  const twitterLink = "https://twitter.com";
  // typeof window !== "undefined"
  //   ? `https://twitter.com/intent/tweet?text=Read${blog?.title}&url=${location}`
  //   : "";

  return (
    <div className="">
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className={`size-10 rounded-full flex items-center justify-center ${
              isLikedByUser ? "bg-red/20 text-red" : "bg-grey/80"
            }`}
          >
            <i
              className={`fi text-xl ${
                isLikedByUser ? "fi-sr-heart" : "fi-rr-heart"
              }`}
            ></i>
          </button>
          <p className="text-xl text-dark-grey">
            {blog?.activity?.total_likes}
          </p>

          <button
            onClick={() => setCommentWrapper(!commentWrapper)}
            className="size-10 rounded-full flex items-center justify-center bg-grey/80"
          >
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
          <Link target="_blank" href={twitterLink}>
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </div>
  );
};

export default BlogInteraction;
