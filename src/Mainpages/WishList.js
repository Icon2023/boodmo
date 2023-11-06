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
                <section className="cart__section section--padding">
                    <div className="container">
                        {
                            add_wish?.length >= 1
                                ?
                                <>
                                    <div className="cart__section--inner">
                                        <h2 className="cart__title mb-30">Wishlist</h2>
                                        <div className="cart__table">
                                            <table className="cart__table--inner">
                                                <thead className="cart__table--header">
                                                    <tr className="cart__table--header__items">
                                                        <th className="cart__table--header__list">Product</th>
                                                        <th className="cart__table--header__list">Price</th>
                                                        <th className="cart__table--header__list text-center">
                                                            STOCK STATUS
                                                        </th>
                                                        <th className="cart__table--header__list text-center">
                                                            VIEW PRODUCT
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="cart__table--body">
                                                    {
                                                        add_wish.map((e, index) => {
                                                            return (
                                                                <tr className="cart__table--body__items" key={index}>
                                                                    <td className="cart__table--body__list">
                                                                        <div className="cart__product d-flex align-items-center">
                                                                            <button
                                                                                className="cart__remove--btn"
                                                                                aria-label="search button"
                                                                                type="button"
                                                                                onClick={() => removeElement(e?.product_id)}
                                                                            >
                                                                                <AiOutlineClose />
                                                                            </button>
                                                                            <div className="cart__thumbnail">
                                                                                {/* <a href={`/productsdetail/${e?.product_id}`}> */}
                                                                                <img
                                                                                    className="border-radius-5"
                                                                                    src={e?.product?.images[0]?.image}
                                                                                    alt="cart-product"
                                                                                />
                                                                                {/* </a> */}
                                                                            </div>
                                                                            <div className="cart__content">
                                                                                <h3 className="cart__content--title h4">
                                                                                    <a href={`/productsdetail/${e?.product_id}`}>
                                                                                        {e?.product?.name}
                                                                                    </a>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="cart__table--body__list">
                                                                        <span className="cart__price">{e?.product?.selling_price}/-</span>
                                                                    </td>
                                                                    <td className="cart__table--body__list text-center">
                                                                        <span className="in__stock text__secondary">
                                                                            {
                                                                                e?.product?.out_of_stock === 0 ? " in stock" : "Out Of Stock"
                                                                            }

                                                                        </span>
                                                                    </td>
                                                                    <td className="cart__table--body__list text-center">
                                                                        <a
                                                                            className="wishlist__cart--btn primary__btn"
                                                                            href={`/productsdetail/${e?.product_id}`}>
                                                                            View Details
                                                                        </a>
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
                                    <img style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} src="https://autoglos.com/public/frontend/images/empty-cart.png" alt="" />

                                </>
                        }

                    </div>
                </section>

                {/* Start shipping section */}
                <ShippingAddress />

            </main>

        </>
    )
}

export default WishList