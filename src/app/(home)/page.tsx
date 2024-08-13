import CategoryFilter from "@/components/home/CategoryFilter";
import LatestBlogs from "@/components/home/LatestBlogs";
import TrendingBlogs from "@/components/home/TrendingBlogs";
import InPageNavigation from "@/components/shared/InPageNavigation";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const page = () => {
  return (
    <AnimationWrapper key={"home-page"}>
      <section className="h-cover flex justify-center gap-10">
        {/* latest blogs  */}
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <LatestBlogs />
            <TrendingBlogs />
          </InPageNavigation>
        </div>

        {/* filters and trending blogs  */}
        <div className="min-w-[40%] lg:min-w-[400px] border-l border-grey pl-8 pt-3 hidden md:flex flex-col gap-10">
          <div>
            <h1 className="font-semibold text-xl mb-8 min-w-full">
              Stories form all interests
            </h1>
            <CategoryFilter />
          </div>
          <div>
            <h1 className="font-semibold text-xl mb-8">
              Trending <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            <TrendingBlogs />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default page;
