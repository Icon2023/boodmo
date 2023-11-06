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
    order_list: [],
    filter_multi: "",
    coupon_code: "",
    login_cart: [],
    add_ship:[]
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

    //========================================================== WISHLIST ==========================================================
    // =============================================================================================================================
    addToWishlist: (state, { payload }) => {
      if (Array.isArray(payload)) {
        // If it's an array, spread the contents into the target array
        state.add_wish = [...state.add_wish, ...payload];
      } else {
        // If it's a single object, add it to the target array
        state.add_wish = [...state.add_wish, payload];
      }
    },

    removeProductWishlist: (state, { payload }) => {
      state.add_wish = state.add_wish.filter((e) => e.product_id !== payload)
    },

    removeAllItemWishlist: (state) => {
      state.add_wish = [];
    },

    // =============================================================== ADD_TO_CART==========================================================
    // =====================================================================================================================================
    addToCart: (state, { payload }) => {
      state.addto_cart = [...state.addto_cart, payload];
    },

    removeProductAddtocart: (state, { payload }) => {
      state.addto_cart = state.addto_cart.filter((e) => e.proId !== payload)
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

    // ====================================================== LOGIN_ADD_CART=========================================================
    // ==============================================================================================================================
    addLoginCart: (state, { payload }) => {
      state.login_cart = payload;
    },

    removeLoginAddtocart: (state, { payload }) => {
      state.login_cart = state.login_cart.filter((e) => e.id !== payload)
    },

    removeAllLoginCart: (state) => {
      state.login_cart = []
    },

    login_qtyIncrement_Decrement: (state, { payload }) => {
      state.login_cart = state.login_cart.map((obj) => {
        if (obj.product_id === parseInt(payload.id)) {
          return { ...obj, qty: (obj.qty + payload.plusMinus) }
        }
        return obj
      })
    },

// ============================================= ORDER_DETAILS ======================================================================
// ===================================================================================================================================
    addOrderDetails: (state, { payload }) => {
      state.order_list = payload
    },

    addFilterDetail: (state, { payload }) => {
      state.filter_multi = payload
    },

    removeFilter: (state) => {
      state.filter_multi = ""
    },

    add_coupon_code: (state, { payload }) => {
      state.coupon_code = payload
    },

    remove_coupon_code: (state) => {
      state.coupon_code = ""
    },

    // ========================================= Ship Details =======================================================================
    // ==============================================================================================================================
    add_ship_details:(state , {payload})=>{
      state.add_ship = payload
    }

  }
})

export const {
  addProducts,
  addProductDetails,
  addCategory,
  addSingleCategory,
  removeAllItemWishlist,
  addToWishlist,
  removeProductWishlist,
  addToCart,
  removeProductAddtocart,
  removeAllAddtocart,
  qtyIncrementDecrement,
  addOrderDetails,
  addFilterDetail,
  removeFilter,
  add_coupon_code,
  remove_coupon_code,
  addLoginCart,
  removeLoginAddtocart,
  login_qtyIncrement_Decrement,
  removeAllLoginCart,
  add_ship_details

} = productsSlice.actions;

export default productsSlice.reducer;
