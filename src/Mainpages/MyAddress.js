import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress'
import { GetAddressUser, UpdateAddressUser } from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { add_ship_details } from '../store/reducers/ProductSlice';

const MyAddress = () => {
    const dispatch = useDispatch();
    const { add_ship } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsOpen] = useState(false);
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
        GetAddressUser().then((res) => {
            if (res?.success) {
                dispatch(add_ship_details(res?.data))
            } else {
                console.log("hello");
            }
        })
        // if (add_ship) {
        //     setFname(add_ship[0]?.first_name);
        //     setLname(add_ship[0]?.last_name)
        //     setAddress(add_ship[0]?.address)
        //     setCity(add_ship[0]?.city)
        //     setPincode(add_ship[0]?.pincode)
        //     setMobile(add_ship[0]?.mobile)
        //     setState(add_ship[0]?.state)
        //     setAdd_title(add_ship[0]?.address_title)
        // }
    }, [])



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
            dispatch(add_ship_details(res?.data))
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
                            <h2 className="section__header--title h3">Shipping Details</h2>
                            {/* {
                                add_ship?.map((e, index) => {
                                    return (
                                        <div className='ship_multiple_box'>
                                            <h3>{e?.first_name}</h3>
                                        </div>
                                    )
                                })
                            } */}
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