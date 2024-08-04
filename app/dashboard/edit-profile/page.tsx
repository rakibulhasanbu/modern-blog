"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppFormInput from "@/components/ui/AppFormInput";
import AppLoading from "@/components/ui/AppLoading";
import AppTextarea from "@/components/ui/AppTextarea";
import {
  selectCurrentUser,
  setUserProfileImage,
} from "@/redux/features/auth/authSlice";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  fullName: string;
  email: string;
  username: string;
  bio: string;
  youtube: any;
  facebook: any;
  github: any;
  instagram: any;
  twitter: any;
  website: any;
}

const EditProfile = () => {
  const bioLimit = 200;
  const [charactersLeft, setCharactersLeft] = useState(bioLimit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetUserProfileQuery(user?.username);
  const [updateUserProfile, { isSuccess }] = useUpdateUserProfileMutation();
  const profile = data?.data as TUser;

  const [profileImage, setProfileImage] = useState(
    profile?.personalInfo?.profileImg
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const submittedData = {
      ...data,
      socialLinks: {
        facebook: data.facebook,
        github: data.github,
        instagram: data.instagram,
        twitter: data.twitter,
        website: data.website,
        youtube: data.youtube,
      },
    };

    await updateUserProfile(submittedData)
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Profile update Successful");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  const handleProfileUpload = async () => {
    if (!profileImage) {
      toast.error("Please Select profile image and try again");
    } else if (profileImage === profile?.personalInfo?.profileImg) {
      toast.error("Please Select new profile image and try again");
    } else {
      const loadingToast = toast.loading("Uploading...🚀");
      await updateUserProfile({ profileImg: profileImage })
        .unwrap()
        .then((res: any) => {
          toast.dismiss(loadingToast);
          toast.success(res?.message || "Profile Image update Successful 👍");
        })
        .catch((res: any) => {
          toast.dismiss(loadingToast);
          toast.error(res?.data?.message || "something went wrong");
        });
    }
  };

  const handleFileChange = (e: any) => {
    const maxSizeInBytes = 2 * 1024 * 1024;
    const file = e.target.files?.[0];

    if (file?.size && file.size > maxSizeInBytes) {
      return toast.error("Your file was more than 4 Megabyte!", {
        toastId: 1,
      });
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      dispatch(setUserProfileImage(profile?.personalInfo?.profileImg));
    }
    setValue("fullName", profile?.personalInfo?.fullName);
    setValue("email", profile?.personalInfo?.email);
    setValue("username", profile?.personalInfo?.username);
    setValue("bio", profile?.personalInfo?.bio || "");
    setProfileImage(profile?.personalInfo?.profileImg);
    if (profile) {
      {
        Object?.keys(profile.socialLinks).map((key) => {
          const link = (profile as any).socialLinks[key];
          return setValue(
            key as
              | "website"
              | "twitter"
              | "instagram"
              | "github"
              | "facebook"
              | "youtube",
            link || ""
          );
        });
      }
    }
  }, [isSuccess, profile, refetch, setValue]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AnimationWrapper>
      <h1 className="max-md:hidden text-2xl font-medium">Edit Profile </h1>

      <div className="flex flex-col lg:flex-row py-10 gap-8 lg:gap-10">
        <div className="max-lg:center mb-5">
          <label
            htmlFor="uploadImg"
            className="relative block size-48 bg-grey rounded-full overflow-hidden"
          >
            <Image
              className="w-full h-full"
              src={profileImage as string}
              alt="profileImage"
              width={200}
              height={200}
            />
            <div className="w-full h-full absolute inset-0 flex items-center justify-center text-white font-semibold bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
              Upload Image
            </div>
          </label>
          <input
            type="file"
            name=""
            id="uploadImg"
            accept=".jpeg, .png, .jpg"
            hidden
            onChange={handleFileChange}
          />

          <button
            onClick={handleProfileUpload}
            disabled={(profileImage?.length as number) < 500}
            className="btn-light mt-5 max-lg:center lg:w-full px-10"
          >
            Upload
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
            <AppFormInput
              name="fullName"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
              register={register}
              disabled
              error={errors.fullName}
            />
            <AppFormInput
              name="email"
              type="email"
              placeholder="Email"
              icon="fi-rr-envelope"
              register={register}
              disabled
              error={errors.email}
            />
          </div>
          <AppFormInput
            name="username"
            type="text"
            placeholder="username"
            icon="fi-rr-at"
            register={register}
            disabled
            error={errors.username}
          />
          <p className="text-dark-grey -mt-3">
            Username will use to search user and will be visible to all users.
          </p>
          <AppTextarea
            name="bio"
            placeholder="Bio"
            register={register}
            // required
            maxLength={bioLimit}
            onChange={(e: any) =>
              setCharactersLeft(bioLimit - e.target.value.length)
            }
          />
          <p className="mt-1 text-dark-grey">
            {charactersLeft} characters left
          </p>
          <p className="my-6 text-dark-grey">Add your social handles below</p>

          <div className="md:grid md:grid-cols-2 gap-x-6">
            {profile &&
              Object?.keys(profile?.socialLinks).map((key) => {
                const link = (profile as any).socialLinks[key];
                return (
                  <AppFormInput
                    key={key}
                    name={key}
                    type="url"
                    register={register}
                    placeholder="https://"
                    icon={
                      key !== "website" ? `fi-brands-${key}` : "fi-rr-globe"
                    }
                  />
                );
              })}
          </div>

          <button className="btn-dark w-auto px-10">Update</button>
        </form>
      </div>
    </AnimationWrapper>
  );
};

export default EditProfile;
