import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    all_shop_product: [],
    add_Details:""
  },

  reducers: {
    addProduct: (state, { payload }) => {
      state.all_shop_product = payload;
    },
    addProductDetails:(state , {payload})=>{
      state.add_Details = payload
    }  
  }
})

export const {
  addProduct,
  addProductDetails

} = productsSlice.actions;

export default productsSlice.reducer;
