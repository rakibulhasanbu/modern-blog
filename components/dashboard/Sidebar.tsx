"use client";

import { useGetNewNotificationQuery } from "@/redux/features/notification/notificationApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const pageNameNow = pathname
    .split("/")
    [pathname.split("/").length - 1].replace("-", " ");
  const [pageName, setPageName] = useState(pageNameNow);
  const [showSideNav, setShowSideNav] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const { data, isFetching } = useGetNewNotificationQuery("");

  const activeTabLine = useRef(null);
  const sidebarIconTab = useRef(null);
  const pageNameTab = useRef(null);

  const changePageState = (e: any) => {
    const btn = e.target;
    (activeTabLine.current as any).style.width = btn.offsetWidth + "px";
    (activeTabLine.current as any).style.left = btn.offsetLeft + "px";

    if (btn === sidebarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    if (document.body.clientWidth < 600) {
      setShowSideNav(false);
      (pageNameTab.current as any).click();
    }
  }, [pageName]);

  useEffect(() => {
    if (data?.newNotificationAvailable) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [data, isFetching]);

  const navLinks = [
    {
      path: "/dashboard/blogs",
      label: "Blogs",
      icon: "fi-rr-document",
    },
    {
      path: "/dashboard/notifications",
      label: "Notification",
      icon: "fi-rr-bell",
    },
    {
      path: "/editor",
      label: "Write",
      icon: "fi-rr-file-edit",
    },
  ];

  const settingNavLink = [
    {
      path: "/dashboard/edit-profile",
      label: "Edit Profile",
      icon: "fi-rr-user",
    },
    {
      path: "/dashboard/change-password",
      label: "Change password",
      icon: "fi-rr-lock",
    },
  ];
  return (
    <div className="sticky top-[80px] z-30">
      <div
        className="md:hidden border-b bg-white border-grey flex
         flex-nowrap overflow-x-auto z-20"
      >
        <button
          ref={sidebarIconTab}
          className="px-5 py-[16.5px] capitalize "
          onClick={changePageState}
        >
          <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
        </button>
        <button
          ref={pageNameTab}
          className="px-5 py-[16.5px] capitalize "
          onClick={changePageState}
        >
          {pageName}
        </button>
        <hr ref={activeTabLine} className="absolute bottom-0 duration-500" />
      </div>

      <div
        className={`min-w-[200px] z-0 h-[90dvh] md:h-cover md:sticky top-16 md:top-24 bg-white  max-md:w-full duration-500 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute ${
          !showSideNav
            ? "max-md:opacity-0 max-md:pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
        <hr className="border border-grey -ml-6 mb-8 mr-6" />

        {navLinks.map((nav) => (
          <Link
            key={nav.path}
            onClick={() => setPageName(nav.label)}
            href={nav.path}
            className={`sidebar-link ${pathname === nav.path && "active"}`}
          >
            <div className="relative">
              <i className={`fi ${nav.icon}`}></i>
              {nav.label === "Notification" && newNotification && (
                <span className="rounded-full bg-red size-2 absolute z-10 top-0 right-0"></span>
              )}
            </div>
            {nav.label}
          </Link>
        ))}

        <h1 className="text-xl text-dark-grey mb-3 mt-20">Settings</h1>
        <hr className="border border-grey -ml-6 mb-8 mr-6" />

        {settingNavLink.map((nav) => (
          <Link
            key={nav.path}
            onClick={() => setPageName(nav.label)}
            href={nav.path}
            className={`sidebar-link ${pathname === nav.path && "active"}`}
          >
            <i className={`fi ${nav.icon}`}></i> {nav.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
