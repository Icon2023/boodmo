import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress'
import { AddAddressUser, DeleteAddress, GetAddressUser } from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { add_ship_details, removeAddress } from '../store/reducers/ProductSlice';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

const MyAddress = () => {
    const dispatch = useDispatch();
    const { add_ship } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsOpen] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [add_title, setAdd_title] = useState('');

    useEffect(() => {
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
            address_title: add_title,
            country: country
        }
        AddAddressUser(data).then((res) => {
            GetAddress();
            setIsOpen(false)
            setFname('')
            setLname('')
            setMobile('')
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setPincode('')
            setAdd_title('')
        })
    }

    const handleOpenNewAddress = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
    }

    const handleAddressRemove = (id) => {
        dispatch(removeAddress(id))
        DeleteAddress(id).then((res) => {
            console.log(res);
        })
    }

    return (
        <div className='margin_top_all'>
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
                                        <span>My Address</span>
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
                    <div className="my__account--section__inner border-radius-10 d-flex">
                        <div className="account__wrapper">
                            <h2 className="section__header--title h3">My Shipping Details</h2>
                            <div className='Add_ship'>
                                <h3 onClick={handleOpenNewAddress}><AiOutlinePlus style={{ fontSize: "24px" }} /> Add New Address</h3>
                            </div>
                            <div className='d-flex' style={{ gap: "20px", flexWrap: "wrap" }}>
                                {
                                    add_ship &&
                                    add_ship?.map((e, index) => {
                                        return (
                                            <>
                                                <div className='ship_multiple_box mt-3' key={index}>
                                                    <div className='d-flex justify-content-between'>
                                                        <h3>Name:{e?.first_name}</h3>
                                                        <AiOutlineClose style={{ cursor: "pointer" }} onClick={() => handleAddressRemove(e?.id)} />
                                                    </div>
                                                    <p>Address
                                                        : {e?.address}  - {e?.mobile}</p>
                                                    <p>{e?.city},{e?.state},{e?.country}</p>
                                                </div>
                                            </>
                                        )
                                    })

                                }
                            </div>
                            {
                                isOpen ?
                                    <div className='row'>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="main checkout__mian">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="checkout__content--step section__shipping--address">
                                                        <div className="section__header mb-25">
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
                                                                        <input
                                                                            className="checkout__input--field border-radius-5"
                                                                            placeholder="State"
                                                                            type="text"
                                                                            value={country}
                                                                            onChange={(e) => setCountry(e.target.value)}
                                                                        />
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
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </section>

            <ShippingAddress />

        </div>
    )
}

export default MyAddress