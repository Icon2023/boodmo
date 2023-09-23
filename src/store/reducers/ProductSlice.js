import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    add_product:[],
    add_Details: "",
    category_list: [],
    single_category: []
  },

  reducers: {

    addProducts: (state, { payload }) => {
      state.add_product = payload
    },
    addProductDetails: (state, { payload }) => {
      state.add_Details = payload
    },
    addCategory: (state, { payload }) => {
      state.category_list = payload;
    },
    addSingleCategory: (state, { payload }) => {
      state.single_category = payload;
    },
  }
})

export const {
  addProducts,
  addProductDetails,
  addCategory,
  addSingleCategory

} = productsSlice.actions;

export default productsSlice.reducer;
