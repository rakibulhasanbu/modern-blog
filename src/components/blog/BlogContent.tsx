import Img from "./Img";
import List from "./List";
import Quote from "./Quote";

type TBlogContent = {
  content: {
    data: any;
    id: string;
    type: "list" | "header" | "paragraph" | "quote" | "image";
  };
};

const BlogContent = ({ content }: TBlogContent) => {
  if (content?.type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: content?.data?.text }}></p>;
  }

  if (content?.type === "header") {
    if (content?.data?.level === 3) {
      return (
        <h3
          className="text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: content?.data?.text }}
        ></h3>
      );
    } else {
      return (
        <h2
          className="text-4xl font-bold"
          dangerouslySetInnerHTML={{ __html: content?.data?.text }}
        ></h2>
      );
    }
  }
  if (content?.type === "image") {
    return (
      <Img url={content?.data?.file?.url} caption={content?.data?.caption} />
    );
  }
  if (content?.type === "quote") {
    return (
      <Quote quote={content?.data?.text} caption={content?.data?.caption} />
    );
  }
  if (content?.type === "list") {
    return <List style={content?.data?.style} items={content?.data?.items} />;
  }
};

export default BlogContent;
