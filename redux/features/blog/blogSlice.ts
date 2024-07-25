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
  },
});

export const {
  setBlog,
  setBlogSearch,
  setCategory,
  setEditorState,
  setBlogContent,
} = blogSlice.actions;
export default blogSlice.reducer;
