import React, { useState } from "react";
import HideShow from "../../Utils/HideShow";
import { Register } from "../../Services/apiServices";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');
  const [type, setType] = useState('');
  const [isopen, setIsopen] = useState(true);
  const [isopen1, setIsopen1] = useState(true);


  const handleChange = (e) => {
    setEmail(e.target.value);
    setType('email')
    if (e.target.value.length > 0) {
      setIsopen1(false)
    } else {
      setIsopen1(true)
    }

  }
  
  const handleChange1 = (e) => {
    setNumber(e.target.value);
    setType('mobile')
    if (e.target.value.length > 0) {
      setIsopen(false)
    } else {
      setIsopen(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      type: type,
      ...type === "email" ? { email: email } : { mobile: number },
      password: password,
      device_type:'web',
      device_token:'abcd'
    }
    if (password === conpassword) {
      Register(data).then((res) => {
        console.log("res----", res);
        if (res.success) {
          localStorage.setItem("USER", JSON.stringify(res));
          navigate("/");
          window.location.reload();
        } else {
          setError(res.message);
        }
      });
    }else{
      alert("please match password")
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
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
            {
              isopen ? <input type="text" placeholder="Email" value={email} onChange={handleChange} className="account__login--input" /> : ""
            }

            <div className="account__login--divide">
              <span className="account__login--divide__text">OR</span>
            </div>

            {
              isopen1 ? <input type="number" placeholder="+91 Number" value={number} onChange={handleChange1} className="account__login--input" /> : ""
            }

            <HideShow {...{ passwordShown, setPasswordShown }}>
              <input type={passwordShown ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="account__login--input" />
            </HideShow>
            <HideShow {...{ passwordShown, setPasswordShown }}>
              <input type={passwordShown ? "text" : "password"} value={conpassword} onChange={(e) => setConPassword(e.target.value)} placeholder="Confirm password" className="account__login--input" />
            </HideShow>
            <button
              className="account__login--btn primary__btn mb-10"
              type="submit"
            >
              Submit &amp; Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
