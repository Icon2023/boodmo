import React, { useEffect, useRef, useState } from "react";
import ShippingAddress from "../Subpages/ShippingAddress";
import { AddOrderList } from "../Services/apiServices";
import { dateFormate } from "../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrderDetails } from "../store/reducers/ProductSlice";
import Breadcrumb from "../Utils/breadcrumb";
import { IoSaveOutline } from "react-icons/io5";
import Invoice from "../Utils/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MdOutlineFileDownload } from "react-icons/md";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { order_list } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        AddOrderList().then((res) => {
            if (res.success) {
                dispatch(addOrderDetails(res?.data))
                console.log(res?.data);
            } else {
                console.log(res?.message);
            }
        })
    }, [])



    return (
        <div className="margin_top_all">
            <Breadcrumb
                subTitle2="My Orders"
                icon2={
                    <IoSaveOutline
                        color="#363062"
                        style={{
                            fontSize: "22px",
                            marginRight: "4px",
                            boxSizing: "border-box",
                        }}
                    />
                }
            />

            {/*  <!-- my account section start --> */}
            <section className="my__account--section section--padding">
                <div className="container">
                    <div className="my__account--section__inner border-radius-10 d-flex">
                        <div className="account__wrapper">
                            <div className="account__content">
                                <h2 className="account__content--title h3 mb-20">Orders History</h2>
                                <div className="account__table--area">
                                    {
                                        order_list.length > 0 ?
                                            <>
                                                <table className="account__table">
                                                    <thead className="account__table--header">
                                                        <tr className="account__table--header__child">
                                                            <th className="account__table--header__child--items">
                                                                Order ID
                                                            </th>
                                                            <th className="account__table--header__child--items">Date</th>
                                                            <th className="account__table--header__child--items">
                                                                Order Status
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Payment Status
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Total Amount
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                &nbsp;&nbsp; Invoice
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="account__table--body mobile__none" >
                                                        {
                                                            order_list?.map((e, index) => {
                                                                return (
                                                                    <tr className="account__table--body__child" key={index}>
                                                                        <td className="account__table--body__child--items">{e?.id}</td>
                                                                        <td className="account__table--body__child--items">
                                                                            {dateFormate(e?.created_at)}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            {(e?.order_status).toUpperCase()}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">{(e?.payment_status).toUpperCase()}</td>
                                                                        <td className="account__table--body__child--items">
                                                                            ₹{(e?.coupon_value && e?.coupon_code ? parseInt(e?.total_amount) - parseInt(e?.coupon_value) : parseInt(e?.total_amount)).toLocaleString("en-IN")}/-
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <PDFDownloadLink document={<Invoice order={e} />} fileName={`Order_${e.id}.pdf`}>
                                                                                {({ blob, url, loading, error }) =>
                                                                                    loading ? 'Loading document...' :
                                                                                        <>
                                                                                            <button class="Btn_down">
                                                                                                <svg
                                                                                                    class="svgIcon_down"
                                                                                                    viewBox="0 0 384 512"
                                                                                                    height="1em"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                                                                                                </svg>
                                                                                                <span class="icon2_down"></span>
                                                                                                <span class="tooltip_down">Download</span>
                                                                                            </button>
                                                                                        </>
                                                                                }
                                                                            </PDFDownloadLink>
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
                                                                            <span>{e?.id}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Date</strong>
                                                                            <span>{dateFormate(e?.created_at)}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Order Status</strong>
                                                                            <span> {(e?.order_status).toUpperCase()}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Payment Status</strong>
                                                                            <span>{(e?.payment_status).toUpperCase()}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Total</strong>
                                                                            <span>
                                                                                ₹{(e?.coupon_value && e?.coupon_code ? parseInt(e?.total_amount) - parseInt(e?.coupon_value) : parseInt(e?.total_amount)).toLocaleString("en-IN")}/-
                                                                            </span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Invoice</strong>
                                                                            <button class="Btn_down">
                                                                                <MdOutlineFileDownload color="rgb(214, 178, 255)" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                            :
                                            <>
                                                <p>No Order Found</p>
                                            </>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <ShippingAddress />
        </div >
    );
};

export default MyOrders;
