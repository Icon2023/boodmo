import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeAllItemWishlist, removeProductWishlist } from '../store/reducers/ProductSlice';
import ShippingAddress from '../Subpages/ShippingAddress';
import { WishListLogin, WishListLoginDelete } from '../Services/apiServices';

const WishList = () => {
    const dispatch = useDispatch();
    const { add_wish } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        WishListLogin().then((res) => {
            if (res.success) {
                dispatch(removeAllItemWishlist())
                dispatch(addToWishlist(res?.data))
            }
        })
    }, [])

    const removeElement = (id) => {
        dispatch(removeProductWishlist(id))
        WishListLoginDelete({ product_id: id }).then((res) => {
            console.log(res);
        })

    };
    return (
        <>
            <main className="margin_top_all">
                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title mb-20">Wishlist</h1>
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb__content--menu__items">
                                            <span>Wishlist</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* cart section start */}
                <section className="container">
                    <div className="table-responsive">
                        {add_wish?.length >= 1 ? (
                            <>
                                {/* <h2 className="cart__title mb-30 ">Wishlist</h2> */}
                                <table className="table table-bordered table-hover mt-5">
                                    <thead className="table-dark">
                                        <tr className="text-center">
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th>STOCK STATUS</th>
                                            <th>VIEW PRODUCT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {add_wish?.map((e, index) => {
                                            return (
                                                <tr key={index} className="align-middle">
                                                    <td
                                                        className="d-md-flex align-align-items-lg-start"
                                                        style={{ minWidth: "300px", gap: "16px" }}
                                                    >
                                                        <button
                                                            className="cart__remove--btn"
                                                            aria-label="search button"
                                                            type="button"
                                                            onClick={() => removeElement(e?.product_id)}
                                                        >
                                                            <AiOutlineClose />
                                                        </button>
                                                        <img
                                                            className="border-radius-5"
                                                            src={e?.product?.images[0]?.image}
                                                            style={{ width: "100px", height: "auto" }}
                                                            alt="cart-product"
                                                        />
                                                        <aside>
                                                            <h3 className="">
                                                                <a
                                                                    href={`/productsdetail/${e?.product?.part_no}`}
                                                                >
                                                                    {e?.product?.name}
                                                                </a>
                                                            </h3>
                                                            <p>{e?.desc}</p>
                                                        </aside>
                                                    </td>
                                                    <td
                                                        style={{
                                                            minWidth: "103px",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <p className="">{e?.product?.selling_price}/-</p>
                                                    </td>
                                                    <td>
                                                        <div className="quantity__box justify-content-center">
                                                            <span className="in__stock text__secondary">
                                                                {e?.product?.out_of_stock === 0
                                                                    ? " In stock"
                                                                    : "Out Of Stock"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <a
                                                            className="wishlist__cart--btn primary__btn "
                                                            href={`/productsdetail/${e?.product?.part_no}`}
                                                        >
                                                            View Details
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <span className="cart__checkout">
                                    {/* <button className="checkout_btn" onClick={handleCheckout}>
                    CheckOut
                  </button> */}
                                </span>
                            </>
                        ) : (
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
                        )}
                    </div>
                </section>

                {/* Start shipping section */}
                <ShippingAddress />

            </main>

        </>
    )
}

export default WishList