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
      query: ({ slug, mode }) => {
        let url = `/blog/${slug}`;
        if (mode) {
          url += `?mode=${mode}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: [tagTypes.blog, tagTypes.comment],
    }),

    getMyBlogs: builder.query({
      query: (filterOptions) => ({
        url: `/my-blogs${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getIsLikedByUser: builder.query({
      query: (id) => ({
        url: `/isLiked-by-user?id=${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog, tagTypes.notification],
    }),

    updateBlog: builder.mutation({
      query: (updatedData) => ({
        url: `/blog/${updatedData.slug}`,
        method: "PUT",
        body: updatedData.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    likeBlog: builder.mutation({
      query: (data) => ({
        url: `/like-blog`,
        method: "PUT",
        body: data,
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
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetMyBlogsQuery,
  useLikeBlogMutation,
  useGetIsLikedByUserQuery,
} = blogApi;
