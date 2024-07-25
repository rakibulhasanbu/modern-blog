import Image from "next/image";
import Link from "next/link";

type TUserCard = {
  user: {
    personalInfo: {
      fullName: string;
      username: string;
      profileImg: string;
    };
  };
};

const UserCard = ({ user }: TUserCard) => {
  return (
    <Link
      href={`/user/${user?.personalInfo.username}`}
      className="flex gap-5 items-center mb-5"
    >
      <Image
        src={user.personalInfo.profileImg}
        alt="Profile Image"
        className="size-14 rounded-full"
        width={60}
        height={60}
      />

      <div className="">
        <h1 className="font-medium text-xl line-clamp-2">
          {user.personalInfo.fullName}
        </h1>
        <p className="text-dark-grey">@{user.personalInfo.username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
