import { useAddCommentMutation } from "@/redux/features/comment/commentApi";
import { useState } from "react";
import { toast } from "react-toastify";

type TNotificationCommentField = {
  id?: string;
  blogAuthor?: string;
  index?: unknown;
  replyingTo?: unknown;
  setReplying?: (reply: boolean) => void;
  notificationId?: string;
  notificationData?: any;
};

const NotificationCommentField = ({
  id,
  blogAuthor,
  index = undefined,
  replyingTo = undefined,
  setReplying,
  notificationId,
  notificationData,
}: TNotificationCommentField) => {
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();

  const handleComment = async () => {
    if (!comment.length) {
      return toast.error("Write something to leave a comment...");
    }
    const submittedData = {};
    await addComment(submittedData)
      .unwrap()
      .then((res: any) => {
        setReplying && setReplying(false);
        toast.success(res?.message || "Create comment Successful 👍");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  return (
    <div className="">
      <textarea
        placeholder="Leave a comment..."
        className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleComment} className="btn-dark mt-5 px-10">
        Reply
      </button>
    </div>
  );
};

export default NotificationCommentField;
