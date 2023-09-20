import React from 'react'

const Login = () => {
    return (
        <>
            <main className="main__content_wrapper">
                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a href="index.html">Home</a>
                                        </li>
                                        <li className="breadcrumb__content--menu__items">
                                            <span>Account</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End breadcrumb section */}
                {/* Start login section  */}
                <div className="login__section section--padding">
                    <div className="container">
                        <form action="#">
                            <div className="login__section--inner">
                                <div className="row row-cols-md-2 row-cols-1">
                                    <div className="col">
                                        <div className="account__login">
                                            <div className="account__login--header mb-25">
                                                <h2 className="account__login--header__title mb-10">Login</h2>
                                                <p className="account__login--header__desc">
                                                    Login if you area a returning customer.
                                                </p>
                                            </div>
                                            <div className="account__login--inner">
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Email Addres"
                                                        type="email"
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Password"
                                                        type="password"
                                                    />
                                                </label>
                                                <div className="account__login--remember__forgot mb-15 d-flex justify-content-between align-items-center">
                                                    <div className="account__login--remember position__relative">
                                                        <input
                                                            className="checkout__checkbox--input"
                                                            id="check1"
                                                            type="checkbox"
                                                        />
                                                        <span className="checkout__checkbox--checkmark" />
                                                        <label
                                                            className="checkout__checkbox--label login__remember--label"
                                                            htmlFor="check1"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <button className="account__login--forgot" type="submit">
                                                        Forgot Your Password?
                                                    </button>
                                                </div>
                                                <button
                                                    className="account__login--btn primary__btn"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                                <div className="account__login--divide">
                                                    <span className="account__login--divide__text">OR</span>
                                                </div>
                                                <div className="account__social d-flex justify-content-center mb-15">
                                                    <a
                                                        className="account__social--link facebook"
                                                        target="_blank"
                                                        href="https://www.facebook.com/"
                                                    >
                                                        Facebook
                                                    </a>
                                                    <a
                                                        className="account__social--link google"
                                                        target="_blank"
                                                        href="https://www.google.com/"
                                                    >
                                                        Google
                                                    </a>
                                                    <a
                                                        className="account__social--link twitter"
                                                        target="_blank"
                                                        href="https://twitter.com/"
                                                    >
                                                        Twitter
                                                    </a>
                                                </div>
                                                <p className="account__login--signup__text">
                                                    Don,t Have an Account?{" "}
                                                    <button type="submit">Sign up now</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="account__login register">
                                            <div className="account__login--header mb-25">
                                                <h2 className="account__login--header__title mb-10">
                                                    Create an Account
                                                </h2>
                                                <p className="account__login--header__desc">
                                                    Register here if you are a new customer
                                                </p>
                                            </div>
                                            <div className="account__login--inner">
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Username"
                                                        type="text"
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Email Addres"
                                                        type="email"
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Password"
                                                        type="password"
                                                    />
                                                </label>
                                                <label>
                                                    <input
                                                        className="account__login--input"
                                                        placeholder="Confirm Password"
                                                        type="password"
                                                    />
                                                </label>
                                                <button
                                                    className="account__login--btn primary__btn mb-10"
                                                    type="submit"
                                                >
                                                    Submit &amp; Register
                                                </button>
                                                <div className="account__login--remember position__relative">
                                                    <input
                                                        className="checkout__checkbox--input"
                                                        id="check2"
                                                        type="checkbox"
                                                    />
                                                    <span className="checkout__checkbox--checkmark" />
                                                    <label
                                                        className="checkout__checkbox--label login__remember--label"
                                                        htmlFor="check2"
                                                    >
                                                        I have read and agree to the terms &amp; conditions
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* End login section  */}
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
                {/* End shipping section */}
            </main>

        </>
    )
}

export default Login