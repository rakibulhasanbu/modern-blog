type TImg = {
  url: string;
  caption?: string;
};

const Img = ({ url, caption }: TImg) => {
  return (
    <div className="">
      <img src={url} alt="" />
      {caption?.length ? (
        <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey"></p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Img;
