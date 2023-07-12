import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;

      const find = state.find((item) => item.id === id);

      if (find) {
        return state.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Number(item.quantity) + 1,
              }
            : item
        );
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload?.quantity || 1,
        });
      }
    },
    increment: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Number(item.quantity) + 1,
            }
          : item
      );
    },
    decrement: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Number(item.quantity) - 1,
            }
          : item
      );
    },
    removeToCart: (state, action) => {
      let arr = state.filter((item) => item.id !== action.payload.id);
      return arr;
    },
    clearCart: (state) => {
      return [];
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeToCart, increment, decrement, clearCart } =
  actions;
export default reducer;
