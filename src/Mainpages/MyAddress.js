import React, { useEffect, useState } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress'
import { AddAddressUser, DeleteAddress, GetAddressUser } from '../Services/apiServices'
import { useDispatch, useSelector } from 'react-redux';
import { add_ship_details, removeAddress } from '../store/reducers/ProductSlice';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import Breadcrumb from '../Utils/breadcrumb';
import { FaAddressBook } from "react-icons/fa";
import { IoCloseSharp } from 'react-icons/io5';
import { Box, Modal } from '@mui/material';

const MyAddress = () => {
    const dispatch = useDispatch();
    const { add_ship } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSaveId, setOpenSaveId] = useState('');

    const [formValues, setFormValues] = useState({
        fname: '',
        lname: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        add_title: '',
    });
    const [errors, setErrors] = useState('');


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

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.fname) {
            newErrors.fname = 'Name is required';
        }

        if (!formValues.lname) {
            newErrors.lname = 'Lastname is required';
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
            let data = {
                first_name: formValues.fname,
                last_name: formValues.lname,
                mobile: formValues.mobile,
                address: formValues.address,
                pincode: formValues.pincode,
                state: formValues.state,
                city: formValues.city,
                address_title: formValues.add_title,
                country: formValues.country
            }
            AddAddressUser(data).then((res) => {
                GetAddress();
                setIsOpen(false)
            })
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
        } else {
            console.log("hello");
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors("")
    };

    const handleOpenNewAddress = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
    }

    const handleAddressRemove = () => {
        dispatch(removeAddress(openSaveId))
        DeleteAddress(openSaveId).then((res) => {
            console.log(res);
        })
        setOpenDelete(false);
    }


    const handleOpenDelete = (id) => {
        setOpenDelete(true);
        setOpenSaveId(id);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    return (
        <div className='margin_top_all'>
            <Breadcrumb
                subTitle2="My Address"
                icon2={
                    <FaAddressBook
                        color="#363062"
                        style={{
                            fontSize: "22px",
                            marginRight: "4px",
                            boxSizing: "border-box",
                            cursor: "pointer"
                        }}
                    />
                }
            />

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
                                                        <AiOutlineClose style={{ cursor: "pointer" }} onClick={() => handleOpenDelete(e?.id)} />
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
                                            <form onSubmit={handleSubmit}>
                                                <div className="checkout__content--step section__shipping--address">
                                                    <div className="section__header mb-25">
                                                    </div>
                                                    <div className="section__shipping--address__content">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 mb-0">
                                                                <div className={`checkout__input--list`}>
                                                                    <label
                                                                        className="checkout__input--label mb-0  "
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
                                                                            name="fname"
                                                                            value={formValues.fname}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.fname && <span className="error">{errors.fname}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 mb-0">
                                                                <div className={`checkout__input--list`}>
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
                                                                            name="lname"
                                                                            value={formValues.lname}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.lname && <span className="error">{errors.lname}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 mt-3">
                                                                <div className={`checkout__input--list`}>
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
                                                                            name="mobile"
                                                                            value={formValues.mobile}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.mobile && <span className="error">{errors.mobile}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 mt-3">
                                                                <div className={`checkout__input--list`}>
                                                                    <label
                                                                        className="checkout__input--label mb-0"
                                                                        htmlFor="input3"
                                                                    >
                                                                        LandMark
                                                                        <span className="checkout__input--label__star">
                                                                            *
                                                                        </span>
                                                                    </label>
                                                                    <div className={`${errors.add_title ? 'error' : ''}`}>
                                                                        <input
                                                                            className="checkout__input--field border-radius-5"
                                                                            placeholder="Land Mark"
                                                                            type="text"
                                                                            name="add_title"
                                                                            value={formValues.add_title}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.add_title && <span className="error">{errors.add_title}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mt-3">
                                                                <div className={`checkout__input--list `}>
                                                                    <label
                                                                        className="checkout__input--label mb-0"
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
                                                                            placeholder="Address"
                                                                            type="text"
                                                                            name='address'
                                                                            value={formValues.address}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.address && <span className="error">{errors.address}</span>} */}
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 mt-3">
                                                                <div className={`checkout__input--list `}>
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
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.city && <span className="error">{errors.city}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mt-3">
                                                                <div className={`checkout__input--list`}>
                                                                    <label
                                                                        className="checkout__input--label mb-0"
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
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.state && <span className="error">{errors.state}</span>} */}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mt-3">
                                                                <div className={`checkout__input--list `}>
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
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    {/* {errors.country && <span className="error">{errors.country}</span>} */}

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mt-3">
                                                                <div className={`checkout__input--list `}>
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
                                                                            type="number"
                                                                            name='pincode'
                                                                            value={formValues.pincode}
                                                                            onChange={handleChange}

                                                                        />
                                                                    </div>
                                                                    {/* {errors.pincode && <span className="error">{errors.pincode}</span>} */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="checkout__content--step__footer d-flex align-items-center mt-4">
                                                    <button
                                                        className="continue__shipping--btn primary__btn border-radius-5"
                                                    >
                                                        Continue To Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        maxWidth: 380,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <h2 className="my-5 text-center">Are you sure Delete?</h2>
                        {/* <p>This is a simple modal example.</p> */}
                        <IoCloseSharp
                            style={{
                                position: "absolute",
                                right: "-6%",
                                top: "-30%",
                                transform: "translate(-50%, -50%)",
                                cursor: "pointer",
                                fontSize: "18px",
                            }}
                            onClick={handleCloseDelete}
                        />
                        <button className="primary__btn w-100" onClick={handleAddressRemove}>
                            Yes
                        </button>
                    </div>
                </Box>
            </Modal>
            <ShippingAddress />

        </div>
    )
}

export default MyAddress