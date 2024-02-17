import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addLoginCart,
  login_qtyIncrement_Decrement,
  qtyIncrementDecrement,
  removeLoginAddtocart,
  removeProductAddtocart,
} from "../store/reducers/ProductSlice";
import { useNavigate } from "react-router-dom";
import {
  Add_Tocart_Login,
  CartList,
  CartLoginDelete,
} from "../Services/apiServices";
import ShippingAddress from "../Subpages/ShippingAddress";
import Breadcrumb from "../Utils/breadcrumb";
import { RiShoppingCart2Line } from "react-icons/ri";
import { motion } from "framer-motion";

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
        console.log(res?.data);
      }
    })
    window.scrollTo(0, 0);
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
    dispatch(login_qtyIncrement_Decrement({ id, plusMinus: +1 }));
    let data = {
      product_id: id,
      price,
      qty,
    };
    Add_Tocart_Login(data).then((res) => { });
  };

  const handleLoginDec = (id, qty, price) => {
    dispatch(login_qtyIncrement_Decrement({ id, plusMinus: -1 }));
    let data = {
      product_id: id,
      price,
      qty,
    };
    Add_Tocart_Login(data).then((res) => { });
  };

  return (
    <>
      <main className="margin_top_all">
        <Breadcrumb
          subTitle2="Cart"
          icon2={
            <RiShoppingCart2Line
              color="#363062"
              style={{
                fontSize: "22px",
                marginRight: "4px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          }
        />
        {/* cart section start */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="header">
          <section className="container">
            <div className="table-responsive mt-5">
              {addto_cart?.length > 0 || login_cart?.length > 0 ? (
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
                                    onClick={() => removeElement(e?.proId)}
                                  >
                                    <AiOutlineClose />
                                  </button>
                                  <img
                                    className="border-radius-5"
                                    // src={e?.image}
                                    src='https://avatars.mds.yandex.net/i?id=1b4bc532efe7ab812edc8fbb4f3290913c22ff63-9149598-images-thumbs&n=13'
                                    style={{ width: "100px", height: "auto" }}
                                    alt="cart-product"
                                  />
                                  <aside>
                                    <h3 className="">
                                      <a href={`/productsdetail/${e?.part_no}`}>
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
                                  <p className="text-center">₹ {e?.price}/-</p>
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
                                    ₹
                                    {(e?.price * e?.qty).toLocaleString(
                                      "en-IN"
                                    )}
                                    /-
                                  </p>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {login_cart?.map((e, index) => {
                            return (
                              <tr key={index} className="align-middle">
                                <td
                                  className="d-md-flex align-items-start"
                                  style={{ minWidth: "300px", gap: "16px" }}
                                >
                                  <button
                                    className="cart__remove--btn"
                                    onClick={() => removeLoginElement(e?.id)}
                                  >
                                    <AiOutlineClose />
                                  </button>
                                  <img
                                    className="border-radius-5"
                                    // src={e?.product?.images[0].image}
                                    src='https://avatars.mds.yandex.net/i?id=1b4bc532efe7ab812edc8fbb4f3290913c22ff63-9149598-images-thumbs&n=13'
                                    style={{ width: "100px", height: "auto" }}
                                    alt="cart-product"
                                  />
                                  <aside>
                                    <h3 className="">
                                      <a
                                        href={`/productsdetail/${e?.product?.pn}`}
                                      >
                                        {e?.product?.part_name}
                                      </a>
                                    </h3>
                                    {/* <p>Part Number:-{e?.product?.pn}</p> */}
                                  </aside>
                                </td>
                                <td
                                  style={{
                                    minWidth: "103px",
                                    textAlign: "center",
                                  }}
                                >
                                  <p className="text-center">
                                    ₹
                                    {(
                                      e?.price * 1
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
                                          e?.price
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
                                          e?.price
                                        )
                                      }
                                      className="quantity__value quickview__value--quantity increase"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-center">
                                    ₹
                                    {(
                                      e?.price * e?.qty
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
                      {user?.success !== true ? (
                        <>
                          <tr>
                            <td colspan={3} style={{ fontWeight: "600" }}>
                              <p>SubTotal:</p>
                              <p>Estimated delivery costs:</p>
                              <p>Total:</p>
                            </td>
                            <td className="text-center">
                              <p>₹ {countTotal(addto_cart).toLocaleString("en-IN")}/-</p>
                              <p>₹ 100/-</p>
                              <p>₹ {(countTotal(addto_cart) + 100).toLocaleString("en-IN")}/-</p>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td colspan={3} style={{ fontWeight: "600" }}>
                              <p>SubTotal:</p>
                              <p>Estimated delivery costs:</p>
                              <p>Total:</p>
                            </td>
                            <td className="text-center">
                              <p>₹ {countTotal(login_cart).toLocaleString("en-IN")}/-</p>
                              <p>₹ 100/-</p>
                              <p>₹ {(countTotal(login_cart) + 100).toLocaleString("en-IN")}/-</p>
                            </td>
                          </tr>
                        </>
                      )}
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
        </motion.header>
        {/* Start shipping section */}
        <ShippingAddress />
      </main>
    </>
  );
};

export default Cart;
