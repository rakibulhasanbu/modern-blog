"use client";

import { setCategory } from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { category: stateCategory } = useAppSelector((state) => state.blog);
  const categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "fitness",
    "tech",
    "travel",
  ];

  const loadBlogByCategory = (value: string) => {
    const payload = stateCategory === value ? "home" : value;
    dispatch(setCategory(payload));
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((category: string, i: number) => (
        <button
          key={i}
          onClick={() => loadBlogByCategory(category)}
          className={`tag ${
            stateCategory === category && "bg-black text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
