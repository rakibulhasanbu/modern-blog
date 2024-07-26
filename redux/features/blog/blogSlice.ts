import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogSearch: "",
  category: "home",
  blog: {
    title: "",
    banner: "",
    tags: [],
    description: "",
  },
  blogContent: [],
  editorState: "editor",
  activity: {
    total_likes: 0,
    total_comments: 0,
    total_reads: 0,
    total_parent_comments: 0,
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      const { title, banner, tags, description } = action.payload;
      state.blog.title = title;
      state.blog.banner = banner;
      state.blog.tags = tags;
      state.blog.description = description;
    },
    setBlogContent: (state, action) => {
      state.blogContent = action.payload;
    },
    setBlogSearch: (state, action) => {
      state.blogSearch = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setEditorState: (state, action) => {
      state.editorState = action.payload;
    },
    setActivity: (state, action) => {
      state.activity.total_likes = action.payload.total_likes;
      state.activity.total_comments = action.payload.total_comments;
      state.activity.total_reads = action.payload.total_reads;
      state.activity.total_parent_comments =
        action.payload.total_parent_comments;
    },
  },
});

export const {
  setBlog,
  setBlogSearch,
  setCategory,
  setEditorState,
  setBlogContent,
  setActivity,
} = blogSlice.actions;
export default blogSlice.reducer;
