import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";

type TBlogCard = {
  content: {
    createdAt: string;
    tags: string;
    title: string;
    des: string;
    banner: string;
    activity: { totalLikes: number };
    slug: string;
  };
  author: {
    fullName: string;
    profileImg: string;
    username: string;
  };
};

const BlogCard = ({ content, author }: TBlogCard) => {
  const {
    createdAt,
    tags,
    title,
    des,
    banner,
    activity: { totalLikes },
    slug,
  } = content;
  const { fullName, profileImg, username } = author;
  return (
    <Link
      href={`/blog/${slug}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full">
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
        <p className="my-3 text-xl font-gelasio leading-7 hidden md:block line-clamp-2">
          {des}
        </p>

        <div className="flex items-center gap-4 mt-7">
          <span className="btn-light py-1 px-4">{tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i> {totalLikes}
          </span>
        </div>
      </div>

      <div className="h-28 aspect-square bg-grey">
        <Image
          src={banner}
          className="w-full h-full object-cover aspect-square "
          alt="banner Image"
          width={130}
          height={150}
        />
      </div>
    </Link>
  );
};

export default BlogCard;
