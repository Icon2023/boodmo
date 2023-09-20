import React from 'react'

const WishList = () => {
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
                                            <a href="index.html">Home</a>
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
                                                    ADD TO CART
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="cart__table--body">
                                            <tr className="cart__table--body__items">
                                                <td className="cart__table--body__list">
                                                    <div className="cart__product d-flex align-items-center">
                                                        <button
                                                            className="cart__remove--btn"
                                                            aria-label="search button"
                                                            type="button"
                                                        >
                                                            <svg
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="16px"
                                                                height="16px"
                                                            >
                                                                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                                            </svg>
                                                        </button>
                                                        <div className="cart__thumbnail">
                                                            <a href="product-details.html">
                                                                <img
                                                                    className="border-radius-5"
                                                                    src="assets/img/product/small-product/product9.webp"
                                                                    alt="cart-product"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="cart__content">
                                                            <h3 className="cart__content--title h4">
                                                                <a href="product-details.html">
                                                                    Fluids &amp; Chemicals
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
                                                    <span className="cart__price">£65.00</span>
                                                </td>
                                                <td className="cart__table--body__list text-center">
                                                    <span className="in__stock text__secondary">in stock</span>
                                                </td>
                                                <td className="cart__table--body__list text-right">
                                                    <a
                                                        className="wishlist__cart--btn primary__btn"
                                                        href="cart.html"
                                                    >
                                                        Add To Cart
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="cart__table--body__items">
                                                <td className="cart__table--body__list">
                                                    <div className="cart__product d-flex align-items-center">
                                                        <button
                                                            className="cart__remove--btn"
                                                            aria-label="search button"
                                                            type="button"
                                                        >
                                                            <svg
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="16px"
                                                                height="16px"
                                                            >
                                                                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                                            </svg>
                                                        </button>
                                                        <div className="cart__thumbnail">
                                                            <a href="product-details.html">
                                                                <img
                                                                    className="border-radius-5"
                                                                    src="assets/img/product/small-product/product8.webp"
                                                                    alt="cart-product"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="cart__content">
                                                            <h3 className="cart__content--title h4">
                                                                <a href="product-details.html">Cargo Accessories</a>
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
                                                    <span className="cart__price">£65.00</span>
                                                </td>
                                                <td className="cart__table--body__list text-center">
                                                    <span className="in__stock text__secondary">in stock</span>
                                                </td>
                                                <td className="cart__table--body__list text-right">
                                                    <a
                                                        className="wishlist__cart--btn primary__btn"
                                                        href="cart.html"
                                                    >
                                                        Add To Cart
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="cart__table--body__items">
                                                <td className="cart__table--body__list">
                                                    <div className="cart__product d-flex align-items-center">
                                                        <button
                                                            className="cart__remove--btn"
                                                            aria-label="search button"
                                                            type="button"
                                                        >
                                                            <svg
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="16px"
                                                                height="16px"
                                                            >
                                                                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                                            </svg>
                                                        </button>
                                                        <div className="cart__thumbnail">
                                                            <a href="product-details.html">
                                                                <img
                                                                    className="border-radius-5"
                                                                    src="assets/img/product/small-product/product7.webp"
                                                                    alt="cart-product"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="cart__content">
                                                            <h3 className="cart__content--title h4">
                                                                <a href="product-details.html">
                                                                    Engine &amp; Drivetrain
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
                                                    <span className="cart__price">£65.00</span>
                                                </td>
                                                <td className="cart__table--body__list text-center">
                                                    <span className="in__stock text__secondary">in stock</span>
                                                </td>
                                                <td className="cart__table--body__list text-right">
                                                    <a
                                                        className="wishlist__cart--btn primary__btn"
                                                        href="cart.html"
                                                    >
                                                        Add To Cart
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="cart__table--body__items">
                                                <td className="cart__table--body__list">
                                                    <div className="cart__product d-flex align-items-center">
                                                        <button
                                                            className="cart__remove--btn"
                                                            aria-label="search button"
                                                            type="button"
                                                        >
                                                            <svg
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="16px"
                                                                height="16px"
                                                            >
                                                                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                                            </svg>
                                                        </button>
                                                        <div className="cart__thumbnail">
                                                            <a href="product-details.html">
                                                                <img
                                                                    className="border-radius-5"
                                                                    src="assets/img/product/small-product/product6.webp"
                                                                    alt="cart-product"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="cart__content">
                                                            <h3 className="cart__content--title h4">
                                                                <a href="product-details.html">Motorbike Care</a>
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
                                                    <span className="cart__price">£65.00</span>
                                                </td>
                                                <td className="cart__table--body__list text-center">
                                                    <span className="in__stock text__secondary">in stock</span>
                                                </td>
                                                <td className="cart__table--body__list text-right">
                                                    <a
                                                        className="wishlist__cart--btn primary__btn"
                                                        href="cart.html"
                                                    >
                                                        Add To Cart
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="continue__shopping d-flex justify-content-between">
                                        <a className="continue__shopping--link" href="index.html">
                                            Continue shopping
                                        </a>
                                        <a className="continue__shopping--clear" href="shop.html">
                                            View All Products
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Start brand section */}
                <div className="brand__section section--padding pt-0">
                    <div className="container">
                        <div className="brand__section--inner d-flex justify-content-between align-items-center">
                            <div className="brang__logo--items">
                                <img
                                    className="brang__logo--img"
                                    src="assets/img/logo/brand-logo1.webp"
                                    alt="brand-logo"
                                />
                            </div>
                            <div className="brang__logo--items">
                                <img
                                    className="brang__logo--img"
                                    src="assets/img/logo/brand-logo2.webp"
                                    alt="brand-logo"
                                />
                            </div>
                            <div className="brang__logo--items">
                                <img
                                    className="brang__logo--img"
                                    src="assets/img/logo/brand-logo3.webp"
                                    alt="brand-logo"
                                />
                            </div>
                            <div className="brang__logo--items">
                                <img
                                    className="brang__logo--img"
                                    src="assets/img/logo/brand-logo4.webp"
                                    alt="brand-logo"
                                />
                            </div>
                            <div className="brang__logo--items">
                                <img
                                    className="brang__logo--img"
                                    src="assets/img/logo/brand-logo5.webp"
                                    alt="brand-logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>

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