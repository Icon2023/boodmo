import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    add_product: [],
    add_Details: "",
    category_list: [],
    single_category: [],
    add_wish: [],
    addto_cart: [],
    login_cart: [],
    order_list:[]
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

    addToWishlist: (state, { payload }) => {
      state.add_wish = [...state.add_wish, payload];
    },

    removeProductWishlist: (state, { payload }) => {
      state.add_wish = state.add_wish.filter((e) => e.proId !== payload)
    },

    addToCart: (state, { payload }) => {
      state.addto_cart = [...state.addto_cart, payload];
    },

    removeProductAddtocart: (state, { payload }) => {
      state.addto_cart = state.addto_cart.filter((e) => e.proId !== payload)
      state.cart_total_price = state.addto_cart.length === 0 ? 0 : state.cart_total_price
    },

    removeAllAddtocart: (state) => {
      state.addto_cart = []
    },

    qtyIncrementDecrement: (state, { payload }) => {
      state.addto_cart = state.addto_cart.map((obj) => {
        if (obj.proId === parseInt(payload.id)) {
          return { ...obj, qty: (obj.qty + payload.plusMinus) }
        }
        return obj
      })
    },

    addLoginCart: (state, { payload }) => {
      state.login_cart = [...state.login_cart, payload];
    },

    removeLoginAddtocart: (state, { payload }) => {
      state.login_cart = state.login_cart.filter((e) => e.id !== payload)
    },
   
    addOrderDetails: (state, { payload }) => {
      state.order_list = payload
    },


  }
})

export const {
  addProducts,
  addProductDetails,
  addCategory,
  addSingleCategory,
  addToWishlist,
  removeProductWishlist,
  addToCart,
  removeProductAddtocart,
  qtyIncrementDecrement,
  removeAllAddtocart,
  addLoginCart,
  removeLoginAddtocart,
  addOrderDetails

} = productsSlice.actions;

export default productsSlice.reducer;
