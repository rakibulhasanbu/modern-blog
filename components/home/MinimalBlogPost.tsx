import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";

type TMinimalBlogPost = {
  blog: any;
  index: number;
};

const MinimalBlogPost = ({ blog, index }: TMinimalBlogPost) => {
  const {
    title,
    slug,
    author: {
      personalInfo: { fullName, username, profileImg },
    },
    createdAt,
  } = blog;
  return (
    <Link href={`/blog/${slug}`} className="flex gap-5 mb-8">
      <h1 className="blog-index">{index < 10 ? "0" + (index + 1) : index}</h1>
      <div>
        <div className="flex gap-2 items-center mb-7">
          <Image
            src={profileImg}
            alt="profile image"
            width={30}
            height={30}
            className="size-6 rounded-full"
          />
          <p className="line-clamp-1">
            {fullName} @{username}
          </p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};

export default MinimalBlogPost;
