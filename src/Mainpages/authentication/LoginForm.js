import React, { useState } from "react";
import HideShow from "../../Utils/form/HideShow";
import TextInput from "../../Utils/form/TextInput";
import { Alert } from "@mui/material";
import * as Yup from "yup";
import { LogIn } from "../../Services/apiServices";
import { Form, Formik } from "formik";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const initialValues = {
    username: "raj.iconfisys@gmail.com",
    email: "raj.iconfisys@gmail.com",
    password: "123456",
    phoneNumber: "4567894512",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    // phoneNumber: Yup.string()
    //   .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    //   .required("Phone number is required"),
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    //     "Must Contain 6 Characters,"
    //   ),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    LogIn(values).then((res) => {
      console.log("res----", res);
      if (!res.success) {
        console.log("res----", res);
        setError(res.message);
      } else {
        localStorage.setItem("USER", JSON.stringify(res));
        //   navigate("/");
        // window.location.reload();
      }
    });
    setTimeout(() => {
      setSubmitting(false);
    }, 2000); // Simulate a 2-second delay for the sake of the example
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="account__login">
            <div className="account__login--header mb-25">
              <h2 className="account__login--header__title mb-10">Login</h2>
              <p className="account__login--header__desc">
                Login if you area a returning customer.
              </p>
            </div>
            <div className="account__login--inner">
              {error && (
                <>
                  <Alert  
                    severity="error"
                    onClose={() => setError(false)}
                    // dismissible
                    className="my-4"
                  >
                    <h4>{error}</h4>
                  </Alert>
                </>
              )}
              <TextInput
                name={"email"  && "phoneNumber" && "username"}
                type={"text"}
                placeholder="Phone Number or email"
              />
              <HideShow {...{ passwordShown, setPasswordShown }}>
                <TextInput
                  name={"password"}
                  type={passwordShown ? "text" : "password"}
                  placeholder="password"
                />
              </HideShow>
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
                type="submit"
                className="account__login--btn primary__btn"
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
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
