import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: {},
  onlineUserList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setOnlineUserList(state, action) {
      state.onlineUserList = action.payload;
    },
  },
});

export const { setSelectedUser, setOnlineUserList } = userSlice.actions;
export const selectedUser = (state) => state.user.selectedUser;
export const onlineUsers = (state) => state.user.onlineUserList;
export default userSlice.reducer;
