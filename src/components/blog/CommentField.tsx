import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddCommentMutation } from "@/redux/features/comment/commentApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { toast } from "react-toastify";

type TCommentField = {
  action: string;
  blogId: string;
  blogAuthor: string;
  index?: number;
  replyingTo?: string;
  replying?: boolean;
  setReplying?: (replying: boolean) => void;
};

const CommentField = ({
  action,
  blogId,
  blogAuthor,
  index,
  replyingTo,
  replying,
  setReplying,
}: TCommentField) => {
  const [comment, setComment] = useState("");
  const token = useAppSelector(useCurrentToken);

  const [addComment] = useAddCommentMutation();

  const handleComment = async () => {
    if (!token) {
      toast.error("login first to leave a comment");
    }
    if (!comment.length) {
      toast.error("Write something to leave a comment...");
    }

    const commentObj: any = {
      blogId,
      blogAuthor,
      comment,
    };

    if (replyingTo) {
      commentObj.replyingTo = replyingTo;
    }

    await addComment(commentObj)
      .unwrap()
      .then((res: any) => {
        setComment("");
        if (replying && setReplying) {
          setReplying(!replying);
        }
        toast.success(res?.message || "Successfully changed password.");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };
  return (
    <>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        className="input-box pl-5 resize-none h-[150px] overflow-auto"
      />
      <button onClick={handleComment} className="btn-dark mt-5 px-10">
        {action}
      </button>
    </>
  );
};

export default CommentField;
