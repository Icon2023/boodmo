import React, { useEffect } from "react";
import HomeSilder from "./HomeSilder";
import ShopCategory from "./ShopCategory";
import PopularCarMakers from "./PopularCarMakers";
import BrandsWeTrust from "./BrandsWeTrust";
import AfterMarketProducts from "./AfterMarketProducts";
import { ScrollToTop } from "../../Utils/ScrollToTop";
import AnimatedComponent from "../../Utils/AnimatedComponent";

const Home = () => {
  useEffect(() => {
    ScrollToTop();
  }, []);
  return (
    <>
      {/* Start slider section */}
      <HomeSilder />

      {/* start banner brand */}
      {/* <Banner /> */}

      {/* Start categories section */}
      <AnimatedComponent>
        <ShopCategory />
      </AnimatedComponent>

      {/* Start Aftermarkrt section */}
      <AnimatedComponent>
        <AfterMarketProducts />
      </AnimatedComponent>

      {/* start Popular Car Makers */}
      <AnimatedComponent>
        <PopularCarMakers />
      </AnimatedComponent>

      {/* start Popular brand */}
      <AnimatedComponent>
        <BrandsWeTrust />
      </AnimatedComponent>
    </>
  );
};

export default Home;
