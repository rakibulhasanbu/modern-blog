"use client";

import AnimationWrapper from "../ui/AnimationWrapper";
import EmptyDataMessage from "../shared/EmptyDataMessage";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import UserCard from "./UserCard";
import { useMemo } from "react";
import { useAppSelector } from "@/redux/hook";
import useDebounce from "@/hooks/useDebounce";
import AppLoading from "../ui/AppLoading";

const SearchUsers = () => {
  const { blogSearch } = useAppSelector((state) => state.blog);
  const debouncedSearch = useDebounce(blogSearch, 500);

  const queryString = useMemo(() => {
    const info = {
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };

    return Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }

      return pre;
    }, "");
  }, [debouncedSearch]);

  const { data, isLoading } = useGetUsersQuery(queryString);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      {data?.data?.data?.length ? (
        data?.data?.data?.map((user: any, i: number) => (
          <AnimationWrapper
            key={i}
            transition={{ duration: 1, delay: i * 0.08 }}
          >
            <UserCard user={user} />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No user found!" />
      )}
    </>
  );
};

export default SearchUsers;
