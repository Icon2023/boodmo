import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress';
import { useDispatch, useSelector } from 'react-redux';
import { AddAddressUser, CartList, DeleteAddress, GetAddressUser, GetCouponCode } from '../Services/apiServices';
import { addLoginCart, add_coupon_code, add_ship_details, coupon_Pricevalue, removeAddress, remove_coupon_code, selectedValueAddress } from '../store/reducers/ProductSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import Breadcrumb from '../Utils/breadcrumb';
import { IoBarcodeOutline } from "react-icons/io5";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { coupon_code, login_cart, add_ship } = useSelector((state) => ({ ...state.products }));
    const user = JSON.parse(localStorage.getItem('USER'));
    const [email, setEmail] = useState('')
    const [formValues, setFormValues] = useState({
        fname: '',
        lname: '',
        companyName: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        add_title: ''
    });

    const [coupon, setCoupon] = useState('');
    const [invaildCoupon, setInvaildCoupon] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [isOpenDiscount, setIsOpenDiscount] = useState(false);
    const [errors, setErrors] = useState('');

    const countTotal = (items) => items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    const coupon_value = ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2)

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
        GetAddress();
    }, [])

    const GetAddress = () => {
        GetAddressUser().then((res) => {
            if (res?.success) {
                dispatch(add_ship_details(res?.data))
            } else {
                console.log("hello");
            }
        })
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            dispatch(remove_coupon_code())
            setInvaildCoupon('');
            setIsOpenDiscount(false)
        }
        setCoupon(e.target.value)
    }

    const handleCouponApply = () => {
        if (!coupon) {
        } else {
            GetCouponCode(coupon).then((res) => {
                if (res?.success) {
                    dispatch(add_coupon_code(res?.data))
                    setInvaildCoupon('')
                    setIsOpenDiscount(true)
                } else {
                    dispatch(remove_coupon_code())
                    setInvaildCoupon(res?.message)
                    setIsOpenDiscount(false)
                }
            })
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.fname) {
            newErrors.fname = 'Name is required';
        }

        if (!formValues.lname) {
            newErrors.lname = 'Last name is required';
        }

        if (!formValues.mobile) {
            newErrors.mobile = 'Mobile is required';
        }

        if (!formValues.address) {
            newErrors.address = 'Address is required';
        }

        if (!formValues.pincode) {
            newErrors.pincode = 'Pincode is required';
        }

        if (!formValues.state) {
            newErrors.state = 'State is required';
        }

        if (!formValues.city) {
            newErrors.city = 'City is required';
        }

        if (!formValues.add_title) {
            newErrors.add_title = 'Add title is required';
        }

        if (!formValues.country) {
            newErrors.country = 'Country is required';
        }
        setErrors(newErrors);

        // Return true if there are no errors, indicating a valid form
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            let code = {
                coupon,
                coupon_value,
            };
            dispatch(coupon_Pricevalue(code));
            let data = {
                first_name: formValues.fname,
                last_name: formValues.lname,
                mobile: formValues.mobile,
                address: formValues.address,
                pincode: formValues.pincode,
                state: formValues.state,
                city: formValues.city,
                country: formValues.city,
                address_title: formValues.add_title,
                country: formValues.country,
            };
            AddAddressUser(data).then((res) => {
                GetAddress();
                setIsOpen(false);
            });
            setFormValues({
                fname: '',
                lname: '',
                companyName: '',
                mobile: '',
                address: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                add_title: ''
            })
        }
    }

    const addressSave = () => {
        if (!selectedAddress) {
            alert("Please Selected  Address");
        } else {
            add_ship?.map((e) => {
                if (e?.id === selectedAddress) {
                    dispatch(selectedValueAddress(e));
                    navigate("/review");
                }
            });
        }
    };

    const handleOpenNewAddress = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false);
    };

    const handleAddressRemove = (id) => {
        dispatch(removeAddress(id));
        DeleteAddress(id).then((res) => {
            console.log(res);
        });
    };

    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors("");
    };

    return (
        <>
            <main className="margin_top_all">
                <Breadcrumb
          subTitle2="Checkout"
          icon2={
            <IoBarcodeOutline
              color="#363062"
              style={{
                fontSize: "22px",
                marginRight: "4px",
                boxSizing: "border-box",
                cursor:"pointer"
              }}
            />
          }
        />
                {/* Start checkout page area */}
                {login_cart?.length >= 1 ?
                    <div className="checkout__page--area section--padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-6">
                                    <div className="checkout__mian">
                                        <div className="checkout__content--step section__contact--information">
                                            <div className="section__header checkout__section--header d-flex align-items-center justify-content-between mb-25">
                                                <h2 className="section__header--title h3">
                                                    Contact information
                                                </h2>
                                            </div>
                                            <div className="customer__information">
                                                <div className="checkout__email--phone">
                                                    <label>Email
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

                                        <div className='Add_ship'>
                                            <h3
                                                className="text-center btn_address"
                                                onClick={handleOpenNewAddress}
                                            >
                                                <AiOutlinePlus
                                                    className="mb-1"
                                                    style={{ fontSize: "24px" }}
                                                />
                                                Add New Address
                                            </h3>
                                        </div>

                                        <div className='address-list'>
                                            {add_ship?.map((e, index) => {
                                                return (
                                                    <div key={index} className={`address-list__item ${selectedAddress === e?.id ? 'selected' : ''}`}>
                                                        <div className='address-item'
                                                            onClick={() => setSelectedAddress(e?.id)}>
                                                            <div className='address-item__body'>
                                                                <AiOutlineClose
                                                                    style={{ cursor: "pointer", textAlign: "end", position: "absolute", right: "2%", fontSize: "16px" }}
                                                                    onClick={() => handleAddressRemove(e?.id)}
                                                                />
                                                                <div className='address-item__title'>{e?.first_name} {e?.last_name}</div>
                                                                <div className='address-item__user'>{e?.address_title}</div>
                                                                <div className='address-item__address'>{e?.address} {e?.pincode}</div>
                                                                <div>{e?.mobile}</div>
                                                            </div>
                                                            <div className='address-item__action'>
                                                                <span className='address-item__action__text'>
                                                                    {selectedAddress === e?.id ? 'Selected address' : 'Deliver to this address'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {
                                            add_ship.length > 0 &&
                                            <button onClick={addressSave} className="primary__btn border-radius-5 w-auto">
                                                Continue
                                            </button>
                                        }
                                        {
                                            isOpen ?
                                                <>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="checkout__content--step section__shipping--address">
                                                            <div className="section__header mb-25">
                                                            </div>
                                                            <div className="section__shipping--address__content">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input1"
                                                                            >
                                                                                First Name
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.fname ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="First name"
                                                                                    type="text"
                                                                                    name='fname'
                                                                                    value={formValues.fname}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.fname && <span className="error">{errors.fname}</span>} */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input2"
                                                                            >
                                                                                Last Name
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.lname ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Last name"
                                                                                    type="text"
                                                                                    name='lname'
                                                                                    value={formValues.lname}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.lname && <span className="error">{errors.lname}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-0">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input3"
                                                                            >
                                                                                Mobile Number
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.mobile ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Mobile Number"
                                                                                    type="text"
                                                                                    name='mobile'
                                                                                    maxlength = "10"
                                                                                    value={formValues.mobile}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.mobile && <span className="error">{errors.mobile}</span>} */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-0">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input3"
                                                                            >
                                                                                Address Title
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.add_title ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Address Title"
                                                                                    type="text"
                                                                                    name='add_title'
                                                                                    value={formValues.add_title}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.add_title && <span className="error">{errors.add_title}</span>} */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mt-4">
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
                                                                            <div className={`${errors.address ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Address1"
                                                                                    type="text"
                                                                                    name='address'
                                                                                    value={formValues.address}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.address && <span className="error">{errors.address}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mt-3">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input5"
                                                                            >
                                                                                City
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.city ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="City"
                                                                                    type="text"
                                                                                    name='city'
                                                                                    value={formValues.city}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.city && <span className="error">{errors.city}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mt-3">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0  "
                                                                                htmlFor="input5"
                                                                            >
                                                                                State
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.state ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="State"
                                                                                    type="text"
                                                                                    name='state'
                                                                                    value={formValues.state}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.state && <span className="error">{errors.state}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mt-3">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="country"
                                                                            >
                                                                                Country/region
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.country ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Country"
                                                                                    type="text"
                                                                                    name='country'
                                                                                    value={formValues.country}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.country && <span className="error">{errors.country}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mt-3">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-0"
                                                                                htmlFor="input6"
                                                                            >
                                                                                Pin Code
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className={`${errors.pincode ? 'error' : ''}`}>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Pin code"
                                                                                    type="text"
                                                                                    name='pincode'
                                                                                    maxlength = "6"
                                                                                    value={formValues.pincode}
                                                                                    onChange={handleChangeForm}
                                                                                />
                                                                            </div>
                                                                            {/* {errors.pincode && <span className="error">{errors.pincode}</span>} */}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="checkout__content--step__footer d-flex align-items-center mt-3">
                                                            <button
                                                                className="continue__shipping--btn primary__btn border-radius-5"
                                                            >
                                                                Continue To Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                                :
                                                null
                                        }
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
                                                        login_cart?.map((e, index) => {
                                                            return (
                                                                <tr className="cart__table--body__items" key={index}>
                                                                    <td className="cart__table--body__list">
                                                                        <div className="product__image two  d-flex align-items-center">
                                                                            <div className="product__thumbnail border-radius-5">
                                                                                <a className="display-block">
                                                                                    <img
                                                                                        className="display-block border-radius-5"
                                                                                        // src={e?.product?.images[0].image}
                                                                                        src='https://avatars.mds.yandex.net/i?id=1b4bc532efe7ab812edc8fbb4f3290913c22ff63-9149598-images-thumbs&n=13'
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
                                                                                        {e?.product?.part_name}
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
                                                                <h4>₹{countTotal(login_cart)}/-</h4>
                                                            }
                                                        </td>
                                                    </tr>
                                                    {
                                                        isOpenDiscount &&
                                                        <tr className="checkout__total--items">
                                                            <td className="checkout__total--title text-left">
                                                                Discount ( {add_ship?.coupon} Appied )
                                                            </td>
                                                            <td className="checkout__total--calculated__text text-right">
                                                                {(countTotal(login_cart)) * (coupon_code?.coupon_discount / 100) ? ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : 0}/-
                                                            </td>
                                                        </tr>
                                                    }
                                                    <tr className="checkout__total--items">
                                                        <td className="checkout__total--title text-left">
                                                            Shipping
                                                        </td>
                                                        <td className="checkout__total--calculated__text text-right">
                                                            Free
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot className="checkout__total--footer">
                                                    <tr className="checkout__total--footer__items">
                                                        <td className="checkout__total--footer__title checkout__total--footer__list text-left">
                                                            Total
                                                        </td>
                                                        <td className="checkout__total--footer__amount checkout__total--footer__list text-right">
                                                            ₹{countTotal(login_cart) - ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)) ? countTotal(login_cart) - ((countTotal(login_cart)) * (coupon_code?.coupon_discount / 100)).toFixed(2) : countTotal(login_cart)}/-
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
                    :
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
                }

                <ShippingAddress />
            </main>
        </>
    )
}

export default Checkout