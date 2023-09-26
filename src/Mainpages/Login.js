import React from "react";
import RegisterForm from "./authentication/RegisterForm";
import LoginForm from "./authentication/LoginForm";

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
           
              <div className="login__section--inner">
                <div className="row row-cols-md-2 row-cols-1">
                  <div className="col">
                    <LoginForm/>
                  </div>
                  <div className="col">
                    <RegisterForm/>
                  </div>
                </div>
              </div>

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
                  <p className="shipping__content--desc">
                    Free shipping over $100
                  </p>
                </div>
              </div>
              <div className="shipping__items style2 d-flex align-items-center">
                <div className="shipping__icon">
                  <img src="assets/img/other/shipping2.webp" alt="icon-img" />
                </div>
                <div className="shipping__content">
                  <h2 className="shipping__content--title h3">Support 24/7</h2>
                  <p className="shipping__content--desc">
                    Contact us 24 hours a day
                  </p>
                </div>
              </div>
              <div className="shipping__items style2 d-flex align-items-center">
                <div className="shipping__icon">
                  <img src="assets/img/other/shipping3.webp" alt="icon-img" />
                </div>
                <div className="shipping__content">
                  <h2 className="shipping__content--title h3">
                    100% Money Back
                  </h2>
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
                  <h2 className="shipping__content--title h3">
                    Payment Secure
                  </h2>
                  <p className="shipping__content--desc">
                    We ensure secure payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End shipping section */}
      </main>
    </>
  );
};

export default Login;
