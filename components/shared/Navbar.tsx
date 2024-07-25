"use client";

import {
  selectCurrentUser,
  setTheme,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavbarPopup from "./NavbarPopup";
import AppButton from "../ui/AppButton";
import Image from "next/image";
import { setBlogSearch } from "@/redux/features/blog/blogSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetNewNotificationQuery } from "@/redux/features/notification/notificationApi";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const accessToken = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const { blogSearch } = useAppSelector((state) => state.blog);
  const { theme } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isFetching } = useGetNewNotificationQuery("");

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const handleBlogSearch = (e: any) => {
    if (blogSearch.length < 40) {
      dispatch(setBlogSearch(e?.target?.value));
    } else {
      toast.error("Please search by less than forty words", { toastId: 1 });
    }
  };

  useEffect(() => {
    if (blogSearch.length > 0) {
      return router.push("/blog/search");
    } else if (pathname === "/blog/search" && blogSearch.length === 0) {
      return router.push("/");
    }
  }, [blogSearch]);

  useEffect(() => {
    if (data?.newNotificationAvailable) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [data, isFetching]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className="navbar z-50">
      <Link href="/" className="flex-none w-10">
        <Image
          alt="Logo"
          src={"/logo.png"}
          className="w-full"
          width={40}
          height={40}
        />
      </Link>

      <div
        className={`absolute bg-white w-full left-0 top-full mt-0 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
          searchBoxVisibility ? "show" : "hide"
        }`}
      >
        <input
          type="text"
          placeholder="Search"
          value={blogSearch}
          onChange={handleBlogSearch}
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>

        <Link href="/editor" className="hidden md:flex gap-2 link rounded-full">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <button
          className="bg-grey hover:bg-black/10 size-12 rounded-full flex items-center justify-center"
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
        >
          <i
            className={`fi fi-rr-${
              theme === "light" ? "moon-stars" : "sun"
            } text-xl block mt-1`}
          ></i>
        </button>

        {accessToken ? (
          <>
            <Link
              href="/dashboard/notifications"
              className="relative flex items-center justify-center size-12 rounded-full bg-grey hover:bg-black/10"
            >
              <i className="fi fi-rr-bell text-xl block mt-1"></i>
              {newNotification && (
                <span className="rounded-full bg-red size-3 absolute z-10 top-2 right-2"></span>
              )}
            </Link>

            <div
              className="relative"
              onBlur={handleBlur}
              onClick={() => setUserNavPanel((currentVal) => !currentVal)}
            >
              <button className="size-12 mt-1">
                <Image
                  alt="avatarImage"
                  width={50}
                  height={50}
                  src={user?.profileImg as string}
                  className="size-12 border border-grey  object-cover rounded-full"
                />
              </button>
              {userNavPanel && <NavbarPopup />}
            </div>
          </>
        ) : (
          <>
            <AppButton label="Sign In" className="py-2" href="/auth/sign-in" />

            <AppButton
              label="Sign Up"
              className="py-2 hidden md:block"
              href="/auth/sign-up"
              variant="light"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
