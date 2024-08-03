"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppFormInput from "@/components/ui/AppFormInput";
import AppLoading from "@/components/ui/AppLoading";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  currentPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetUserProfileQuery(user?.username);

  const onSubmit: SubmitHandler<FormData> = async (submittedData) => {
    if (data?.data?.googleAuth) {
      return toast.error(
        "You can't change account password because you logged in through google!",
        { toastId: 1 }
      );
    }

    await changePassword(submittedData)
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Successfully changed password.");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AnimationWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="max-md:hidden text-2xl font-medium">Change Password</h1>

        <div className="py-5 w-full md:max-w-[400px]">
          <AppFormInput
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            icon="fi-rr-unlock"
            register={register}
            required={!data?.data?.googleAuth}
            error={errors.currentPassword}
          />

          <AppFormInput
            name="newPassword"
            type="password"
            placeholder="New Password"
            icon="fi-rr-unlock"
            register={register}
            required={!data?.data?.googleAuth}
            error={errors.newPassword}
          />

          <button className="btn-dark px-10">Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
