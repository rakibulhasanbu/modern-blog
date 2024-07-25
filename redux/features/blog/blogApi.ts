import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    getBlogs: builder.query({
      query: (filterOptions) => ({
        url: `/blogs${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getTrendingBlogs: builder.query({
      query: (filterOptions) => ({
        url: `/trending-blogs${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => ({
        url: `/blog/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getMyBlogs: builder.query({
      query: (filterOptions) => ({
        url: `/my-blogs${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    updateBookingBlog: builder.mutation({
      query: (updatedData) => ({
        url: `/booking-requests/${updatedData.id}`,
        method: "PUT",
        body: updatedData.BookingBlogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogBySlugQuery,
  useGetBlogsQuery,
  useGetTrendingBlogsQuery,
  useUpdateBookingBlogMutation,
  useDeleteBlogMutation,
  useGetMyBlogsQuery,
} = blogApi;
