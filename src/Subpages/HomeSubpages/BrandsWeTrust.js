import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Brands } from "../../Services/apiServices";
import HeadingSection from "../../Utils/HeadingSection";
import { Link } from "react-router-dom";

const BrandsWeTrust = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    Brands()
      .then((res) => {
        setBrands(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
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
    <div className="container my-5" style={{ position: "relative" }}>
      <HeadingSection title="Brands we Trust" link="/brands" />
      <Slider {...settings}>
        {brands?.map((brand, index) => {
          return (
            <div key={index}>
              <div style={{ display: "flex", alignItems: "center" }} >
                {/* <a href={`/brands/${brand?.id}`}> */}
                  <img
                    src={brand?.image}
                    style={{height:"100px"}}
                    className="center-img"
                  />
                {/* </a> */}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BrandsWeTrust;
