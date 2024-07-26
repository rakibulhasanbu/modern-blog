import { TBlog } from "@/types";
import CommentField from "./CommentField";
import { useGetCommentsByBlogIdQuery } from "@/redux/features/comment/commentApi";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import AnimationWrapper from "../ui/AnimationWrapper";
import CommentCard from "./CommentCard";
import LoadMoreBtn from "../home/LoadMoreBtn";
import { useEffect, useMemo, useState } from "react";

type TCommentContainer = {
  blog: TBlog;
  commentWrapper: boolean;
  setCommentWrapper: (commentWrapper: boolean) => void;
};

const CommentContainer = ({
  setCommentWrapper,
  commentWrapper,
  blog,
}: TCommentContainer) => {
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    const info = {
      page,
    };
    return Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
  }, [page]);

  const { data, isSuccess } = useGetCommentsByBlogIdQuery({
    id: blog?._id,
    queryString,
  });

  const [comments, setComments] = useState(data?.data?.data || []);

  useEffect(() => {
    if (data?.data?.data) {
      setComments((prevComments: []) => {
        const allComments = [...data.data.data, ...prevComments];
        const uniqueComments = Array.from(
          new Map(
            allComments.map((comment) => [comment?._id, comment])
          ).values()
        );
        uniqueComments.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        return uniqueComments;
      });
    }
  }, [data?.data?.data, isSuccess]);

  console.log(data?.data?.data);

  return (
    <div
      className={`max-sm:w-full fixed ${
        commentWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
      } duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden`}
    >
      <div className="relative">
        <h1 className="text-xl font-medium">Comments</h1>
        <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">
          {blog?.title}
        </p>

        <button
          onClick={() => setCommentWrapper(!commentWrapper)}
          className="absolute top-0 right-0 flex justify-center items-center size-12 rounded-full bg-grey"
        >
          <i className="fi fi-br-cross text-xl mt-1"></i>
        </button>
      </div>
      <hr className="border-grey my-8 w-[120%] -ml-10" />

      <CommentField
        blogAuthor={blog?.author?._id}
        blogId={blog?._id}
        action="Comment"
      />

      {comments?.length > 0 ? (
        comments?.map((comment: any, i: number) => (
          <AnimationWrapper key={i}>
            <CommentCard
              leftVal={comment.isReply ? 1 : 0 * 4}
              comment={comment}
            />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No Comments" />
      )}

      <LoadMoreBtn state={data?.data} stateFunction={setPage} />
    </div>
  );
};

export default CommentContainer;
