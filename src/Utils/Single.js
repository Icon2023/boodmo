import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import product_1 from "../images/single/product-1.jpg";
import product_2 from "../images/single/product-2.jpg";
import product_3 from "../images/single/product-3.jpg";
import product_4 from "../images/single/product-4.jpg";
// import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
import "../../node_modules/swiper/swiper.css";
import "../../node_modules/swiper/modules/navigation-element.min.css";
import "../../node_modules/swiper/modules/thumbs.mjs";
import "../../node_modules/swiper/modules/navigation.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ReactImageMagnify from "react-image-magnify";

export default function SingleApp() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    var product =
        "https://images.unsplash.com/photo-1526887520775-4b14b8aed897?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80";

    const imageProps = {
        smallImage: {
            alt: "Phasellus laoreet",
            isFluidWidth: true,
            src: product,
        },
        largeImage: {
            src: product,
            width: 1200,
            height: 1800,
        },
        enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
    };
    return (
        <>
            <main>
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    // className="mySwiper2"
                    className="single_main"
                >
                    <SwiperSlide>
                        <img src={product_1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={product_2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={product_3} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={product_4} />
                    </SwiperSlide>
                </Swiper>
                <div>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                        style={{ border: "1px" }}
                    >
                        <SwiperSlide>
                            <div
                                style={{
                                    border: "1px solid #363062",
                                    width: "100px",
                                    cursor: "pointer",
                                }}
                                className=""
                            >
                                <img src={product_1} width={100} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                style={{
                                    border: "1px solid #363062",
                                    width: "100px",
                                    cursor: "pointer",
                                }}
                            >
                                <img src={product_2} width={100} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                style={{
                                    border: "1px solid #363062",
                                    width: "100px",
                                    cursor: "pointer",
                                }}
                            >
                                <img src={product_3} width={100} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                style={{
                                    border: "1px solid #363062",
                                    width: "100px",
                                    cursor: "pointer",
                                }}
                            >
                                <img src={product_4} width={100} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://swiperjs.com/demos/images/nature-5.jpg"
                                width={200}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </main>
        </>
    );
}
