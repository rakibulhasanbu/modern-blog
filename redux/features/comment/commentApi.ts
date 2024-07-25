import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (filterOptions) => ({
        url: `/comments${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getMyBookingComments: builder.query({
      query: () => ({
        url: `/booking-requests-my`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getBookingComments: builder.query({
      query: () => ({
        url: `/booking-requests`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),

    getCommentById: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "GET",
      }),
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.comment, tagTypes.notification],
    }),

    updateBookingComment: builder.mutation({
      query: (updatedData) => ({
        url: `/booking-requests/${updatedData.id}`,
        method: "PUT",
        body: updatedData.BookingCommentData,
      }),
      invalidatesTags: [tagTypes.comment, tagTypes.notification],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.comment, tagTypes.notification],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useAddCommentMutation,
  useUpdateBookingCommentMutation,
  useDeleteCommentMutation,
  useGetMyBookingCommentsQuery,
  useGetBookingCommentsQuery,
} = commentApi;
