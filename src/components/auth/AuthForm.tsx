"use client";

import Link from "next/link";
import AppFormInput from "../ui/AppFormInput";
import AnimationWrapper from "../ui/AnimationWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useGoogleAuthRegisterMutation,
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { authWithGoogle } from "../shared/firebase";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const AuthForm = ({ type, from }: { type: string; from: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterMutation();
  const [registerGoogleAuth] = useGoogleAuthRegisterMutation();
  const [loginUser] = useLoginMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (type === "sign-up") {
      await registerUser(data)
        .unwrap()
        .then((res: any) => {
          const user = verifyToken(res?.data?.accessToken);
          toast.success(res?.message || "Successfully registered.");
          console.log(user);
          dispatch(setUser({ user, accessToken: res?.data?.accessToken }));

          if (from) {
            router.push(from);
          } else {
            router.push("/");
          }
        })
        .catch((res: any) => {
          toast.error(res?.data?.message || "something went wrong");
        });
    } else if (type === "sign-in") {
      await loginUser(data)
        .unwrap()
        .then((res: any) => {
          const user = verifyToken(res?.data?.accessToken);
          toast.success(res?.message || "Successfully log in");
          console.log(user);
          dispatch(setUser({ user, accessToken: res?.data?.accessToken }));
          if (from) {
            router.push(from);
          } else {
            router.push("/");
          }
        })
        .catch((res: any) => {
          toast.error(res?.data?.message || "something went wrong");
        });
    }
  };

  const handleGoogleLogin = () => {
    authWithGoogle()
      .then((user: any) => {
        registerGoogleAuth({ accessToken: user?.accessToken })
          .unwrap()
          .then((res: any) => {
            toast.success(res?.message || "Successfully registered.");
            dispatch(
              setUser({
                user: res?.data?.user,
                accessToken: res?.data?.accessToken,
              })
            );
            if (from) {
              router.push(from);
            } else {
              router.push("/");
            }
          })
          .catch((res: any) => {
            toast.error(res?.data?.message || "something went wrong");
          });
      })
      .catch((err) => {
        toast.error("Trouble login through Google Account.");
        return console.log(err);
      });
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "sign-in" ? (
            <AppFormInput
              name="fullName"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
              register={register}
              required
              error={errors.fullName}
            />
          ) : (
            ""
          )}

          <AppFormInput
            name="email"
            type="email"
            placeholder="Enter your Email"
            icon="fi-rr-envelope"
            register={register}
            required
            error={errors.email}
          />

          <AppFormInput
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            register={register}
            required
            error={errors.password}
          />

          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
          >
            <img src={"/google.png"} className="w-5" />
            continue with google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don&apos;t have an account ?
              <Link
                href="/auth/sign-up"
                className="underline text-black text-xl ml-1"
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link
                href="/auth/sign-in"
                className="underline text-black text-xl ml-1"
              >
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default AuthForm;
