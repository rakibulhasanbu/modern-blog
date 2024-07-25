import {
  setBlog,
  setBlogContent,
  setEditorState,
} from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AnimationWrapper from "../ui/AnimationWrapper";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/utils/tools";
import { uploadImage } from "@/utils/uploadImage";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";

const BlogEditor = ({
  content,
  slug,
}: {
  content: any;
  slug: string | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const editorRef = useRef<any>(null);
  const { blog, blogContent } = useAppSelector((state) => state.blog);
  const user = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();
  const handleBannerUpload = async (e: any) => {
    const { url } = await uploadImage({ setLoading, e });

    if (url) {
      dispatch(setBlog({ ...blog, banner: url }));
    }
  };

  const handleTitleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: any) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    dispatch(setBlog({ ...blog, title: input.value }));
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "textEditor",
      data: {
        blocks: blogContent,
      },
      tools: tools as any,
      placeholder: "Let's Write a awesome Story",
      onChange: async () => {
        const data = await editor.save();
        dispatch(setBlogContent(data.blocks));
      },
    });
  };

  useEffect(() => {
    if (blogContent.length > 0) {
      if (!editorRef.current) {
        initEditor();
        editorRef.current = true;
      }
    }
  }, [blogContent]);

  useEffect(() => {
    if (content) {
      dispatch(setBlogContent(content));
    }
  }, [content, dispatch]);

  const handlePublishBlog = async () => {
    if (!blog.banner.length) {
      return toast.error("Upload a blog banner to publish it");
    }
    if (!blog.title.length) {
      return toast.error("Write blog title before saving it as a draft");
    }

    if (blogContent?.length) {
      dispatch(setEditorState("publish"));
    } else {
      return toast.error("Write something in your blog to publish it.");
    }
  };

  const handleDraftBlog = async () => {
    if (!blog.title.length) {
      return toast.error("white blog title before publish it");
    }
    if (!blog.banner.length) {
      return toast.error("Upload a blog banner to publish it");
    }

    const loadingToast = toast.loading("Saving draft...");

    const blogObj = {
      ...blog,
      content: blogContent,
      draft: true,
      author: user?.id,
    };

    if (slug) {
      const updateData = { slug, data: blogObj };
      await updateBlog(updateData)
        .unwrap()
        .then((res: any) => {
          toast.dismiss(loadingToast);
          toast.success("Blogs are saved as a draft");
          router.push("/dashboard/blogs?tab=draft");
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
          toast.success("Blogs are saved as a draft");
          router.push("/dashboard/blogs?tab=draft");
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
      <div className="navbar">
        <Link href="/" className="flex-none">
          <Image
            alt="logo"
            width={40}
            height={40}
            className="size-10"
            src="/logo.png"
          />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {blog?.title?.length > 0 ? blog?.title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button onClick={handlePublishBlog} className="btn-dark py-2">
            Publish
          </button>
          <button
            onClick={handleDraftBlog}
            disabled={isLoading}
            className="btn-light py-2"
          >
            Save Draft
          </button>
        </div>
      </div>

      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video cursor-pointer hover:opacity-80 bg-white border-4 border-grey">
            <label htmlFor="uploadBanner" className="cursor-pointer">
              <img
                src={blog?.banner ? blog?.banner : "/blog banner.png"}
                className="z-20"
                alt="banner"
              />
              <input
                id="uploadBanner"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                disabled={loading}
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            defaultValue={blog?.title}
            placeholder="Blog Title"
            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>

          <hr className="w-full opacity-10 my-5" />

          <div id="textEditor" className="font-gelasio"></div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default BlogEditor;
