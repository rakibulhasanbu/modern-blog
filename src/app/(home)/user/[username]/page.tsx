"use client";

import AboutUser from "@/components/auth/AboutUser";
import LatestBlogs from "@/components/home/LatestBlogs";
import InPageNavigation from "@/components/shared/InPageNavigation";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppLoading from "@/components/ui/AppLoading";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const { username } = useParams();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetUserProfileQuery(username);
  const profile = data?.data as TUser;

  useEffect(() => {
    if (data?.data === null) {
      console.log("object");
      toast.error(`${username} is not a valid username`);
      router.push("/");
    }
  }, [data]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AnimationWrapper>
      <section className="h-cover md:flex flex-row-reverse items-start gap-5 lg:gap-16">
        <div className="flex flex-col items-center md:items-start gap-5 min-w-[250px] md:w-1/2 md:pl-8 md:border-l border-grey md:sticky md:top-24 md:py-10">
          <Image
            src={profile?.personalInfo?.profileImg as string}
            alt="profile image"
            width={200}
            height={200}
            className="size-32 md:size-48 rounded-full bg-grey "
          />
          <h1 className="text-2xl font-semibold">
            @{profile?.personalInfo?.username}
          </h1>
          <p className="text-xl capitalize h-6">
            {profile?.personalInfo.fullName}
          </p>
          <p>
            {profile?.accountInfo?.totalPosts.toLocaleString()} Blogs -{" "}
            {profile?.accountInfo?.totalReads.toLocaleString()} Reads
          </p>

          <div className="flex gap-4 mt-2">
            {user?.id === profile?._id && (
              <Link
                href={`/user/edit-profile`}
                className="btn-light rounded-md"
              >
                Edit Profile
              </Link>
            )}
          </div>

          <AboutUser
            className="hidden md:block"
            bio={profile?.personalInfo?.bio}
            createdAt={profile?.joinedAt}
            socialLinks={profile?.socialLinks}
          />
        </div>

        <div className="mt-8 md:mt-0 w-full">
          <InPageNavigation
            routes={["Blogs published", "About"]}
            defaultHidden={["About"]}
          >
            <LatestBlogs id={profile?._id} />
            <AboutUser
              bio={profile?.personalInfo?.bio}
              createdAt={profile?.joinedAt}
              socialLinks={profile?.socialLinks}
            />
          </InPageNavigation>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default UserProfilePage;
