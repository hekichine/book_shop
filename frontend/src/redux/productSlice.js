import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state) => {
      state.product = null;
    },
  },
});

const { reducer, actions } = productSlice;
export const { addProduct, removeProduct } = actions;
export default reducer;
