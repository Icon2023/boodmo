import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress'
import { AddOrderList, GetAddressUser, UpdateAddressUser } from '../Services/apiServices'
import { dateFormate } from '../Utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderDetails } from '../store/reducers/ProductSlice';

const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    const dispatch = useDispatch();
    const { order_list } = useSelector((state) => ({ ...state.products }));
    const [ship_address, setShip_address] = useState('');
    const [gridOpen, setGridOpen] = useState(true);
    const [trifOpen, setTrifOpen] = useState(true);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [add_title, setAdd_title] = useState('');

    useEffect(() => {
        AddOrderList().then((res) => {
            dispatch(addOrderDetails(res?.data))
        })
    }, [])

    useEffect(() => {
        GetAddressUser().then((res) => {
            console.log(res?.data);
            setShip_address(res?.data)
        })
        if (user) {
            setFname(ship_address?.name);
            setAddress(ship_address?.address)
            setCity(ship_address?.city)
            setPincode(ship_address?.pincode)
            setMobile(ship_address?.mobile)
            setState(ship_address?.state)
            setAdd_title(ship_address?.address_title)
        }
    }, [gridOpen])

    const handleLogout = () => {
        localStorage.removeItem('USER')
        window.location.reload();
    }

    const handleGridClick = () => {
        gridOpen ? setTrifOpen(false) : setGridOpen(true)
    }

    const handleTfiClick = () => {
        gridOpen ? setGridOpen(false) : setTrifOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            first_name: fname,
            last_name: lname,
            mobile: mobile,
            address: address,
            pincode: pincode,
            state: state,
            city: city,
            country: city,
            address_title: add_title
        }
        UpdateAddressUser(data).then((res) => {
            console.log(res);
        })
        window.location.reload();
    }

    return (
        <>
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
                                        <span>My Account</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  <!-- my account section start --> */}
            <section className="my__account--section section--padding">
                <div className="container">
                    <p className="account__welcome--text">
                        Hello, {user?.data?.name} welcome to your dashboard!
                    </p>
                    <div className="my__account--section__inner border-radius-10 d-flex">
                        <div className="account__left--sidebar">
                            <h2 className="account__content--title mb-20">My Profile</h2>
                            <ul className="account__menu">
                                <li className={`account__menu--list ${gridOpen === true ? "active" : ""}`}>
                                    <a onClick={handleGridClick}>Dashboard</a>
                                </li>
                                <li className={`account__menu--list ${gridOpen === true ? "" : "active"}`}>
                                    <a onClick={handleTfiClick}>Addresses</a>
                                </li>
                                <li className="account__menu--list">
                                    <a href="/wishlist">Wishlist</a>
                                </li>
                                <li className="account__menu--list">
                                    <a onClick={handleLogout}>Log Out</a>
                                </li>
                            </ul>
                        </div>
                        <div className="account__wrapper">
                            {
                                gridOpen ?
                                    <>
                                        <div className="account__content">
                                            <h2 className="account__content--title h3 mb-20">Orders History</h2>
                                            <div className="account__table--area">
                                                <table className="account__table">
                                                    <thead className="account__table--header">
                                                        <tr className="account__table--header__child">
                                                            <th className="account__table--header__child--items">
                                                                Order
                                                            </th>
                                                            <th className="account__table--header__child--items">Date</th>
                                                            <th className="account__table--header__child--items">
                                                                Order Status
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Payment Status
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Total
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="account__table--body mobile__none">
                                                        {
                                                            order_list?.map((e, index) => {
                                                                return (
                                                                    <tr className="account__table--body__child" key={index}>
                                                                        <td className="account__table--body__child--items">{e?.order_detail[0]?.order_id}</td>
                                                                        <td className="account__table--body__child--items">
                                                                            {dateFormate(e?.created_at)}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            {e?.order_status}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">{e?.payment_status}</td>
                                                                        <td className="account__table--body__child--items">
                                                                            ₹{e?.total_amount}/-
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    <tbody className="account__table--body mobile__block">
                                                        {
                                                            order_list?.map((e, index) => {
                                                                return (
                                                                    <tr className="account__table--body__child" key={index}>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Order</strong>
                                                                            <span>{e?.order_detail[0]?.order_id}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Date</strong>
                                                                            <span>{dateFormate(e?.created_at)}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Payment Status</strong>
                                                                            <span>Paid</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Order Status</strong>
                                                                            <span>Placed</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Total</strong>
                                                                            <span>₹{e?.total_amount}</span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='row'>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="main checkout__mian">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="checkout__content--step section__shipping--address">
                                                            <div className="section__header mb-25">
                                                                <h2 className="section__header--title h3">Billing Details</h2>
                                                            </div>
                                                            <div className="section__shipping--address__content">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
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
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
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
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
                                                                                htmlFor="input3"
                                                                            >
                                                                                Mobile Number
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="checkout__input--field border-radius-5"
                                                                                placeholder="Mobile Number"
                                                                                type="text"
                                                                                value={mobile}
                                                                                onChange={(e) => setMobile(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
                                                                                htmlFor="input3"
                                                                            >
                                                                                Address Title
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="checkout__input--field border-radius-5"
                                                                                placeholder="Address Title (optional)"
                                                                                type="text"
                                                                                value={add_title}
                                                                                onChange={(e) => setAdd_title(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
                                                                                htmlFor="input4"
                                                                            >
                                                                                Address
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="checkout__input--field border-radius-5"
                                                                                placeholder="Address1"
                                                                                type="text"
                                                                                value={address}
                                                                                onChange={(e) => setAddress(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                  
                                                                    <div className="col-lg-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
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
                                                                    <div className="col-lg-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
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
                                                                    <div className="col-lg-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
                                                                                htmlFor="country"
                                                                            >
                                                                                Country/region
                                                                                <span className="checkout__input--label__star">
                                                                                    *
                                                                                </span>
                                                                            </label>
                                                                            <div className="checkout__input--select select">
                                                                                <select
                                                                                    className="checkout__input--select__field border-radius-5"
                                                                                    id="country"
                                                                                >
                                                                                    <option value={1}>India</option>
                                                                                    <option value={2}>United States</option>
                                                                                    <option value={3}>Netherlands</option>
                                                                                    <option value={4}>Afghanistan</option>
                                                                                    <option value={5}>Islands</option>
                                                                                    <option value={6}>Albania</option>
                                                                                    <option value={7}>Antigua Barbuda</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mb-10">
                                                                        <div className="checkout__input--list">
                                                                            <label
                                                                                className="checkout__input--label mb-3"
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
                                                                                type="text"
                                                                                value={pincode}
                                                                                onChange={(e) => setPincode(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="checkout__checkbox">
                                                                <input
                                                                    className="checkout__checkbox--input"
                                                                    id="checkbox2"
                                                                    type="checkbox"
                                                                />
                                                                <span className="checkout__checkbox--checkmark" />
                                                                <label
                                                                    className="checkout__checkbox--label"
                                                                    htmlFor="checkbox2"
                                                                >
                                                                    Save this information for next time
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="checkout__content--step__footer d-flex align-items-center">
                                                            <button
                                                                className="continue__shipping--btn primary__btn border-radius-5"
                                                            >
                                                                Continue To Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </section>
            
            <ShippingAddress />

        </>
    )
}

export default MyAccount