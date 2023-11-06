import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress';
import { useDispatch, useSelector } from 'react-redux';
import { CartList,GetCouponCode } from '../Services/apiServices';
import { addLoginCart, add_coupon_code, add_ship_details, remove_coupon_code } from '../store/reducers/ProductSlice';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addto_cart, coupon_code, login_cart, add_ship } = useSelector((state) => ({ ...state.products }));

    const user = JSON.parse(localStorage.getItem('USER'));
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [coupon, setCoupon] = useState('');
    const [invaildCoupon, setInvaildCoupon] = useState('');
    const countTotal = (items) => items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

    useEffect(() => {
    
        CartList().then((res) => {
            if (res.success) {
                dispatch(addLoginCart(res?.data))
            }
        })
        if (coupon_code) {
            setCoupon(coupon_code?.coupon_code)
        }
        if (user?.data?.mobile) {
            setEmail(user?.data?.mobile)
        } else {
            setEmail(user?.data?.email)
        }

        if (add_ship) {
            setFname(add_ship?.first_name);
            setLname(add_ship?.last_name);
            setCompanyName(add_ship?.company_name);
            setAddress(add_ship?.address);
            setCity(add_ship?.city);
            setState(add_ship?.state);
            setCountry(add_ship?.country);
            setPincode(add_ship?.zip)
        }
    }, [])

    const handleChange = (e) => {
        if (!e.target.value) {
            dispatch(remove_coupon_code())
            setInvaildCoupon('')
        }
        setCoupon(e.target.value)
    }

    const handleCouponApply = () => {
        GetCouponCode(coupon).then((res) => {
            if (res?.success) {
                dispatch(add_coupon_code(res?.data))
                setInvaildCoupon('')
            } else {
                dispatch(remove_coupon_code())
                setInvaildCoupon(res?.message)
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            first_name: fname,
            last_name: lname,
            company_name: companyName,
            address: address,
            state: state,
            city: city,
            zip: pincode,
            country: country,
        }
        console.log(data);
        dispatch(add_ship_details(data))
        navigate('/review')
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
                                            <span>Checkout</span>
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
                                    <form onSubmit={handleSubmit}>
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
                                                <h2 className="section__header--title h3">Shipping Details</h2>
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
                                                                value={fname}
                                                                onChange={(e) => setFname(e.target.value)}
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
                                                                value={lname}
                                                                onChange={(e) => setLname(e.target.value)}
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
                                                                value={companyName}
                                                                onChange={(e) => setCompanyName(e.target.value)}
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
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
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
                                                                value={city}
                                                                onChange={(e) => setCity(e.target.value)}
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
                                                                value={state}
                                                                onChange={(e) => setState(e.target.value)}
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
                                                                value={country}
                                                                onChange={(e) => setCountry(e.target.value)}
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
                                                                value={pincode}
                                                                onChange={(e) => setPincode(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout__content--step__footer d-flex align-items-center">
                                            <button
                                                className="continue__shipping--btn primary__btn border-radius-5"
                                            >
                                                Continue To Shipping
                                            </button>
                                            <Link className="previous__link--content" to="/cart">
                                                Return to cart
                                            </Link>
                                        </div>
                                    </form>
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
                                                {
                                                    user?.success !== true ?
                                                        <>
                                                            {
                                                                addto_cart?.map((e, index) => {
                                                                    return (
                                                                        <tr className="cart__table--body__items" key={index}>
                                                                            <td className="cart__table--body__list">
                                                                                <div className="product__image two  d-flex align-items-center">
                                                                                    <div className="product__thumbnail border-radius-5">
                                                                                        <a
                                                                                            className="display-block"
                                                                                        >
                                                                                            <img
                                                                                                className="display-block border-radius-5"
                                                                                                src={e?.image}
                                                                                                alt="cart-product"
                                                                                            />
                                                                                        </a>
                                                                                        <span className="product__thumbnail--quantity">
                                                                                            {e?.qty}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="product__description">
                                                                                        <h4 className="product__description--name">
                                                                                            <a href="product-details.html">
                                                                                                {e?.name}
                                                                                            </a>
                                                                                        </h4>
                                                                                        <span className="product__description--variant">
                                                                                            COLOR: Blue
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="cart__table--body__list">
                                                                                <span className="cart__price">{e?.qty * e?.price}/-</span>
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
                                                                                            <p>
                                                                                                {e?.product?.name}
                                                                                            </p>
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="cart__table--body__list">
                                                                                <span className="cart__price">{e?.price * e?.qty}/-</span>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="checkout__discount--code">
                                        <div className="d-flex">
                                            <label>
                                                <input
                                                    className="checkout__discount--code__input--field border-radius-5"
                                                    style={{ textTransform: "uppercase" }}
                                                    placeholder="Gift card or discount code"
                                                    type="text"
                                                    value={coupon} onChange={handleChange}
                                                />
                                            </label>
                                            <button
                                                className="checkout__discount--code__btn primary__btn border-radius-5"
                                                type="submit"
                                                onClick={handleCouponApply}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        <p className='ml-4'>{invaildCoupon}</p>
                                    </div>
                                    <div className="checkout__total">
                                        <table className="checkout__total--table">
                                            <tbody className="checkout__total--body">
                                                <tr className="checkout__total--items">
                                                    <td className="checkout__total--title text-left">
                                                        Subtotal
                                                    </td>
                                                    <td className="checkout__total--amount text-right">
                                                        {
                                                            user?.success !== true ?
                                                                <>
                                                                    <h4>{countTotal(addto_cart)}/-</h4>
                                                                </>
                                                                : <>
                                                                    {
                                                                        <h4>{countTotal(login_cart)}/-</h4>
                                                                    }
                                                                </>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr className="checkout__total--items">
                                                    <td className="checkout__total--title text-left">
                                                        Shipping
                                                    </td>
                                                    <td className="checkout__total--calculated__text text-right">
                                                        {
                                                            user?.success !== true ?
                                                                <>
                                                                    {(countTotal(addto_cart)) * (coupon_code?.coupon_discount / 100) ? ((countTotal(addto_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : 0}/-
                                                                </>
                                                                :
                                                                <>
                                                                    {(countTotal(login_cart)) * (coupon_code?.coupon_discount / 100) ? ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : 0}/-
                                                                </>
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="checkout__total--footer">
                                                <tr className="checkout__total--footer__items">
                                                    <td className="checkout__total--footer__title checkout__total--footer__list text-left">
                                                        Total
                                                    </td>
                                                    <td className="checkout__total--footer__amount checkout__total--footer__list text-right">
                                                        {
                                                            user?.success !== true ?
                                                                <>
                                                                    {countTotal(addto_cart) - ((countTotal(addto_cart)) * (coupon_code?.coupon_discount / 100)) ? countTotal(addto_cart) - ((countTotal(addto_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : countTotal(addto_cart)}/-

                                                                </>
                                                                :
                                                                <>
                                                                    {countTotal(login_cart) - ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)) ? countTotal(login_cart) - ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : countTotal(login_cart)}/-
                                                                </>
                                                        }
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
        </>
    )
}

export default Checkout