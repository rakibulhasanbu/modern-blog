import Link from "next/link";
import AnimationWrapper from "../ui/AnimationWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";

const NavbarPopup = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link href="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link href={`/user/${user?.username}`} className="link pl-8 py-4">
          Profile
        </Link>

        <Link href="/dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link href="/dashboard/edit-profile" className="link pl-8 py-4">
          Settings
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={() => dispatch(logOut())}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{user?.username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default NavbarPopup;
