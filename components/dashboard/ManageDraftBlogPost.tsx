import { useEffect } from "react";
import LoadMoreBtn from "../home/LoadMoreBtn";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import AnimationWrapper from "../ui/AnimationWrapper";
import DraftBlogCard from "./DraftBlogCard";

type TManageDraftBlogPost = {
  setPage: (page: number) => void;
  blogs: any;
  draft: boolean;
  setDraft: (draft: boolean) => void;
};

const ManageDraftBlogPost = ({
  setPage,
  draft,
  setDraft,
  blogs,
}: TManageDraftBlogPost) => {
  useEffect(() => {
    if (!draft) {
      setDraft(true);
    }
  }, [draft, setDraft]);

  return (
    <>
      {blogs?.data?.length ? (
        blogs?.data?.map((blog: any, i: number) => (
          <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
            <DraftBlogCard blog={blog} index={i} />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No Draft blogs found." />
      )}
      <LoadMoreBtn state={blogs?.meta} stateFunction={setPage} />
    </>
  );
};

export default ManageDraftBlogPost;
