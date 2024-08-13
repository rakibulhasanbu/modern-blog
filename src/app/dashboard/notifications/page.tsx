"use client";

import NotificationCard from "@/components/dashboard/NotificationCard";
import LoadMoreBtn from "@/components/home/LoadMoreBtn";
import EmptyDataMessage from "@/components/shared/EmptyDataMessage";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { useGetNotificationsQuery } from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const Notification = () => {
  const [page, setPage] = useState(1);
  const [deletedDocCount, setDeletedDocCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const filters = ["all", "link", "comment", "reply"];

  const queryString = useMemo(() => {
    const info = {
      filter: filter !== "all" ? filter : undefined,
      page,
      deletedDocCount: deletedDocCount !== 0 ? deletedDocCount : undefined,
    };

    return Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
  }, [filter, page, deletedDocCount]);

  const { data } = useGetNotificationsQuery(queryString);

  // const notifications = notificationsData as TNotification[];

  return (
    <AnimationWrapper>
      <h1 className="max-md:hidden text-2xl font-medium">
        Recent Notification
      </h1>

      <div className="my-8 flex gap-6">
        {filters.map((filterName) => (
          <button
            key={filterName}
            onClick={() => setFilter(filterName)}
            className={`py-2 ${
              filter === filterName ? "btn-dark" : "btn-light"
            }`}
          >
            {filterName}
          </button>
        ))}
      </div>

      {/* {notifications?.length ? (
        notifications?.map((notification: any, i: number) => (
          <AnimationWrapper
            key={i}
            transition={{ duration: 1, delay: i * 0.08 }}
          >
            <NotificationCard
              data={notification}
              index={i}
              notificationState={notifications}
            />
          </AnimationWrapper>
        ))
      ) : (
        <EmptyDataMessage message="No notification found Yet." />
      )} */}
      {/* <LoadMoreBtn
        state={stateNotificationsData}
        stateFunction={setPage}
        additionalParams={{ deletedDocCount }}
      /> */}
    </AnimationWrapper>
  );
};

export default Notification;
