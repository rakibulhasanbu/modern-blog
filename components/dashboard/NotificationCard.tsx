import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationCommentField from "./NotificationCommentField";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { NotificationType } from "@/types";
import { useDeleteCommentMutation } from "@/redux/features/comment/commentApi";
import { toast } from "react-toastify";

type TNotificationCard = {
  data: any;
  index: number;
  notificationState: any;
};

const NotificationCard = ({
  data,
  index,
  notificationState,
}: TNotificationCard) => {
  const user = useAppSelector(selectCurrentUser);
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = () => {
    setIsReplying((prev) => !prev);
  };

  const handleDeleteClick = async (commentId: string, type: string) => {
    if (type === NotificationType.comment) {
    }
    await deleteComment({ id: commentId })
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Create comment Successful 👍");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  return (
    <div
      className={`p-6 border-b border-grey border-l-black ${
        !data?.seen && "border-l-2"
      }`}
    >
      <div className="flex gap-5 mb-3">
        <Image
          src={data?.user?.personalInfo?.profileImg}
          alt="profile image"
          className="size-14 flex-none rounded-full"
          width={60}
          height={60}
        />
        <div className="w-full">
          <h1 className="font-medium text-xl text-dark-grey">
            <span className="hidden lg:inline-block capitalize">
              {data?.user?.personalInfo?.fullName}
            </span>
            <Link
              className="mx-1 text-black underline"
              href={`/user/${data?.user?.personalInfo?.username}`}
            >
              @{data?.user?.personalInfo?.username}
            </Link>
            <span className="font-normal">
              {data?.type === "like"
                ? "Liked your blog"
                : data?.type === "comment"
                ? "commented on"
                : "replied on"}
            </span>
          </h1>

          {data?.type === "reply" ? (
            <div className="">
              <p className="p-4 mt-4 rounded-md bg-grey">
                {data?.repliedOnComment?.comment}
              </p>
            </div>
          ) : (
            <Link
              className="font-medium text-dark-grey hover:underline line-clamp-1"
              href={`/blog/${data?.blog?.blogId}`}
            >{`"${data?.blog?.title}"`}</Link>
          )}
        </div>
      </div>

      {data?.type !== "like" && (
        <p className="ml-14 pl-5 font-gelasio text-xl my-5">
          {data?.comment?.comment}
        </p>
      )}

      <div className="ml-14 pl-5 mt-3 text-dark-grey flex gap-8">
        <p>{getDay(data?.createdAt)}</p>

        {data?.type !== "like" && (
          <>
            {!data?.reply && (
              <button
                onClick={handleReplyClick}
                className="underline hover:text-black"
              >
                Reply
              </button>
            )}
            <button
              onClick={() =>
                handleDeleteClick(data?.comment?._id, NotificationType.comment)
              }
              disabled={deleteCommentLoading}
              className="underline hover:text-black"
            >
              Delete
            </button>
          </>
        )}
      </div>
      {isReplying && (
        <div className="mt-8">
          <NotificationCommentField
            id={data?.blog?._id}
            blogAuthor={data?.user}
            index={index}
            replyingTo={data?.comment?._id}
            setReplying={setIsReplying}
            notificationId={data?._id}
            notificationData={notificationState}
          />
        </div>
      )}

      {data?.reply && (
        <div className="ml-2 mt-3 p-5 bg-grey rounded-md">
          <div className="flex gap-3 mb-3">
            <Image
              src={user?.profileImg as string}
              className="size-8 rounded-full"
              width={40}
              height={40}
              alt="reply image"
            />
            <div className="">
              <h1 className="font-medium text-xl text-dark-grey">
                <Link
                  className="mx-1 text-black underline"
                  href={`/user/${user?.username}`}
                >
                  @{user?.username}
                </Link>
                <span className="font-normal">replied to</span>
                <Link
                  className="mx-1 text-black underline"
                  href={`/user/${data?.user?.personalInfo?.username}`}
                >
                  @{data?.user?.personalInfo?.username}
                </Link>
              </h1>
            </div>
          </div>
          <p className="ml-14 font-gelasio text-xl my-2">
            {data?.reply?.comment}
          </p>
          <button
            onClick={() =>
              handleDeleteClick(data?.comment?._id, NotificationType.reply)
            }
            disabled={deleteCommentLoading}
            className="underline hover:text-black ml-14 mt-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
