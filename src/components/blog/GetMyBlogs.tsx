"use client";

import ManageDraftBlogPost from "@/components/dashboard/ManageDraftBlogPost";
import ManagePublishedBlogs from "@/components/dashboard/ManagePublishedBlogs";
import InPageNavigation from "@/components/shared/InPageNavigation";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppLoading from "@/components/ui/AppLoading";
import useDebounce from "@/hooks/useDebounce";
import { useGetMyBlogsQuery } from "@/redux/features/blog/blogApi";
import { useMemo, useState } from "react";

const GetMyBlogs = ({ tab }: { tab: string }) => {
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const queryString = useMemo(() => {
    const info = {
      page,
      draft,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };

    return Object.keys(info).reduce((pre, key: string) => {
      if (key === "draft") {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${draft}`;
      } else {
        const value = info[key as keyof typeof info];
        if (value) {
          return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
        }
      }
      return pre;
    }, "");
  }, [debouncedSearch, draft, page]);

  const { data, isLoading } = useGetMyBlogsQuery(queryString);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AnimationWrapper>
      <h1 className="max-md:hidden text-2xl font-medium">Manage Blogs</h1>

      <div className="relative mt-5 md:mt-8 mb-10">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[8%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <InPageNavigation
        routes={[`Published Blogs`, "Drafts"]}
        defaultActiveIndex={tab === "draft" ? 1 : 0}
      >
        <ManagePublishedBlogs
          draft={draft}
          setDraft={setDraft}
          blogs={data?.data}
          setPage={setPage}
          isLoading={isLoading}
        />
        <ManageDraftBlogPost
          draft={draft}
          setDraft={setDraft}
          blogs={data?.data}
          setPage={setPage}
          isLoading={isLoading}
        />
      </InPageNavigation>
    </AnimationWrapper>
  );
};

export default GetMyBlogs;
