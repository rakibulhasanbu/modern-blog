import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByBlogId: builder.query({
      query: ({ id, queryString }) => ({
        url: `/comments/${id}${queryString ? `?${queryString}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment, tagTypes.notification, tagTypes.blog],
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.comment, tagTypes.notification, tagTypes.blog],
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
  useGetCommentsByBlogIdQuery,
  useAddCommentMutation,
  useUpdateBookingCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
