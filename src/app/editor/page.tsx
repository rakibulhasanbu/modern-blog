import MainPage from "@/components/editor/MainPage";

const page = ({ searchParams }: { searchParams: { slug: string } }) => {
  return (
    <div>
      <MainPage slug={searchParams.slug} />
    </div>
  );
};

export default page;
