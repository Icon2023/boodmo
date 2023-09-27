import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../../Utils/NextArrow";
import PrevArrow from "../../Utils/PrevArrow";
import { Brands } from "../../Services/apiServices";
import { Link } from "react-router-dom";
import HeadingSection from "../../Utils/HeadingSection";

const BrandsWeTrust = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    Brands()
      .then((res) => {
        setBrands(res?.data);
        // console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container my-5" style={{position:"relative"}}>
       <HeadingSection title="Brands we Trust" link="/brands"/>
      {/* <div className="section__heading border-bottom mb-30 d-flex flex-wrap justify-content-between">
        <h2 className="section__heading--maintitle">
        Brands we  <span> Trust</span>
        </h2>
        <div>
          <Link to="/brands">VIEW ALL</Link>
        </div>
      </div> */}
      <Slider {...settings}>
        {brands?.map((brand) => {
          return (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={brand?.image}
                  width={150}
                  height={200}
                  alt={brand?.id * 2}
                  className="center-img"
                />
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
};

export default BrandsWeTrust;
