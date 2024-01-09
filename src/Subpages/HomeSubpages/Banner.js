import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OffersBanner } from '../../Services/apiServices';

const Banner = () => {

    const [offer, setOffer] = useState([]);

    useEffect(() => {
        OffersBanner().then((res) => {
            if (res.success) {
                setOffer(res?.data)
            } else {
                console.log(res?.message);
            }
        })
    }, [])

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
        <>
            <section className="banner__section section--padding">
                <div className="container">
                    <div className="section__heading border-bottom mb-30">
                        <h2 className="section__heading--maintitle">
                            Current <span>Offers</span>
                        </h2>
                    </div>
                    <Slider {...settings}>
                        {
                            offer && offer?.map((e, index) => {
                                return (
                                    <div className="p-2" key={index}>
                                        <a href={`/shop/${e?.category_id}`}>
                                            <img
                                                style={{ borderRadius: "10px" }}
                                                src={e?.image}
                                                alt="banner-img"
                                            />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default Banner