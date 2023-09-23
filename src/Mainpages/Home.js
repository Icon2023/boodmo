import React from "react";
import HomeSilder from "../Subpages/HomeSilder";
import ShopCategory from "../Subpages/ShopCategory";
import PopularProducts from "../Subpages/PopularProducts";
import Banner from "../Subpages/Banner";
import PopularCarMakers from "../Subpages/PopularCarMakers";
import BrandsWeTrust from "./BrandsWeTrust";

const Home = () => {
  return (
    <>
      {/* Start slider section */}
      <HomeSilder />

      {/* Start categories section */}
      <ShopCategory />

      {/* start Popular Car Makers */}
      <PopularCarMakers />

      <BrandsWeTrust />

      {/* Start product section */}
      <PopularProducts />
    </>
  );
};

export default Home;
