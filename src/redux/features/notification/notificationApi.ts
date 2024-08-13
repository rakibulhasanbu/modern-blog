import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (filterOptions) => ({
        url: `/notifications${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),

    getNewNotification: builder.query({
      query: () => ({
        url: `/new-notification`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    updateNotificationProfile: builder.mutation({
      query: (info) => {
        return {
          url: `/update-profile`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNewNotificationQuery,
  useUpdateNotificationProfileMutation,
} = notificationApi;
