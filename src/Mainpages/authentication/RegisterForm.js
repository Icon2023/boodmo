import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import HideShow from "../../Utils/form/HideShow";
import TextInput from "../../Utils/form/TextInput";
import { Register } from "../../Services/apiServices";
import { Alert } from "@mui/material";

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const initialValuesRegister = {
    email: "raj.iconfisys@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    mobile: "4567894512",
  };

  const validationSchemaRegister = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    //     "Must Contain 6 Characters,"
    //   ),
  });
  const handleSubmitRegister = (values, { setSubmitting }) => {
    Register(values).then((res) => {
      console.log("res----", res);
      if (!res.success) {
        setError(res.message);
      } else {
        localStorage.setItem("USER", JSON.stringify(res));
        //   navigate("/");
        // window.location.reload();
      }
    });
    setTimeout(() => {
      // Perform your form submission logic here
      setSubmitting(false);
    }, 2000); // Simulate a 2-second delay for the sake of the example
  };


  return (
    <div>
      <Formik
        initialValues={initialValuesRegister}
        validationSchema={validationSchemaRegister}
        onSubmit={handleSubmitRegister}
      >
        <Form>
          <div className="account__login register">
            <div className="account__login--header mb-25">
              <h2 className="account__login--header__title mb-10">
                Create an Account
              </h2>
              <p className="account__login--header__desc">
                Register here if you are a new customer
              </p>
            </div>
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
            <div className="account__login--inner">
              <TextInput type={"text"} placeholder="Email" name={"email"} />
              <div className="account__login--divide">
                <span className="account__login--divide__text">OR</span>
              </div>
              <TextInput
                type={"text"}
                placeholder="Mobile Number"
                name={"mobile"}
              />
              <HideShow {...{ passwordShown, setPasswordShown }}>
                <TextInput
                  name={"password"}
                  type={passwordShown ? "text" : "password"}
                  placeholder="password"
                />
              </HideShow>
              <HideShow {...{ passwordShown, setPasswordShown }}>
                <TextInput
                  name={"confirmPassword"}
                  type={passwordShown ? "text" : "password"}
                  placeholder="confirm Password"
                />
              </HideShow>
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
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
