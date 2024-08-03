import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (filterOptions) => ({
        url: `/auth/users${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getUserProfile: builder.query({
      query: (username) => ({
        url: `/auth/user/${username}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserProfile: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/update-profile`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;
