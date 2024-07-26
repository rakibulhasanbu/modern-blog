import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import CommentField from "./CommentField";
import AnimationWrapper from "../ui/AnimationWrapper";

const CommentCard = ({
  comment,
  leftVal,
}: {
  comment: any;
  leftVal: number;
}) => {
  const token = useAppSelector(useCurrentToken);
  const [isReplying, setIsReplying] = useState(false);
  const [isHideReply, setIsHideReply] = useState(false);
  const handleReplyComment = () => {
    if (!token) {
      return toast.error("login first to leave a reply");
    }
    setIsReplying((prev) => !prev);
  };

  const hideReplies = () => {
    setIsHideReply((prev) => !prev);
  };

  return (
    <div className="w-full " style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8">
          <Image
            src={comment?.commentedBy?.personalInfo?.profileImg}
            className="size-6 rounded-full"
            width={30}
            height={30}
            alt="avatar"
          />
          <p className="line-clamp-1">
            {comment?.commentedBy?.personalInfo?.fullName} @
            {comment?.commentedBy?.personalInfo?.username}
          </p>
          <p className="min-w-fit">{getDay(comment?.createdAt)}</p>
        </div>
        <p className="font-gelasio text-xl ml-3">{comment?.comment}</p>

        <div className="flex gap-5 items-center mt-5">
          {comment?.children?.length > 0 && (
            <button
              onClick={hideReplies}
              className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
            >
              <i className="fi fi-rr-comment-dots text-xl"></i>{" "}
              {!isHideReply ? comment?.children.length : "Hide"} Reply
            </button>
          )}

          <button className="underline" onClick={handleReplyComment}>
            Reply
          </button>
        </div>

        {isReplying && (
          <div className="mt-8">
            <CommentField
              action="reply"
              blogId={comment?.blogId}
              blogAuthor={comment?.blogAuthor}
              index={1}
              replyingTo={comment?._id}
              replying={isReplying}
              setReplying={setIsReplying}
            />
          </div>
        )}
      </div>

      {isHideReply &&
        comment?.children?.length > 0 &&
        comment?.children?.map((comment: any, i: number) => (
          <AnimationWrapper key={i}>
            <CommentCard
              leftVal={comment.isReply ? 2.5 : 0 * 4}
              comment={comment}
            />
          </AnimationWrapper>
        ))}
    </div>
  );
};

export default CommentCard;
