import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeAllItemWishlist, removeProductWishlist } from '../store/reducers/ProductSlice';
import ShippingAddress from '../Subpages/ShippingAddress';
import { WishListLogin, WishListLoginDelete } from '../Services/apiServices';
import LayoutTransition from '../Utils/Layout';
import Breadcrumb from '../Utils/breadcrumb';
import { FaListCheck } from "react-icons/fa6";

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
        window.scrollTo(0, 0);
    }, [])

    const removeElement = (id) => {
        dispatch(removeProductWishlist(id))
        WishListLoginDelete({ product_id: id }).then((res) => {
            console.log(res);
        })

    };
    return (
        <>
        <LayoutTransition>
            <main className="margin_top_all">
                <Breadcrumb
          subTitle2="Product Category"
          icon2={
            <FaListCheck
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
                                                            // src={e?.product?.image}
                                                            src='https://avatars.mds.yandex.net/i?id=1b4bc532efe7ab812edc8fbb4f3290913c22ff63-9149598-images-thumbs&n=13'
                                                            style={{ width: "100px", height: "auto" }}
                                                            alt="cart-product"
                                                        />
                                                        <aside>
                                                            <h3 className="">
                                                                <a
                                                                    href={`/productsdetail/${e?.product?.pn}`}
                                                                >
                                                                    {e?.product?.part_name}
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
                                                        <p className="">{e?.product?.price}/-</p>
                                                    </td>
                                                    <td>
                                                        <div className="quantity__box justify-content-center">
                                                            <span className="in__stock text__secondary">
                                                                {/* {e?.product?.out_of_stock === 0
                                                                    ? " In stock"
                                                                    : "Out Of Stock"} */}
                                                                    In stock
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <a
                                                            className="wishlist__cart--btn primary__btn "
                                                            href={`/productsdetail/${e?.product?.pn}`}
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
            </LayoutTransition>

        </>
    )
}

export default WishList