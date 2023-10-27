import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddReviewList, CartLogin, SingleProductDetails } from "../Services/apiServices";
import ShippingAddress from "../Subpages/ShippingAddress";
import { useDispatch, useSelector } from "react-redux";
import {
    addLoginCart,
    addProductDetails,
    addToCart,
    addToWishlist,
    removeProductWishlist,
} from "../store/reducers/ProductSlice";
import { AiFillStar, AiOutlineCaretLeft, AiOutlineCaretRight, AiOutlineStar } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Carousel } from 'react-responsive-carousel';
import { dateFormate } from "../Utils/utils";
import Rating from '@mui/material/Rating';
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";



const SingleProductsDetails = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reviewOpen, setReviewOpen] = useState(true)
    const [addOpen, setAddOpen] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { add_Details, add_wish, addto_cart, login_cart } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        SingleProductDetails(id).then((res) => {
            if (res.success) {
                dispatch(addProductDetails(res?.data?.product))
                console.log(res?.data?.product);
            }
        })
    }, [])

    var productwishIdsArray = [];
    add_wish.forEach(function (obj) {
        productwishIdsArray.push(obj.proId);
    })

    var productIdsArray = [];
    addto_cart.forEach(function (obj) {
        productIdsArray.push(obj.proId);
    })

    var productLoginIdsArray = [];
    login_cart.forEach(function (obj) {
        productLoginIdsArray.push(obj.product_id);
    })

    const handleReviewClick = () => {
        reviewOpen ? setAddOpen(false) : setReviewOpen(true)
    }

    const handleAddClick = () => {
        reviewOpen ? setReviewOpen(false) : setAddOpen(true)
    }

    const handleWish = () => {
        let data = {
            proId: add_Details?.id,
            price: add_Details?.original_price,
            qty: 1,
            name: add_Details?.name,
            image: add_Details?.images[0].image,
            stock: add_Details?.out_of_stock
        }
        dispatch(addToWishlist(data))
    }

    const handleAddcart = () => {
        if (user?.success !== true) {
            let data = {
                proId: add_Details?.id,
                price: add_Details?.original_price,
                qty: 1,
                name: add_Details?.name,
                image: add_Details?.images[0].image,
            }
            dispatch(addToCart(data))
        } else {
            let data = {
                product_id: add_Details?.id,
                price: add_Details?.original_price,
                qty: 1
            }
            CartLogin(data).then((res) => {
                console.log(res);
                dispatch(addLoginCart(res?.data))
            })
        }
    }

    const handleBuyNow = () => {
        if (user?.success !== true) {
            let data = {
                proId: add_Details?.id,
                price: add_Details?.original_price,
                qty: 1,
                name: add_Details?.name,
                image: add_Details?.images[0].image,
            }
            dispatch(addToCart(data))
            navigate('/checkout')
        } else {
            let data = {
                product_id: add_Details?.id,
                price: add_Details?.original_price,
                qty: 1
            }
            CartLogin(data).then((res) => {
                console.log(res);
                dispatch(addLoginCart(res?.data))
                navigate('/checkout')
            })
        }

    }

    const removeElement = (id) => {
        dispatch(removeProductWishlist(id));
    };

    const handleSubmitReview = (event) => {
        event.preventDefault();
        let data = {
            rating: rating,
            text: reviewText,
            user_id: user?.data?.id,
            product_id: id,
            vendor_id: add_Details?.vendor_id
        }
        console.log(data);
        AddReviewList(data).then((res) => {
            if (!res.status) {
                alert(res.message)
            }
        })
    }

    return (
        <>
            <main className="margin_top_all">

                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb__content--menu__items">
                                            <span>Product</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Start product details section */}

                <section className="product__details--section section--padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Carousel
                                    showThumbs={true} // Display thumbnail images
                                    showStatus={false}
                                    infiniteLoop={true}
                                    dynamicHeight={false}
                                    showArrows={false} // Disable the default arrows
                                    renderArrowPrev={(clickHandler) => (
                                        <button onClick={clickHandler} className="custom-arrow prev">
                                            <RxDoubleArrowLeft style={{fontSize:"36px"}}/>
                                        </button>
                                    )}
                                    renderArrowNext={(clickHandler) => (
                                        <button onClick={clickHandler} className="custom-arrow next">
                                            <RxDoubleArrowRight style={{fontSize:"36px"}}/>
                                        </button>
                                    )}
                                >
                                    {add_Details?.images?.map((e) => {
                                        return (
                                            <div className="image-container">
                                                <img src={e?.image} />
                                            </div>
                                        )
                                    })
                                    }
                                </Carousel>
                            </div>
                            <div className="col-md-6">
                                <div className="product__details--info">
                                    <h2 className="product__details--info__title mb-15">
                                        {add_Details?.name}
                                    </h2>
                                    <div className="product__details--info__price mb-12">
                                        <span className="current__price">
                                            {add_Details?.selling_price}/-
                                        </span>
                                        <del className="old__price">
                                            {add_Details?.original_price}/-
                                        </del>
                                    </div>
                                    <ul className="rating product__card--rating mb-15 d-flex">
                                        <li className="rating__list">
                                            <span className="rating__icon">
                                                {
                                                    add_Details?.average_rating === 0 &&
                                                    <>
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                    </>
                                                }
                                                {
                                                    add_Details?.average_rating === 1 &&
                                                    <>
                                                        <AiFillStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                    </>
                                                }
                                                {
                                                    add_Details?.average_rating === 2 &&
                                                    <>
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                    </>
                                                }
                                                {
                                                    add_Details?.average_rating === 3 &&
                                                    <>
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                    </>
                                                }
                                                {
                                                    add_Details?.average_rating === 4 &&
                                                    <>
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiOutlineStar />
                                                    </>
                                                }
                                                {
                                                    add_Details?.average_rating === 5 &&
                                                    <>
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                    </>
                                                }

                                            </span>
                                        </li>
                                        <li>
                                            <span className="rating__review--text">
                                                {add_Details?.review_count} Review
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="product__details--info__desc mb-15">
                                        {add_Details?.short_desc}
                                    </p>
                                    <div className="product__variant">
                                        <div className="product__variant--list mb-10">
                                            <fieldset className="variant__input--fieldset">
                                                <legend className="product__variant--title mb-8">
                                                    Color :
                                                </legend>
                                                <div className="variant__color d-flex">
                                                    <div className="variant__color--list">
                                                        <input
                                                            id="color-red5"
                                                            name="color"
                                                            type="radio"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="variant__color--value red"
                                                            htmlFor="color-red5"
                                                            title="Red"
                                                        >
                                                            <img
                                                                className="variant__color--value__img"
                                                                src="assets/img/product/small-product/product1.webp"
                                                                alt="variant-color-img"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="variant__color--list">
                                                        <input
                                                            id="color-red6"
                                                            name="color"
                                                            type="radio"
                                                        />
                                                        <label
                                                            className="variant__color--value red"
                                                            htmlFor="color-red6"
                                                            title="Black"
                                                        >
                                                            <img
                                                                className="variant__color--value__img"
                                                                src="assets/img/product/small-product/product2.webp"
                                                                alt="variant-color-img"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="variant__color--list">
                                                        <input
                                                            id="color-red7"
                                                            name="color"
                                                            type="radio"
                                                        />
                                                        <label
                                                            className="variant__color--value red"
                                                            htmlFor="color-red7"
                                                            title="Pink"
                                                        >
                                                            <img
                                                                className="variant__color--value__img"
                                                                src="assets/img/product/small-product/product3.webp"
                                                                alt="variant-color-img"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="variant__color--list">
                                                        <input
                                                            id="color-red8"
                                                            name="color"
                                                            type="radio"
                                                        />
                                                        <label
                                                            className="variant__color--value red"
                                                            htmlFor="color-red8"
                                                            title="Orange"
                                                        >
                                                            <img
                                                                className="variant__color--value__img"
                                                                src="assets/img/product/small-product/product4.webp"
                                                                alt="variant-color-img"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="product__variant--list quantity d-flex align-items-center mb-20">
                                            {
                                                add_Details?.out_of_stock === 1 ?
                                                    <>
                                                        <button className="addto_cart_btn">
                                                            Out Of Stock
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            user?.success !== true ?
                                                                <>
                                                                    {
                                                                        productIdsArray.includes(parseInt(id)) ?
                                                                            <Link to={'/cart'} >
                                                                                <button className="addto_cart_btn">
                                                                                    View Cart
                                                                                </button>
                                                                            </Link>
                                                                            :
                                                                            <button
                                                                                className="addto_cart_btn"
                                                                                onClick={() => handleAddcart()}
                                                                            >
                                                                                Add To Cart
                                                                            </button>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        productLoginIdsArray.includes(parseInt(id)) ?
                                                                            <Link to={'/cart'} >
                                                                                <button className="addto_cart_btn">
                                                                                    View Cart
                                                                                </button>
                                                                            </Link>
                                                                            :
                                                                            <button
                                                                                className="addto_cart_btn"
                                                                                onClick={() => handleAddcart()}
                                                                            >
                                                                                Add To Cart
                                                                            </button>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                            }
                                            {
                                                add_Details?.out_of_stock !== 1 &&
                                                <>
                                                    {
                                                        user?.success !== true ?
                                                            <>
                                                                {
                                                                    productIdsArray.includes(parseInt(id)) ?
                                                                        <Link to={'/checkout'} >
                                                                            <button className="buy_btn">
                                                                                Buy Now
                                                                            </button>
                                                                        </Link>
                                                                        :
                                                                        <button className="buy_btn" onClick={() => handleBuyNow()}>Buy Now</button>

                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    productLoginIdsArray.includes(parseInt(id)) ?
                                                                        <Link to={'/cart'} >
                                                                            <button className="buy_btn">
                                                                                Buy Now
                                                                            </button>
                                                                        </Link>
                                                                        :
                                                                        <button className="buy_btn" onClick={() => handleBuyNow()}>Buy Now</button>

                                                                }
                                                            </>
                                                    }
                                                </>
                                            }


                                        </div>
                                        <div className="product__variant--list mb-15">
                                            {
                                                user?.success === true ?
                                                    <>
                                                        {
                                                            productwishIdsArray.includes(parseInt(id)) ?
                                                                <div className='mb-4'>
                                                                    <BsHeartFill style={{ cursor: "pointer", fontSize: "20px" }}
                                                                        onClick={() => removeElement(add_Details?.id)} />
                                                                    <span className='ms-2'>
                                                                        Add to Wishlist
                                                                    </span>
                                                                </div>
                                                                :
                                                                <div className='mb-4'>
                                                                    <BsHeart
                                                                        style={{ cursor: "pointer", fontSize: "20px" }}
                                                                        onClick={() => handleWish()}
                                                                    />
                                                                    <span className='ms-2'>
                                                                        Add to Wishlist
                                                                    </span>
                                                                </div>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <div className='mb-4'>
                                                            <a href="/login" rel="noopener noreferrer">
                                                                <BsHeart style={{ cursor: "pointer", fontSize: "20px" }} />
                                                                <span className='ms-2'>
                                                                    Add to Wishlist
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                        <div className="product__variant--list mb-15">
                                            <div className="product__details--info__meta">
                                                <p className="product__details--info__meta--list">
                                                    <strong>Barcode:</strong> <span> 565461</span>
                                                </p>
                                                <p className="product__details--info__meta--list">
                                                    <strong>Sky:</strong> <span>4420</span>
                                                </p>
                                                <p className="product__details--info__meta--list">
                                                    <strong>Vendor:</strong> <span>{add_Details?.vendor_id}</span>
                                                </p>
                                                <p className="product__details--info__meta--list">
                                                    <strong>Type:</strong> <span>Auto Parts</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="quickview__social d-flex align-items-center mb-15">
                                        <label className="quickview__social--title">
                                            Social Share:
                                        </label>
                                        <ul className="quickview__social--wrapper mt-0 d-flex">
                                            <li className="quickview__social--list">
                                                <a
                                                    className="quickview__social--icon"
                                                    target="_blank"
                                                    href="https://www.facebook.com/"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="7.667"
                                                        height="16.524"
                                                        viewBox="0 0 7.667 16.524"
                                                    >
                                                        <path
                                                            data-name="Path 237"
                                                            d="M967.495,353.678h-2.3v8.253h-3.437v-8.253H960.13V350.77h1.624v-1.888a4.087,4.087,0,0,1,.264-1.492,2.9,2.9,0,0,1,1.039-1.379,3.626,3.626,0,0,1,2.153-.6l2.549.019v2.833h-1.851a.732.732,0,0,0-.472.151.8.8,0,0,0-.246.642v1.719H967.8Z"
                                                            transform="translate(-960.13 -345.407)"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Facebook</span>
                                                </a>
                                            </li>
                                            <li className="quickview__social--list">
                                                <a
                                                    className="quickview__social--icon"
                                                    target="_blank"
                                                    href="https://twitter.com/"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16.489"
                                                        height="13.384"
                                                        viewBox="0 0 16.489 13.384"
                                                    >
                                                        <path
                                                            data-name="Path 303"
                                                            d="M966.025,1144.2v.433a9.783,9.783,0,0,1-.621,3.388,10.1,10.1,0,0,1-1.845,3.087,9.153,9.153,0,0,1-3.012,2.259,9.825,9.825,0,0,1-4.122.866,9.632,9.632,0,0,1-2.748-.4,9.346,9.346,0,0,1-2.447-1.11q.4.038.809.038a6.723,6.723,0,0,0,2.24-.376,7.022,7.022,0,0,0,1.958-1.054,3.379,3.379,0,0,1-1.958-.687,3.259,3.259,0,0,1-1.186-1.666,3.364,3.364,0,0,0,.621.056,3.488,3.488,0,0,0,.885-.113,3.267,3.267,0,0,1-1.374-.631,3.356,3.356,0,0,1-.969-1.186,3.524,3.524,0,0,1-.367-1.5v-.057a3.172,3.172,0,0,0,1.544.433,3.407,3.407,0,0,1-1.1-1.214,3.308,3.308,0,0,1-.4-1.609,3.362,3.362,0,0,1,.452-1.694,9.652,9.652,0,0,0,6.964,3.538,3.911,3.911,0,0,1-.075-.772,3.293,3.293,0,0,1,.452-1.694,3.409,3.409,0,0,1,1.233-1.233,3.257,3.257,0,0,1,1.685-.461,3.351,3.351,0,0,1,2.466,1.073,6.572,6.572,0,0,0,2.146-.828,3.272,3.272,0,0,1-.574,1.083,3.477,3.477,0,0,1-.913.8,6.869,6.869,0,0,0,1.958-.546A7.074,7.074,0,0,1,966.025,1144.2Z"
                                                            transform="translate(-951.23 -1140.849)"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Twitter</span>
                                                </a>
                                            </li>
                                            <li className="quickview__social--list">
                                                <a
                                                    className="quickview__social--icon"
                                                    target="_blank"
                                                    href="https://www.instagram.com/"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="17.497"
                                                        height="17.492"
                                                        viewBox="0 0 19.497 19.492"
                                                    >
                                                        <path
                                                            data-name="Icon awesome-instagram"
                                                            d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z"
                                                            transform="translate(0.004 -1.492)"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Instagram</span>
                                                </a>
                                            </li>
                                            <li className="quickview__social--list">
                                                <a
                                                    className="quickview__social--icon"
                                                    target="_blank"
                                                    href="https://www.youtube.com/"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16.49"
                                                        height="11.582"
                                                        viewBox="0 0 16.49 11.582"
                                                    >
                                                        <path
                                                            data-name="Path 321"
                                                            d="M967.759,1365.592q0,1.377-.019,1.717-.076,1.114-.151,1.622a3.981,3.981,0,0,1-.245.925,1.847,1.847,0,0,1-.453.717,2.171,2.171,0,0,1-1.151.6q-3.585.265-7.641.189-2.377-.038-3.387-.085a11.337,11.337,0,0,1-1.5-.142,2.206,2.206,0,0,1-1.113-.585,2.562,2.562,0,0,1-.528-1.037,3.523,3.523,0,0,1-.141-.585c-.032-.2-.06-.5-.085-.906a38.894,38.894,0,0,1,0-4.867l.113-.925a4.382,4.382,0,0,1,.208-.906,2.069,2.069,0,0,1,.491-.755,2.409,2.409,0,0,1,1.113-.566,19.2,19.2,0,0,1,2.292-.151q1.82-.056,3.953-.056t3.952.066q1.821.067,2.311.142a2.3,2.3,0,0,1,.726.283,1.865,1.865,0,0,1,.557.49,3.425,3.425,0,0,1,.434,1.019,5.72,5.72,0,0,1,.189,1.075q0,.095.057,1C967.752,1364.1,967.759,1364.677,967.759,1365.592Zm-7.6.925q1.49-.754,2.113-1.094l-4.434-2.339v4.66Q958.609,1367.311,960.156,1366.517Z"
                                                            transform="translate(-951.269 -1359.8)"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Youtube</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="guarantee__safe--checkout">
                                        <h5 className="guarantee__safe--checkout__title">
                                            Guaranteed Safe Checkout
                                        </h5>
                                        <img
                                            className="guarantee__safe--checkout__img"
                                            src="assets/img/other/safe-checkout.webp"
                                            alt="Payment Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Start product details tab section */}
                <section className="product__details--tab__section section--padding">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <ul className="product__tab--one product__details--tab d-flex mb-30">
                                    <li
                                        className={`product__details--tab__list ${reviewOpen === true ? "active" : ""}`}
                                        onClick={handleReviewClick}
                                    >
                                        Product Reviews
                                    </li>
                                    <li
                                        className={`product__details--tab__list ${reviewOpen === true ? "" : "active"}`}
                                        onClick={handleAddClick}
                                    >
                                        Additional Info
                                    </li>
                                </ul>
                                <div className="product__details--tab__inner border-radius-10">
                                    <div className="tab_content">
                                        {
                                            reviewOpen ?
                                                <>
                                                    <div className="product__reviews">
                                                        <div className="product__reviews--header">
                                                            <h2 className="product__reviews--header__title h3 mb-20">
                                                                Customer Reviews
                                                            </h2>
                                                        </div>
                                                        <div className="reviews__comment--area">
                                                            {
                                                                add_Details?.reviews?.map((e, index) => {
                                                                    return (
                                                                        <div className="reviews__comment--list d-flex" key={index}>
                                                                            <div className="reviews__comment--thumb">
                                                                                <img
                                                                                    src="assets/img/other/comment-thumb1.webp"
                                                                                    alt="comment-thumb"
                                                                                />
                                                                            </div>
                                                                            <div className="reviews__comment--content">
                                                                                <div className="reviews__comment--top d-flex justify-content-between">
                                                                                    <div className="reviews__comment--top__left">
                                                                                        <h3 className="reviews__comment--content__title h4">
                                                                                            {e?.user?.name}
                                                                                        </h3>
                                                                                        <ul className="rating d-flex">
                                                                                            <li className="rating__list">
                                                                                                <span className="rating__icon">
                                                                                                    {
                                                                                                        e?.rating === 0 &&
                                                                                                        <>
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </>
                                                                                                    }
                                                                                                    {
                                                                                                        e?.rating === 1 &&
                                                                                                        <>
                                                                                                            <AiFillStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </>
                                                                                                    }
                                                                                                    {
                                                                                                        e?.rating === 2 &&
                                                                                                        <>
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </>
                                                                                                    }
                                                                                                    {
                                                                                                        e?.rating === 3 &&
                                                                                                        <>
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiOutlineStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </>
                                                                                                    }
                                                                                                    {
                                                                                                        e?.rating === 4 &&
                                                                                                        <>
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiOutlineStar />
                                                                                                        </>
                                                                                                    }
                                                                                                    {
                                                                                                        e?.rating === 5 &&
                                                                                                        <>
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                            <AiFillStar />
                                                                                                        </>
                                                                                                    }
                                                                                                </span>
                                                                                            </li>

                                                                                        </ul>
                                                                                    </div>
                                                                                    <span className="reviews__comment--content__date">
                                                                                        {dateFormate(e?.user?.updated_at)}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="reviews__comment--content__desc">
                                                                                    {e?.text}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        {/* <div
                                                            id="writereview"
                                                            className="reviews__comment--reply__area"
                                                        >
                                                            <form onSubmit={handleSubmitReview}>
                                                                <h3 className="reviews__comment--reply__title mb-15">
                                                                    Add a review
                                                                </h3>
                                                                <div className="reviews__ratting mb-20">
                                                                    <ul className="rating d-flex">
                                                                        <Rating name="size-large" defaultValue={rating} onChange={(e) => setRating(e.target.value)} size="large" style={{ color: "red" }} />
                                                                    </ul>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12 mb-10">
                                                                        <textarea
                                                                            className="reviews__comment--reply__textarea"
                                                                            placeholder="Your Reviews...."
                                                                            value={reviewText}
                                                                            onChange={(e) => setReviewText(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    className="primary__btn text-white"
                                                                    data-hover="Submit"
                                                                    type="submit"
                                                                >
                                                                    SUBMIT
                                                                </button>
                                                            </form>
                                                        </div> */}
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="product__tab--conten">
                                                        <div className="product__tab--content__step">
                                                            <ul className="additional__info_list">
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Color</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        Black, white, blue, red, gray
                                                                    </span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Weight</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">2kg</span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Brand</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">Gadget</span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Guarantee</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        5 years
                                                                    </span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Battery</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        10000 mA
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ShippingAddress />
            </main>
        </>
    )
}

export default SingleProductsDetails