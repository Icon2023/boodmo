import React from 'react'
import { Link } from 'react-router-dom'
import thumb404 from "../images/404-thumb.webp";import ShippingAddress from '../Subpages/ShippingAddress';

const Page404 = () => {
  return (
    <div>
      <main className="main__content_wrapper">
  {/* Start error section */}
  <section className="error__section section--padding">
    <div className="container">
      <div className="row row-cols-1">
        <div className="col">
          <div className="error__content text-center">
            <img
              className="error__content--img display-block mb-50"
              src={thumb404}
              alt="error-img"
            />
            <h2 className="error__content--title">
              Opps ! We,ar Not Found This Page{" "}
            </h2>
            <p className="error__content--desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi animi aliquid minima assumenda.
            </p>
            <Link className="error__content--btn primary__btn" to="/">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End error section */}
  <ShippingAddress/>
</main>

    </div>
  )
}

export default Page404
