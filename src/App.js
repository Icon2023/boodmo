import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Mainpages/Header'
import Home from './Subpages/HomeSubpages/Home'
import Footer from './Mainpages/Footer'
import SingleProductsDetails from './Mainpages/SingleProductsDetails'
import Cart from './Mainpages/Cart'
import WishList from './Mainpages/WishList'
import Login from './Mainpages/Login'
import PrivacyPolicy from './Mainpages/PrivacyPolicy'
import CategoryProducts from './Mainpages/CategoryProducts'
import ProductsView from './Mainpages/ProductsView'
import CarMakers from './Subpages/CarMakers'
import BrandsAll from './Subpages/Brands'
import Checkout from './Mainpages/Checkout'
import ScrollToTop from "react-scroll-to-top";
import ProtectedRouteLogin from './Utils/ProtectedRouteLogin'
import ProtectedRouteWishlist from './Utils/form/ProtectedRouteWishlist'
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; 


function App() {
  return (
    <>
      <ScrollToTop smooth color="#ED1D24" />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop/:id' element={<CategoryProducts />} />
        <Route path='/shop/:cate_id/:subcategory' element={<ProductsView />} />
        <Route path='/productsdetail/:id' element={<SingleProductsDetails />} />
        <Route path='/wishlist' element={<ProtectedRouteWishlist><WishList /></ProtectedRouteWishlist>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<ProtectedRouteLogin><Login /></ProtectedRouteLogin>} />
        <Route path='/vehicles' element={<CarMakers />} />
        <Route path='/brands' element={<BrandsAll />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
