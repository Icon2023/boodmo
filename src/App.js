import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './Mainpages/Header';
import Home from './Subpages/HomeSubpages/Home';
import Footer from './Mainpages/Footer';
import SingleProductsDetails from './Mainpages/SingleProductsDetails';
import Cart from './Mainpages/Cart';
import WishList from './Mainpages/WishList';
import Login from './Mainpages/Login';
import PrivacyPolicy from './Mainpages/PrivacyPolicy';
import CategoryProducts from './Mainpages/CategoryProducts';
import ProductsView from './Mainpages/ProductsView';
import CarMakers from './Subpages/CarMakers';
import BrandsAll from './Subpages/Brands';
import Checkout from './Mainpages/Checkout';
import ScrollToTop from "react-scroll-to-top";
import ProtectedRouteLogin from './Utils/ProtectedRouteLogin';
import ProtectedRouteWishlist from './Utils/ProtectedRouteWishlist';
import About from './Mainpages/About';
import Page404 from './Mainpages/Page404';
import Review from './Mainpages/Review';
import MyOrders from './Mainpages/MyOrders';
import MyAddress from './Mainpages/MyAddress';
import ThankYou from './Subpages/ThankYou';
import Contact from './Mainpages/contact';
import BrandProductsView from './Subpages/BrandProducts';
import CarMakerListAllProducts from './Mainpages/CarMakerListAllProducts';
import SearchBar from './Mainpages/SearchBar';
import 'react-modern-drawer/dist/index.css';
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";


function App() {
  return (
    <>
      <ScrollToTop smooth color="#ED1D24" />
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop/:id' element={<CategoryProducts />} />
          <Route path='/shop/:cate_id/:subcategory' element={<ProductsView />} />
          <Route path='/productsdetail/:id' element={<SingleProductsDetails />} />
          <Route path='/search/:pn' element={<SearchBar />} />

          <Route path='/wishlist' element={<ProtectedRouteWishlist><WishList /></ProtectedRouteWishlist>} />
          <Route path='/checkout' element={<ProtectedRouteWishlist><Checkout /></ProtectedRouteWishlist>} />
          <Route path='/review' element={<ProtectedRouteWishlist><Review /></ProtectedRouteWishlist>} />
          <Route path='/my-orders' element={<ProtectedRouteWishlist><MyOrders /></ProtectedRouteWishlist>} />
          <Route path='/my-address' element={<ProtectedRouteWishlist><MyAddress /></ProtectedRouteWishlist>} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<ProtectedRouteLogin><Login /></ProtectedRouteLogin>} />
          <Route path='/vehicles' element={<CarMakers />} />
          <Route path='/vehicles/:name/:id' element={<CarMakerListAllProducts />} />
          <Route path='/brands' element={<BrandsAll />} />
          <Route path='/brands/:id' element={<BrandProductsView />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/thank-you' element={<ThankYou />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
