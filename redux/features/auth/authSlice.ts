import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TTokenUser } from "@/types";

type TIState = {
  user: TTokenUser | null;
  accessToken: string | null;
};

const initialState: TIState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
