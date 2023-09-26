import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { cartTotalPrice, qtyIncrementDecrement, removeProductAddtocart } from '../store/reducers/ProductSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { addto_cart, cart_total_price } = useSelector((state) => ({ ...state.products }));
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleInc = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: + 1 }))
        dispatch(cartTotalPrice())

    }
    const handleDec = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: - 1 }))
        dispatch(cartTotalPrice())

    }
    const removeElement = (id) => {
        dispatch(removeProductAddtocart(id))
    };

    const handleCheckout = ()=>{
        navigate('/checkout')
    }

    return (
        <>
            <main className="main__content_wrapper">
                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title mb-25"> Cart</h1>
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="index.html">Home</a>
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
                                                                    <span className="cart__price">${e?.price}/-</span>
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
                                                                    <span className="cart__price end">${e?.price * e?.qty}/-</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr className="cart__table--body__items" >
                                                    <td className="cart__table--body__list">
                                                        {/* <span className="cart__price end">Total Price</span> */}
                                                    </td>
                                                    <td className="cart__table--body__list">
                                                    </td>
                                                    <td className="cart__table--body__list">
                                                    </td>
                                                    <td className="cart__table--body__list">
                                                        <span className="cart__price end">
                                                            <button className='checkout_btn' onClick={handleCheckout}>
                                                                CheckOut
                                                            </button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Start shipping section */}
                <section className="shipping__section">
                    <div className="container">
                        <div className="shipping__inner style2 d-flex">
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping1.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Free Shipping</h2>
                                    <p className="shipping__content--desc">Free shipping over $100</p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping2.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Support 24/7</h2>
                                    <p className="shipping__content--desc">Contact us 24 hours a day</p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping3.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">100% Money Back</h2>
                                    <p className="shipping__content--desc">
                                        You have 30 days to Return
                                    </p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping4.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Payment Secure</h2>
                                    <p className="shipping__content--desc">We ensure secure payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default Cart