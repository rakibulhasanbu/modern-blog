"use client";

import { useAppSelector } from "@/redux/hook";
import { useEffect, useRef, useState } from "react";

type TInPageNavigation = {
  routes: string[];
  defaultActiveIndex?: number;
  defaultHidden?: string[];
  children: React.ReactNode;
};

const InPageNavigation = ({
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
  children,
}: TInPageNavigation) => {
  const { category, blogSearch } = useAppSelector((state) => state.blog);
  const activeTabLineIndex = useRef(null);
  const activeTabRef = useRef(null);
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

  const filteredRoutes = routes.map((route) =>
    route === "home" ? category : route
  );

  const changePageState = (btn: any, i: number) => {
    (activeTabLineIndex.current as any).style.width = btn.offsetWidth + "px";
    (activeTabLineIndex.current as any).style.left = btn.offsetLeft + "px";
    setInPageNavIndex(i);
  };

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, [category, blogSearch]);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {filteredRoutes.map((route, i) => {
          return (
            <button
              key={route}
              ref={i === defaultActiveIndex ? activeTabRef : null}
              className={`p-3 px-5 capitalize ${
                inPageNavIndex === i
                  ? "text-black font-medium"
                  : "text-dark-grey"
              } ${defaultHidden.includes(route) && "md:hidden"}`}
              onClick={(e) => changePageState(e.target, i)}
            >
              {route}
            </button>
          );
        })}

        <hr
          ref={activeTabLineIndex}
          className="absolute bottom-0 duration-300 border-dark-grey"
        />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
