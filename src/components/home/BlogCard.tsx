import { TBlog } from "@/types";
import { getDay } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";

type TBlogCard = {
  blog: TBlog;
};

const BlogCard = ({ blog }: TBlogCard) => {
  return (
    <Link
      href={`/blog/${blog?.slug}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <Image
            src={blog?.author?.personalInfo?.profileImg as string}
            alt="profile image"
            width={30}
            height={30}
            className="size-6 rounded-full"
          />
          <p className="line-clamp-1">
            {blog?.author?.personalInfo?.fullName} @
            {blog?.author?.personalInfo?.username}
          </p>
          <p className="min-w-fit">{getDay(blog?.createdAt)}</p>
        </div>

        <h1 className="blog-title">{blog?.title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 hidden md:block line-clamp-2">
          {blog?.description}
        </p>

        <div className="flex items-center gap-4 mt-7">
          <span className="btn-light py-1 px-4">{(blog?.tags as any)[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>{" "}
            {blog?.activity?.total_likes}
          </span>
        </div>
      </div>

      <div className="h-28 aspect-square bg-grey">
        <Image
          src={blog?.banner as string}
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
