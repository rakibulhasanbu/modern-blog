"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import AnimationWrapper from "../ui/AnimationWrapper";
import {
  setBlog,
  setBlogContent,
  setEditorState,
} from "@/redux/features/blog/blogSlice";
import AppInput from "../ui/AppInput";
import { toast } from "react-toastify";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";
import { useRouter } from "next/navigation";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Tag from "./Tag";

const PublishForm = ({ slug }: { slug: string | null }) => {
  const characterLimit = 200;
  const tagLimit = 10;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { blog, blogContent } = useAppSelector((state) => state.blog);
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();

  const handleTitleChange = (e: any) => {
    dispatch(setBlog({ ...blog, title: e.target.value, tags: [] }));
  };

  const handleDescriptionChange = (e: any) => {
    dispatch(setBlog({ ...blog, description: e.target.value, tags: [] }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleKeyDownForTag = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const tag = e.target.value;

      if (blog.tags.length < tagLimit) {
        if (!blog.tags.includes(tag as never) && tag.length) {
          dispatch(setBlog({ ...blog, tags: [...blog.tags, tag] }));
        }
      } else {
        toast.error(`You can add max ${tagLimit}`);
      }

      e.target.value = "";
    }
  };

  const handleFinallyPublishBlog = async () => {
    if (!blog.title.length) {
      return toast.error("white blog title before publish it");
    }
    if (!blog.description.length || blog.description.length > characterLimit) {
      return toast.error(
        `Write description about your blog within ${characterLimit} characters to publish`
      );
    }
    if (!blog.tags.length) {
      return toast.error("Enter at least one tag to help us rank your blog");
    }

    const loadingToast = toast.loading("publishing...");

    const blogObj = {
      ...blog,
      content: blogContent,
      draft: false,
      author: user?.id,
    };

    if (slug) {
      const updateData = { slug, data: blogObj };
      await updateBlog(updateData)
        .unwrap()
        .then((res: any) => {
          toast.dismiss(loadingToast);
          toast.success(
            res?.message || "Blog updated and publish Successfully."
          );
          router.push(`/dashboard/blogs`);
          dispatch(setBlogContent([]));
          dispatch(
            setBlog({
              blog: {
                title: "",
                banner: "",
                tags: [],
                description: "",
              },
            })
          );
        })
        .catch((res: any) => {
          toast.dismiss(loadingToast);
          toast.error(res?.data?.message || "something went wrong");
        });
    } else {
      await createBlog(blogObj)
        .unwrap()
        .then((res: any) => {
          toast.dismiss(loadingToast);
          toast.success(res?.message || "Blog published Successfully.");
          router.push(`/dashboard/blogs`);
          dispatch(setBlogContent([]));
          dispatch(
            setBlog({
              blog: {
                title: "",
                banner: "",
                tags: [],
                description: "",
              },
            })
          );
        })
        .catch((res: any) => {
          toast.dismiss(loadingToast);
          toast.error(res?.data?.message || "something went wrong");
        });
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          onClick={() => dispatch(setEditorState("editor"))}
          className="absolute size-12 right-[5vw] z-10 top-[5%] lg:top-[10%]"
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">preview</p>
          <div className="">
            <img
              className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4"
              src={blog?.banner}
              alt=""
            />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {blog?.title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {blog?.description}
          </p>
        </div>

        <div className="border-grey lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <AppInput
            type="text"
            placeholder="Blog title"
            value={blog?.title}
            setValue={handleTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            name=""
            defaultValue={blog?.description}
            maxLength={characterLimit}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleDescriptionChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <p className="text-dark-grey mt-1 text-sm text-right">
            {characterLimit - blog?.description?.length} characters left
          </p>

          <p>Topics - ( Helps is searching and ranking your blog post )</p>
          <div className="relative input-box pl-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              onKeyDown={handleKeyDownForTag}
              className="input-box bg-white sticky top-0 left-0 pl-4 mb-3 focus:bg-white"
            />
            {blog?.tags?.map((tag, i) => (
              <Tag key={i} i={i} tag={tag} />
            ))}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">
            {tagLimit - blog?.tags?.length} Tags left
          </p>
          <button
            onClick={handleFinallyPublishBlog}
            disabled={isLoading}
            className="btn-dark px-8"
          >
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
