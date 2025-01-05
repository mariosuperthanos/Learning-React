import { createSlice } from "@reduxjs/toolkit";
import { showActions } from "./show";

const proudctSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    changed: false,
  },
  reducers: {
    replaceProducts(state, action){
      state.products = action.payload.cartData2
    },

    addToCart(state, action) {
      const index = state.products.findIndex(
        (item) => item.name === action.payload.name
      );
      state.changed = true;
      if (index !== -1) {
        state.products[index].quantity++;
        state.products[index].totalPrice += state.products[index].price;
      } else {
        const product = {
          name: action.payload.name,
          price: action.payload.price,
          totalPrice: action.payload.price,
          quantity: 1,
        };

        state.products.push(product);
      }
    },

    decrement(state, action) {
      const index = state.products.findIndex(
        (item) => item.name === action.payload.name
      );
      state.products[index].quantity--;
      state.products[index].totalPrice -= state.products[index].price;
    },
  },
});

export const productActions = proudctSlice.actions;

const productReducer = proudctSlice.reducer;

export default productReducer;
