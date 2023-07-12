import { createSlice } from "@reduxjs/toolkit";

const quickviewSlice = createSlice({
  name: "quickview",
  initialState: {
    product: null,
  },
  reducers: {
    addQuickview: (state, action) => {
      state.product = action.payload;
    },
    removeQuickview: (state) => {
      state.product = null;
    },
  },
});

const { reducer, actions } = quickviewSlice;
export const { addQuickview, removeQuickview } = actions;
export default reducer;
