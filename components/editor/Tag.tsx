import { setBlog } from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Tag = ({ tag, i }: { tag: string; i: number }) => {
  const dispatch = useAppDispatch();
  const { blog } = useAppSelector((state) => state.blog);

  const handleDeleteTag = (value: string) => {
    const newTags = blog.tags.filter((tag) => tag !== value);

    dispatch(setBlog({ ...blog, tags: newTags }));
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p className="outline-none">{tag}</p>
      <button
        onClick={() => handleDeleteTag(tag)}
        className="mt-0.5 rounded-full absolute right-3 top-1/2 -translate-y-1/2"
      >
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tag;
