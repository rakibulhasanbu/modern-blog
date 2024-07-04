import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    googleAuthRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/google-auth",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/change-password",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleAuthRegisterMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} = authApi;
