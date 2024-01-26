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
    const countTotal = (items) => items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

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
                <section className="container">
                    <div className="table-responsive mt-5">
                        {addto_cart?.length >= 1 || login_cart?.length >= 1 ? (
                            <>
                                {/* <h2 className="cart__title mb-30 ">Shopping Cart</h2> */}
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr className="text-center">
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th>QUANTITY</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user?.success !== true ? (
                                            <>
                                                {addto_cart?.map((e, index) => {
                                                    return (
                                                        <tr key={index} className="align-middle">
                                                            <td
                                                                className="d-md-flex align-align-items-lg-start"
                                                                style={{ minWidth: "300px", gap: "16px" }}
                                                            >
                                                                <button
                                                                    className="cart__remove--btn"
                                                                    onClick={() =>
                                                                        removeElement(e?.proId)
                                                                    }
                                                                >
                                                                    <AiOutlineClose />
                                                                </button>
                                                                <img
                                                                    className="border-radius-5"
                                                                    src={e?.image}
                                                                    style={{ width: "100px", height: "auto" }}
                                                                    alt="cart-product"
                                                                />
                                                                <aside>
                                                                    <h3 className="">
                                                                        <a
                                                                            href={`/productsdetail/${e?.part_no}`}
                                                                        >
                                                                            {e?.name}
                                                                        </a>
                                                                    </h3>
                                                                    <p>{e?.desc}</p>
                                                                </aside>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    minWidth: "103px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <p className="">₹ {e?.price}/-</p>
                                                            </td>
                                                            <td>
                                                                <div className="quantity__box justify-content-center">
                                                                    <button
                                                                        onClick={() => handleDec(e?.proId)}
                                                                        disabled={e?.qty == 1 ? true : false}
                                                                        className="quantity__value quickview__value--quantity decrease"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <h3 className="ms-3 me-3 mt-2">{e?.qty}</h3>
                                                                    <button
                                                                        onClick={() => handleInc(e?.proId)}
                                                                        className="quantity__value quickview__value--quantity increase"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="text-center">
                                                                    ₹ {(e?.price * e?.qty).toLocaleString("en-IN")}/-
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    login_cart?.map((e, index) => {
                                                        return (
                                                            <tr key={index} className="align-middle">
                                                                <td
                                                                    className="d-md-flex align-items-start"
                                                                    style={{ minWidth: "300px", gap: "16px" }}
                                                                >
                                                                    <button className="cart__remove--btn" onClick={() => removeLoginElement(e?.id)}>
                                                                        <AiOutlineClose />
                                                                    </button>
                                                                    <img
                                                                        className="border-radius-5"
                                                                        src={e?.product?.images[0].image}
                                                                        style={{ width: "100px", height: "auto" }}
                                                                        alt="cart-product" />
                                                                    <aside>
                                                                        <h3 className="">
                                                                            <a
                                                                                href={`/productsdetail/${e?.product?.part_no}`}
                                                                            >
                                                                                {e?.product?.name}
                                                                            </a>
                                                                        </h3>
                                                                        <p>{e?.product?.desc}</p>
                                                                    </aside>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        minWidth: "103px",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    <p className="text-center">
                                                                        ₹ {(
                                                                            e?.product?.original_price * 1
                                                                        ).toLocaleString("en-IN")}
                                                                        /-
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <div className="quantity__box justify-content-center">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleLoginDec(
                                                                                    e?.product_id,
                                                                                    e?.qty - 1,
                                                                                    e?.product?.original_price
                                                                                )
                                                                            }
                                                                            disabled={e?.qty == 1 ? true : false}
                                                                            className="quantity__value quickview__value--quantity decrease"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <h3 className="ms-3 me-3 mt-2">{e?.qty}</h3>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleLoginInc(
                                                                                    e?.product_id,
                                                                                    e?.qty + 1,
                                                                                    e?.product?.original_price
                                                                                )
                                                                            }
                                                                            className="quantity__value quickview__value--quantity increase"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="">
                                                                        ₹  {(
                                                                            e?.product?.original_price * e?.qty
                                                                        ).toLocaleString("en-IN")}
                                                                        /-
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        {user?.success !== true ?
                                            <>
                                                <tr>
                                                    <td colspan={3} style={{ fontWeight: "600" }}>
                                                        <p>SubTotal:</p>
                                                        <p>Estimated delivery costs:</p>
                                                        <p>Total:</p>

                                                    </td>
                                                    <td className="text-center">
                                                        <p>₹ {countTotal(addto_cart)}/-</p>
                                                        <p>₹ 100/-</p>
                                                        <p>₹ {countTotal(addto_cart) + 100}/-</p>
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            <>
                                                <tr>
                                                    <td colspan={3} style={{ fontWeight: "600" }}>
                                                        <p>SubTotal:</p>
                                                        <p>Estimated delivery costs:</p>
                                                        <p>Total:</p>

                                                    </td>
                                                    <td className="text-center">
                                                        <p>₹ {countTotal(login_cart)}/-</p>
                                                        <p>₹ 100/-</p>
                                                        <p>₹ {countTotal(login_cart) + 100}/-</p>
                                                    </td>
                                                </tr>
                                            </>
                                        }

                                    </tfoot>
                                </table>
                                <span className="cart__checkout">
                                    <button className="checkout_btn" onClick={handleCheckout}>
                                        CheckOut
                                    </button>
                                </span>
                            </>
                        ) : (
                            <>
                                <img
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "block",
                                    }}
                                    src="https://nmkonline.com/images/pages/tumbleweed.gif"
                                    alt=""
                                />
                            </>
                        )}
                    </div>
                </section>
                {/* Start shipping section */}
                <ShippingAddress />
            </main>
        </>
    )
}

export default Cart