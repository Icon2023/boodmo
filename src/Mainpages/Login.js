import React from "react";
import RegisterForm from "../Subpages/Loginauthentication/RegisterForm";
import LoginForm from "../Subpages/Loginauthentication/LoginForm";
import ShippingAddress from "../Subpages/ShippingAddress";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <>
      <main className="margin_top_all">

        {/* Start login section  */}
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6"
        >
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
        </motion.div>

        <ShippingAddress />
      </main>
    </>
  );
};

export default Login;
