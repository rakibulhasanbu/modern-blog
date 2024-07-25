type TList = {
  items: any;
  style?: any;
};

const List = ({ items, style }: TList) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((item: any, i: number) => (
        <li
          key={i}
          className="my-4"
          dangerouslySetInnerHTML={{ __html: item }}
        ></li>
      ))}
    </ol>
  );
};

export default List;
