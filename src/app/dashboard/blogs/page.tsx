import GetMyBlogs from "@/components/blog/GetMyBlogs";

const page = ({ searchParams }: { searchParams: { tab: string } }) => {
  return (
    <div>
      <GetMyBlogs tab={searchParams.tab} />
    </div>
  );
};

export default page;
