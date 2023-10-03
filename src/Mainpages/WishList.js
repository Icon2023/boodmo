import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductWishlist } from '../store/reducers/ProductSlice';

const WishList = () => {
    const dispatch = useDispatch();
    const { add_wish } = useSelector((state) => ({ ...state.products }));

    console.log(add_wish);

    const removeElement = (id) => {
        dispatch(removeProductWishlist(id))
    };
    return (
        <>
            <main className="main__content_wrapper">
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
                        <div className="cart__section--inner">
                            <form action="#">
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
                                                <th className="cart__table--header__list text-right">
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
                                                                        onClick={() => removeElement(e?.proId)}
                                                                    >
                                                                        <AiOutlineClose />
                                                                    </button>
                                                                    <div className="cart__thumbnail">
                                                                        <a href={`/productsdetail/${e?.proId}`}>
                                                                            <img
                                                                                className="border-radius-5"
                                                                                src={e?.image}
                                                                                alt="cart-product"
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                    <div className="cart__content">
                                                                        <h3 className="cart__content--title h4">
                                                                            <a href={`/productsdetail/${e?.proId}`}>
                                                                                {e?.name}
                                                                            </a>
                                                                        </h3>
                                                                        <span className="cart__content--variant">
                                                                            COLOR: Blue
                                                                        </span>
                                                                        <span className="cart__content--variant">
                                                                            WEIGHT: 2 Kg
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="cart__table--body__list">
                                                                <span className="cart__price">${e?.price}/-</span>
                                                            </td>
                                                            <td className="cart__table--body__list text-center">
                                                                <span className="in__stock text__secondary">
                                                                    {
                                                                        e?.stock === 0 ? " in stock" : "Out Of Stock"
                                                                    }

                                                                </span>
                                                            </td>
                                                            <td className="cart__table--body__list text-right">
                                                                <a
                                                                    className="wishlist__cart--btn primary__btn"
                                                                    href={`/productsdetail/${e?.proId}`}
                                                                >
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
                            </form>
                        </div>
                    </div>
                </section>

                {/* Start shipping section */}
                <section className="shipping__section">
                    <div className="container">
                        <div className="shipping__inner style2 d-flex">
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping1.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Free Shipping</h2>
                                    <p className="shipping__content--desc">Free shipping over $100</p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping2.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Support 24/7</h2>
                                    <p className="shipping__content--desc">Contact us 24 hours a day</p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping3.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">100% Money Back</h2>
                                    <p className="shipping__content--desc">
                                        You have 30 days to Return
                                    </p>
                                </div>
                            </div>
                            <div className="shipping__items style2 d-flex align-items-center">
                                <div className="shipping__icon">
                                    <img src="assets/img/other/shipping4.webp" alt="icon-img" />
                                </div>
                                <div className="shipping__content">
                                    <h2 className="shipping__content--title h3">Payment Secure</h2>
                                    <p className="shipping__content--desc">We ensure secure payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

        </>
    )
}

export default WishList