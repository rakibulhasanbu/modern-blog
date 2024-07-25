"use client";

import LatestBlogs from "@/components/home/LatestBlogs";
import SearchUsers from "@/components/home/SearchUsers";
import InPageNavigation from "@/components/shared/InPageNavigation";
import { useAppSelector } from "@/redux/hook";

const SearchPage = () => {
  const { blogSearch } = useAppSelector((state) => state.blog);
  return (
    <section className="h-cover flex justify-center gap-10">
      {/* latest blogs  */}
      <div className="w-full">
        <InPageNavigation
          routes={[`Search results for "${blogSearch}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
        >
          <LatestBlogs />
          <SearchUsers />
        </InPageNavigation>
      </div>

      {/* filters and trending blogs  */}
      <div className="min-w-[40%] lg:min-w-[400px] border-l border-grey pl-8 pt-3 hidden md:flex flex-col gap-5">
        <h1 className="font-semibold text-xl mb-8 min-w-full flex items-center">
          User related to search <i className="fi ff-rr-user"></i>
        </h1>

        <SearchUsers />
      </div>
    </section>
  );
};

export default SearchPage;
