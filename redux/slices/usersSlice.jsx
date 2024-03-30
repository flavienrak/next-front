import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersInfos: (state, action) => {
      const { users } = action.payload;
      let newState = { ...state };
      newState.users = users;
      return newState;
    },

    updateUsersInfos: (state, action) => {
      const { user } = action.payload;
      let newState = { ...state };
      newState.users = { ...state.users, ...user };
      return newState;
    },

    removeUsersInfos: () => {
      return initialState;
    },
  },
});

export const { fetchUsersInfos, updateUsersInfos, removeUsersInfos } =
  usersSlice.actions;
export default usersSlice.reducer;
