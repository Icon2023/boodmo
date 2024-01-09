import React from "react";
import Header from "../Mainpages/Header";
import Footer from "../Mainpages/Footer";
import thank from "../images/thank-you.svg";
import SuccessMicrointeraction from "../images/SuccessMicrointeraction.gif";
import SuccessfulPayment from "../images/SuccessfulPayment.gif";
import SuccesPriosfulPayment from "../images/Prio.gif";
import Success from "../images/Success.gif";
import Prio from "../images/Prio.gif";
import thankyou from "../images/89898.png";
import Bill from "../images/Bill.gif";
import { Link, useParams } from "react-router-dom";

const ThankYou = () => {
    const { paymentID } = useParams();

    const copyText = () => {
        const textToCopy = paymentID;
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard:', textToCopy);
          })
          .catch((error) => {
            console.error('Error copying text:', error);
          });
      };
  return (
    <div>
      <Header />
      <div
        className="thank_you shadow-lg p-3 mb-5 bg-white rounded"
        style={{ maxWidth: "100%" }}
      >
        <div>
          <img src={Prio} alt="payment" className="mb-4" />
          <h3 className="txt--gradient-green">Thank you for Ordering!</h3>
          <p style={{ opacity: "0.5" }}>
            Payment id:-
            <span title="Copy" className="">
              <b onClick={copyText}>{paymentID}</b>
            </span>
            <button className='btn btn-primary rounded-pill px-2 ml-2 text-sm' onClick={copyText}>
              Copy
            </button>
            <p>Success! Your payment has been received. Enjoy your purchase!</p>
          </p>
        </div>
        <div className="thank_btn">
          <Link to={"/"}>
            <button className="mt-5 ">Continue To Home</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
