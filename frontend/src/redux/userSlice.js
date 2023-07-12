import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

const { reducer, actions } = userSlice;
export const { addUser, removeUser } = actions;
export default reducer;
