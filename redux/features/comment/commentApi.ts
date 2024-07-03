import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlats: builder.query({
      query: (filterOptions) => ({
        url: `/comments${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getMyFlats: builder.query({
      query: () => ({
        url: `/my-comments`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getMyBookingFlats: builder.query({
      query: () => ({
        url: `/booking-requests-my`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getBookingFlats: builder.query({
      query: () => ({
        url: `/booking-requests`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getFlatById: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "GET",
      }),
    }),

    addFlat: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    bookingFlat: builder.mutation({
      query: (data) => ({
        url: "/booking-applications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    updateBookingFlat: builder.mutation({
      query: (updatedData) => ({
        url: `/booking-requests/${updatedData.id}`,
        method: "PUT",
        body: updatedData.BookingFlatData,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    updatedFlat: builder.mutation({
      query: (updatedData) => ({
        url: `/comments/${updatedData.id}`,
        method: "PUT",
        body: updatedData.FlatData,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    deleteFlat: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.comment],
    }),
  }),
});

export const {
  useGetFlatsQuery,
  useGetMyFlatsQuery,
  useGetFlatByIdQuery,
  useAddFlatMutation,
  useUpdatedFlatMutation,
  useUpdateBookingFlatMutation,
  useDeleteFlatMutation,
  useGetMyBookingFlatsQuery,
  useGetBookingFlatsQuery,
  useBookingFlatMutation,
} = commentApi;
