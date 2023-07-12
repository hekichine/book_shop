import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import collectionSlice from "./collectionSlice";
import quickviewSlice from "./quickviewSlice";
//
export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    collection: collectionSlice,
    quickview: quickviewSlice,
  },
});
