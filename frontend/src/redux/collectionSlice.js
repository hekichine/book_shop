import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: [],
  reducers: {
    addCollection: (state, action) => {
      state.push(action.payload);
    },
    removeCollection: (state, action) => {
      let arr = state.filter((item) => item.id !== action.payload.id);
      return arr;
    },
  },
});

const { reducer, actions } = collectionSlice;
export const { addCollection, removeCollection } = actions;
export default reducer;
