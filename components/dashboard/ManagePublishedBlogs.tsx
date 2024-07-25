import { useEffect } from "react";
import LoadMoreBtn from "../home/LoadMoreBtn";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import AnimationWrapper from "../ui/AnimationWrapper";
import PublishBlogCard from "./PublishBlogCard";

type TManagePublishedBlogs = {
  setPage: (page: number) => void;
  blogs: any;
  draft: boolean;
  setDraft: (draft: boolean) => void;
};

const ManagePublishedBlogs = ({
  setPage,
  blogs,
  draft,
  setDraft,
}: TManagePublishedBlogs) => {
  useEffect(() => {
    if (draft) {
      setDraft(false);
    }
  }, [draft, setDraft]);
  return (
    <>
      {blogs?.data?.length ? (
        blogs?.data?.map((blog: any, i: number) => (
          <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
            <PublishBlogCard blog={blog} />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No blogs Published Yet." />
      )}
      <LoadMoreBtn state={blogs?.meta} stateFunction={setPage} />
    </>
  );
};

export default ManagePublishedBlogs;
