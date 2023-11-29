import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginCart, login_qtyIncrement_Decrement, qtyIncrementDecrement, removeLoginAddtocart, removeProductAddtocart } from '../store/reducers/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { Add_Tocart_Login, CartList, CartLoginDelete } from '../Services/apiServices';
import ShippingAddress from '../Subpages/ShippingAddress';

const Cart = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addto_cart, login_cart } = useSelector((state) => ({ ...state.products }));

    const handleCheckout = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        CartList().then((res) => {
            if (res.success) {
                dispatch(addLoginCart(res?.data))
            }
        })
    }, [])


    const handleInc = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: + 1 }))
    }

    const handleDec = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: - 1 }))
    }

    const removeElement = (id) => {
        dispatch(removeProductAddtocart(id))
    };

    const removeLoginElement = (id) => {
        CartLoginDelete(id).then((res) => {
        })
        dispatch(removeLoginAddtocart(id))
    };

    const handleLoginInc = (id, qty, price) => {
        dispatch(login_qtyIncrement_Decrement({ id, plusMinus: + 1 }))
        let data = {
            product_id: id,
            price,
            qty,
        }
        Add_Tocart_Login(data).then((res) => {
        })
    }

    const handleLoginDec = (id, qty, price) => {
        dispatch(login_qtyIncrement_Decrement({ id, plusMinus: - 1 }))
        let data = {
            product_id: id,
            price,
            qty,
        }
        Add_Tocart_Login(data).then((res) => {
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
                                    <h1 className="breadcrumb__content--title mb-25"> Cart</h1>
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb__content--menu__items">
                                            <span>Shopping Cart</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* cart section start */}
                <section className="cart__section section--padding">
                    <div className="container">
                        {
                            addto_cart?.length >= 1 || login_cart?.length >= 1 ?
                                <>
                                    <div className="cart__section--inner">
                                        <h2 className="cart__title mb-30">Shopping Cart</h2>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="cart__table">
                                                    <table className="cart__table--inner">
                                                        <thead className="cart__table--header">
                                                            <tr className="cart__table--header__items">
                                                                <th className="cart__table--header__list">Product</th>
                                                                <th className="cart__table--header__list">Price</th>
                                                                <th className="cart__table--header__list">Quantity</th>
                                                                <th className="cart__table--header__list">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="cart__table--body">
                                                            {
                                                                user?.success !== true ?
                                                                    <>
                                                                        {
                                                                            addto_cart.map((e, index) => {
                                                                                return (
                                                                                    <tr className="cart__table--body__items" key={index}>
                                                                                        <td className="cart__table--body__list">
                                                                                            <div className="cart__product d-flex align-items-center">
                                                                                                <button
                                                                                                    className="cart__remove--btn"
                                                                                                    aria-label="search button"
                                                                                                    onClick={() => removeElement(e?.proId)}
                                                                                                >
                                                                                                    <AiOutlineClose />
                                                                                                </button>
                                                                                                <div className="cart__thumbnail">
                                                                                                    <a href="product-details.html">
                                                                                                        <img
                                                                                                            className="border-radius-5"
                                                                                                            src={e?.image}
                                                                                                            alt="cart-product"
                                                                                                        />
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div className="cart__content">
                                                                                                    <h3 className="cart__content--title h4">
                                                                                                        <a href="product-details.html">
                                                                                                            {e?.name}
                                                                                                        </a>
                                                                                                    </h3>
                                                                                                    <span className="cart__content--variant">
                                                                                                        COLOR: Blue
                                                                                                    </span>
                                                                                                    <span className="cart__content--variant">
                                                                                                        WEIGHT: 2 Kg
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <span className="cart__prices">{e?.price}/-</span>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <div className="quantity__box">
                                                                                                <button
                                                                                                    onClick={() => handleDec(e?.proId)}
                                                                                                    disabled={e?.qty == 1 ? true : false}
                                                                                                    className="quantity__value quickview__value--quantity decrease"
                                                                                                >
                                                                                                    -
                                                                                                </button>
                                                                                                <h3 className="ms-3 me-3 mt-2">
                                                                                                    {e?.qty}
                                                                                                </h3>
                                                                                                <button
                                                                                                    onClick={() => handleInc(e?.proId)}
                                                                                                    className="quantity__value quickview__value--quantity increase">
                                                                                                    +
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <span className="cart__prices">{e?.price * e?.qty}/-</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {
                                                                            login_cart?.map((e, index) => {
                                                                                return (
                                                                                    <tr className="cart__table--body__items" key={index}>
                                                                                        <td className="cart__table--body__list">
                                                                                            <div className="cart__product d-flex align-items-center">
                                                                                                <button
                                                                                                    className="cart__remove--btn"
                                                                                                    aria-label="search button"
                                                                                                    onClick={() => removeLoginElement(e?.id)}
                                                                                                >
                                                                                                    <AiOutlineClose />
                                                                                                </button>
                                                                                                <div className="cart__thumbnail">
                                                                                                    <a href={`/productsdetail/${e?.product_id}`}>
                                                                                                        <img
                                                                                                            className="border-radius-5"
                                                                                                            src={e?.product?.images[0].image}
                                                                                                            alt="cart-product"
                                                                                                        />
                                                                                                    </a>
                                                                                                </div>
                                                                                                <div className="cart__content">
                                                                                                    <h3 className="cart__content--title h4">
                                                                                                        <a href={`/productsdetail/${e?.product_id}`}>
                                                                                                            {e?.product?.name}
                                                                                                        </a>
                                                                                                    </h3>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <span className="cart__prices">{e?.product?.original_price}/-</span>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <div className="quantity__box">
                                                                                                <button
                                                                                                    onClick={() => handleLoginDec(e?.product_id, e?.qty - 1, e?.product?.original_price)}
                                                                                                    disabled={e?.qty == 1 ? true : false}
                                                                                                    className="quantity__value quickview__value--quantity decrease"
                                                                                                >
                                                                                                    -
                                                                                                </button>
                                                                                                <h3 className="ms-3 me-3 mt-2">
                                                                                                    {e?.qty}
                                                                                                </h3>
                                                                                                <button
                                                                                                    onClick={() => handleLoginInc(e?.product_id, e?.qty + 1, e?.product?.original_price)}
                                                                                                    className="quantity__value quickview__value--quantity increase">
                                                                                                    +
                                                                                                </button>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td className="cart__table--body__list">
                                                                                            <span className="cart__prices">{e?.product?.original_price * e?.qty}/-</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </>
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <span className="cart__checkout">
                                                        <button className='checkout_btn' onClick={handleCheckout}>
                                                            CheckOut
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <img style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} src="https://nmkonline.com/images/pages/tumbleweed.gif" alt="" />
                                </>
                        }
                    </div>
                </section>
                {/* Start shipping section */}
                <ShippingAddress />
            </main>
        </>
    )
}

export default Cart