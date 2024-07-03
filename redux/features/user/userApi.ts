import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: `/profile`,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: [tagTypes.user],
    }),

    editProfile: builder.mutation({
      query: (info) => {
        return {
          url: `/profile`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    editUser: builder.mutation({
      query: (info) => {
        return {
          url: `/user`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useEditProfileMutation,
  useEditUserMutation,
} = userApi;
