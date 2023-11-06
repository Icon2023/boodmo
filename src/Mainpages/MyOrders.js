import React, { useEffect } from 'react'
import ShippingAddress from '../Subpages/ShippingAddress'
import { AddOrderList } from '../Services/apiServices'
import { dateFormate } from '../Utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderDetails } from '../store/reducers/ProductSlice';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { order_list } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        AddOrderList().then((res) => {
            if (res.success) {
                dispatch(addOrderDetails(res?.data))
            }
        })
    }, [])

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
                                        <span>My Orders</span>
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
                        </div>
                    </div>
                </div>
            </section>

            <ShippingAddress />

        </div>
    )
}

export default MyOrders