import { getFullDay } from "@/utils/formateDate";
import Link from "next/link";

type TAboutUser = {
  bio?: string;
  socialLinks: any;
  createdAt?: string;
  className?: string;
};

const AboutUser = ({ bio, createdAt, socialLinks, className }: TAboutUser) => {
  return (
    <div className={`w-[90%] mt-7 ${className}`}>
      <p className="text-xl leading-7">
        {bio?.length ? bio : "Nothing to read here"}
      </p>
      <div
        className="flex gap-x-7 gap-y-2 flex-wrap my-7
       items-center text-dark-grey"
      >
        {Object?.keys(socialLinks || []).map((key) => {
          const link = socialLinks[key];
          return link ? (
            <Link target="_blank" key={key} href={link}>
              <i
                className={`text-2xl hover:text-black ${
                  key !== "website" ? `fi fi-brands-${key}` : "fi fi-rr-globe"
                }`}
              ></i>
            </Link>
          ) : (
            ""
          );
        })}
      </div>

      <p className="text-xl leading-7 text-dark-grey">
        Joined on {getFullDay(createdAt as string)}
      </p>
    </div>
  );
};

export default AboutUser;
