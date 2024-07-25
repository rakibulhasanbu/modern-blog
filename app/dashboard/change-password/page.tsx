"use client";

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppFormInput from "@/components/ui/AppFormInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
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

  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    await changePassword(data)
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Successfully changed password.");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

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
            required
            error={errors.currentPassword}
          />
          <AppFormInput
            name="newPassword"
            type="password"
            placeholder="New Password"
            icon="fi-rr-unlock"
            register={register}
            required
            error={errors.newPassword}
          />

          <button className="btn-dark px-10">Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
