import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
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
export default userSlice.reducer;
