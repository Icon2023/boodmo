import React, { useEffect, useState } from "react";
import ShippingAddress from "../Subpages/ShippingAddress";
import { useDispatch, useSelector } from "react-redux";
import { CartList, MakeOrderId, OrderComplete } from "../Services/apiServices";
import { addLoginCart } from "../store/reducers/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    coupon_code,
    login_cart,
    add_ship,
    selected_value_address,
    coupon_value,
  } = useSelector((state) => ({ ...state.products }));

  const productsArray = [];
  login_cart.map((obj) => {
    const payload = {
      productId: obj?.product_id,
      price: obj?.price,
      qty: obj?.qty,
      image: obj?.product?.images[0]?.image,
      name: obj?.product?.name,
    };
    productsArray.push(payload);
  });

  const user = JSON.parse(localStorage.getItem("USER"));
  const [orderId, setOrderId] = useState("");
  const [receipt, setReceipt] = useState("");
  const [currency, setCurrency] = useState("");
  const [razorpayPaymentId, setRazorpayPaymentId] = useState("");
  const [razorpaySignatureId, setRazorpaySignatureId] = useState("");
  const [email, setEmail] = useState("");
  const countTotal = (items) =>
    items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

  useEffect(() => {
    CartList().then((res) => {
      if (res.success) {
        dispatch(addLoginCart(res?.data));
      }
    });
    if (user?.data?.mobile) {
      setEmail(user?.data?.mobile);
    } else {
      setEmail(user?.data?.email);
    }
  }, []);

  const handleCompleteOrder = (data) => {
    const payload = {
      coupon_code: coupon_value?.coupon,
      coupon_value: coupon_value?.coupon_value,
      order_status: "placed",
      payment_status: "success",
      total_amount: data.amount,
      currency: data.currency,
      receipt_id: data.receipt,
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
      address_id: 1,
      products: JSON.stringify(productsArray),
    };

    OrderComplete(payload).then((res) => {
      if (res?.success) {
        localStorage.removeItem("rzp_device_id");
        localStorage.removeItem("rzp_checkout_anon_id");
        navigate("/");
      }
    });
  };

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_AZtWJgBQanQ0EK",
      // amount : parseInt(data.amount * 100),
      currency: data.currency,
      order_id: data.id,
      name: "Shopping App",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      description: "Payment for the products you have purchased.",
      handler: function (response) {
        response["currency"] = data.currency;
        response["amount"] = data.amount / 100;
        response["receipt"] = data.receipt;
        setRazorpayPaymentId(response.razorpay_payment_id);
        setRazorpaySignatureId(response.razorpay_signature);
        handleCompleteOrder(response);
      },
      theme: {
        color: "#ebe4db",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log(response);
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp.open();
  };

  const handleSubmit = () => {
    let data = {
      currency: "INR",
      amount:
        parseInt(
          countTotal(login_cart) -
            countTotal(login_cart) * (coupon_code?.coupon_discount / 100)
            ? countTotal(login_cart) -
            (
              countTotal(login_cart) *
              (coupon_code?.coupon_discount / 100)
            ).toFixed(2)
            : countTotal(login_cart)
        ) * 100,
    };
    console.log(data);
    MakeOrderId(data).then((res) => {
      if (res?.success) {
        console.log(res.data);
        setOrderId(res.data.id);
        setReceipt(res.data.receipt);
        setCurrency(res.data.currency);
        handleOpenRazorpay(res.data);
      }
    });
  };

  return (
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
                    <span>Review</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start checkout page area */}
      <div className="checkout__page--area section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="main checkout__mian">
                <div className="checkout__content--step section__contact--information">
                  <div className="section__header checkout__section--header d-flex align-items-center justify-content-between mb-25">
                    <h2 className="section__header--title h3">
                      Contact information
                    </h2>
                  </div>
                  <div className="customer__information">
                    <div className="checkout__email--phone mb-12">
                      <label>
                        <input
                          className="checkout__input--field border-radius-5"
                          placeholder="Email or mobile phone mumber"
                          type="text"
                          value={email}
                          disabled
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="checkout__content--step section__shipping--address">
                  <div className="section__header mb-25">
                    <h2 className="section__header--title h3">
                      Billing Details
                    </h2>
                  </div>
                  <div className="section__shipping--address__content">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                        <div className="checkout__input--list ">
                          <label
                            className="checkout__input--label"
                            htmlFor="input1"
                          >
                            First Name
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="First name"
                            type="text"
                            value={selected_value_address?.first_name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input2"
                          >
                            Last Name
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="Last name"
                            type="text"
                            value={selected_value_address?.last_name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-12 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input3"
                          >
                            Company Name
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="Company (optional)"
                            type="text"
                            value={selected_value_address?.company_name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-12 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input4"
                          >
                            Address
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="Address"
                            type="text"
                            value={selected_value_address?.address}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input5"
                          >
                            City
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="City"
                            type="text"
                            value={selected_value_address?.city}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input5"
                          >
                            State
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="State"
                            type="text"
                            value={selected_value_address?.state}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input6"
                          >
                            Country/region
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="country"
                            type="text"
                            value={selected_value_address?.country}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-20">
                        <div className="checkout__input--list">
                          <label
                            className="checkout__input--label"
                            htmlFor="input6"
                          >
                            Pin Code
                            <span className="checkout__input--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="checkout__input--field border-radius-5"
                            placeholder="Pin code"
                            type="number"
                            value={selected_value_address?.pincode}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout__content--step__footer d-flex align-items-center">
                  <Link className="previous__link--content" to="/checkout">
                    <IoIosArrowBack /> Return to Information
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="continue__shipping--btn primary__btn border-radius-5"
                    id="rzp-button1"
                    onClick={handleSubmit}
                  >
                    Continue To Payment
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <aside className="checkout__sidebar sidebar border-radius-10">
                <h2 className="checkout__order--summary__title text-center mb-15">
                  Your Order Summary
                </h2>
                <div className="cart__table checkout__product--table">
                  <table className="cart__table--inner">
                    <tbody className="cart__table--body">
                      {login_cart?.map((e, index) => {
                        return (
                          <tr className="cart__table--body__items" key={index}>
                            <td className="cart__table--body__list">
                              <div className="product__image two  d-flex align-items-center">
                                <div className="product__thumbnail border-radius-5">
                                  <a className="display-block">
                                    <img
                                      className="display-block border-radius-5"
                                      src={e?.product?.images[0].image}
                                      alt="cart-product"
                                    />
                                  </a>
                                  <span className="product__thumbnail--quantity">
                                    {e?.qty}
                                  </span>
                                </div>
                                <div className="product__description">
                                  <h4 className="product__description--name">
                                    <p>{e?.product?.name}</p>
                                  </h4>
                                </div>
                              </div>
                            </td>
                            <td className="cart__table--body__list">
                              <span className="cart__price">
                                {e?.price * e?.qty}/-
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="checkout__total">
                  <table className="checkout__total--table">
                    <tbody className="checkout__total--body">
                      <tr className="checkout__total--items">
                        <td className="checkout__total--title text-left">
                          Subtotal
                        </td>
                        <td className="checkout__total--amount text-right">
                          <h4>{countTotal(login_cart)}/-</h4>
                        </td>
                      </tr>
                      <tr className="checkout__total--items">
                        <td className="checkout__total--title text-left">
                          Discount ( {add_ship?.coupon} Appied )
                        </td>
                        <td className="checkout__total--calculated__text text-right">
                          {countTotal(login_cart) *
                            (coupon_code?.coupon_discount / 100)
                            ? (
                              countTotal(login_cart) *
                              (coupon_code?.coupon_discount / 100)
                            ).toFixed(2)
                            : 0}
                          /-
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="checkout__total--footer">
                      <tr className="checkout__total--footer__items">
                        <td className="checkout__total--footer__title checkout__total--footer__list text-left">
                          Total
                        </td>
                        <td className="checkout__total--footer__amount checkout__total--footer__list text-right">
                          {countTotal(login_cart) -
                            countTotal(login_cart) *
                            (coupon_code?.coupon_discount / 100)
                            ? countTotal(login_cart) -
                            (
                              countTotal(login_cart) *
                              (coupon_code?.coupon_discount / 100)
                            ).toFixed(2)
                            : countTotal(login_cart)}
                          /-
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="payment__history mb-30">
                  <h3 className="payment__history--title mb-20">Payment</h3>
                  <ul className="payment__history--inner d-flex">
                    <li className="payment__history--list">
                      <button
                        className="payment__history--link primary__btn"
                        type="submit"
                      >
                        Credit Card
                      </button>
                    </li>
                    <li className="payment__history--list">
                      <button
                        className="payment__history--link primary__btn"
                        type="submit"
                      >
                        Bank Transfer
                      </button>
                    </li>
                    <li className="payment__history--list">
                      <button
                        className="payment__history--link primary__btn"
                        type="submit"
                      >
                        Paypal
                      </button>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      
      <ShippingAddress />
    </main>
  );
};

export default Review;
