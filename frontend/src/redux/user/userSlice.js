import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: {},
  onlineUserList: ["6884e1ae363544fb040de3c6"],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = userSlice.actions;
export const selectedUser = (state) => state.user.selectedUser;
export const onlineUsers = (state) => state.user.onlineUserList;
export default userSlice.reducer;
