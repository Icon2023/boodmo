import React, { useState } from "react";
import HideShow from "../../Utils/HideShow";
import { Alert } from "@mui/material";
import { Add_Tocart_Login, CartList, LogIn, WishListLogin } from "../../Services/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLoginCart, addToWishlist, removeAllAddtocart, removeAllItemWishlist } from "../../store/reducers/ProductSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [emailNumber, setEmailNumber] = useState('raj.iconfisys@gmail.com')
  const [password, setPassword] = useState('123456')
  const [passwordShown, setPasswordShown] = useState(false);

  const { addto_cart } = useSelector((state) => ({ ...state.products }));


  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      username: emailNumber,
      password: password
    }
    LogIn(data).then((res) => {
      if (res.success) {
        localStorage.setItem("USER", JSON.stringify(res));

        // add to cart if any item availble in cartlist
        if (addto_cart.length > 0) {
          addto_cart.map((obj) => {
            const cartPayload = {
              product_id: obj.proId,
              price: obj.price,
              qty: obj.qty
            }
            Add_Tocart_Login(cartPayload).then((res) => {
              console.log(res);
            })
          })
          dispatch(removeAllAddtocart())
        }

        // get wishlist when user login
        WishListLogin().then((res)=>{
          dispatch(addToWishlist(res?.data))
        })

        CartList().then((res)=>{
          dispatch(addLoginCart(res?.data))
        })
        
        navigate("/");
      } else {
        setError(res.message);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            <input type="text" placeholder="Phone Number or email" value={emailNumber} onChange={(e) => setEmailNumber(e.target.value)} className="account__login--input" />
            <HideShow {...{ passwordShown, setPasswordShown }}>
              <input type={passwordShown ? "text" : "password"} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="account__login--input" />
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
            <button className="account__login--btn primary__btn">
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
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
