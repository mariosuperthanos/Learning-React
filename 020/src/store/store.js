import { configureStore } from "@reduxjs/toolkit";
import showReducer from "./show";
import productReducer from "./products";

const store = configureStore({
  reducer:{
    show: showReducer,
    products: productReducer
  }
})

export default store;