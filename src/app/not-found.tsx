import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <section className="h-cover relative p-10 flex flex-col justify-center items-center gap-14 text-center">
        <Image
          src={"/404.png"}
          alt="404 page iamge"
          className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
          width={300}
          height={300}
        />

        <h1 className="text-4xl font-semibold font-gelasio leading-7">
          Page not found
        </h1>
        <p className="text-dark-grey text-xl leading-7 -mt-4">
          The page you are looking for does not exists. Head back to the{" "}
          <Link href={"/"} className="font-semibold underline text-black">
            Home page
          </Link>
        </p>
        <div className="mt-auto">
          <Image
            src={"/full-logo.png"}
            alt="404 page iamge"
            className="select-none h-8 block object-contain mx-auto"
            width={200}
            height={40}
          />
          <p className="mt-5 text-dark-grey">
            Read millions of stories around the world
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
