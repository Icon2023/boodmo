import React from "react";

const AfterMarketProducts = () => {
  return (
    <>
      <section className="blog__section section--padding">
        <div className="container">
          <div className="section__heading section__heading--flex border-bottom d-flex justify-content-between align-items-end mb-30">
            <h2 className="section__heading--maintitle">
              Why Choose Aftermarket Products ?
            </h2>
          </div>
          <div className="row">
            <div className=" col-lg-4 col-sm-6 col-12 mb-4">
              <div
                className="swiper-slides shadow_AfterMarket"
                style={{ minHeight: "100%" }}
              >
                <img
                  className="blog__card--thumbnail__img"
                  src="assets/img/blog/blog6.webp"
                  alt="blog-img"
                />
                <h3 className="blog__card--title mt-4">Original Products</h3>
                <p className="blog__card--desc">
                  Only reliable parts from trusted Aftermarket brands
                </p>
              </div>
            </div>
            <div className=" col-lg-4 col-sm-6 col-12 mb-4">
              <div className="swiper-slides shadow_AfterMarket">
                <img
                  className="blog__card--thumbnail__img"
                  src="assets/img/blog/blog2.webp"
                  alt="blog-img"
                />
                <h3 className="blog__card--title mt-4">Affordable Rates</h3>
                <p className="blog__card--desc">
                  Repairing a damaged vehicle can be expensive. Using the
                  aftermarket products is a good solution if you're on a budget
                </p>
              </div>
            </div>
            <div className=" col-lg-4 col-sm-6 col-12 mb-4">
              <div className="swiper-slides shadow_AfterMarket">
                <img
                  className="blog__card--thumbnail__img"
                  src="assets/img/blog/blog4.webp"
                  alt="blog-img"
                />
                <h3 className="blog__card--title mt-4">Wide variety</h3>
                <p className="blog__card--desc">
                  We have something for everyone when it comes to aftermarket
                  products. Just apply the "Aftermarket" filter in the catalogue
                  and check the offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AfterMarketProducts;