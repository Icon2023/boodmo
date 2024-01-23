import React from "react";
import HomeSilder from "./HomeSilder";
import ShopCategory from "./ShopCategory";
import Banner from "./Banner";
import PopularCarMakers from "./PopularCarMakers";
import BrandsWeTrust from "./BrandsWeTrust";
import AfterMarketProducts from "./AfterMarketProducts";

const Home = () => {
  return (
    <>
      {/* Start slider section */}
      <HomeSilder />

      {/* start banner brand */}
      <Banner />

      {/* Start categories section */}
      <ShopCategory />

      {/* Start Aftermarkrt section */}
      <AfterMarketProducts />

      {/* start Popular Car Makers */}
      <PopularCarMakers />

      {/* start Popular brand */}
      <BrandsWeTrust />


    </>
  );
};

export default Home;
