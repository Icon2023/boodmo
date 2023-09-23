import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Mainpages/Header'
import Home from './Mainpages/Home'
import Footer from './Mainpages/Footer'
import SingleProductsDetails from './Mainpages/SingleProductsDetails'
import Cart from './Mainpages/Cart'
import WishList from './Mainpages/WishList'
import Login from './Mainpages/Login'
import PrivacyPolicy from './Mainpages/PrivacyPolicy'
import CategoryProducts from './Mainpages/CategoryProducts'
import ProductsView from './Mainpages/ProductsView'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop/:id' element={<CategoryProducts/>}/>
        <Route path='/shop/:cate_id/:subcategory' element={<ProductsView/>}/>
        <Route path='/productsdetail/:id' element={<SingleProductsDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
