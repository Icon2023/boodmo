import React from 'react'

const ShippingAddress = () => {
    return (
        <>
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
        </>
    )
}

export default ShippingAddress