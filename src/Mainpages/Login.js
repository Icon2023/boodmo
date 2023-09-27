import React from "react";
import RegisterForm from "../Subpages/Loginauthentication/RegisterForm";
import LoginForm from "../Subpages/Loginauthentication/LoginForm";
import ShippingAddress from "../Subpages/ShippingAddress";

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
                      <a href="/">Home</a>
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
        
        {/* Start login section  */}
        <div className="login__section section--padding">
          <div className="container">

            <div className="login__section--inner">
              <div className="row row-cols-md-2 row-cols-1">
                <div className="col">
                  <LoginForm />
                </div>
                <div className="col">
                  <RegisterForm />
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <ShippingAddress />
      </main>
    </>
  );
};

export default Login;
