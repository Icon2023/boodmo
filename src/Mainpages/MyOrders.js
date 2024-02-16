import React, { useEffect } from "react";
import ShippingAddress from "../Subpages/ShippingAddress";
import { AddOrderList } from "../Services/apiServices";
import { dateFormate } from "../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrderDetails } from "../store/reducers/ProductSlice";
import Breadcrumb from "../Utils/breadcrumb";
import { IoSaveOutline } from "react-icons/io5";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { order_list } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        AddOrderList().then((res) => {
            if (res.success) {
                dispatch(addOrderDetails(res?.data))
            }else {
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
                                        order_list.lenght > 0 ?
                                            <>
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
            </section>

            <ShippingAddress />
        </div>
    );
};

export default MyOrders;
