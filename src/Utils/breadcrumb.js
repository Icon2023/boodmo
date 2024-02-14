import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

const Breadcrumb = ({
  icon2,
  icon3,
  subTitle2,
  subTitle3,
  link2,
  link3,

}) => {
  return (
    <div>
      <section className="breadcrumb__section breadcrumb__bg">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content text-start">
                {/* <h2 className="breadcrumb__content--title">{title}</h2> */}
                <ul className="breadcrumb__content--menu d-flex justify-content-start">
                  <li className="breadcrumb__content--menu__items">
                    <IoMdHome
                      color="#363062"
                      style={{
                        fontSize: "28px",
                        marginRight: "4px",
                        boxSizing: "border-box",
                      }}
                    />

                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="breadcrumb__content--menu__items"
                    style={{ cursor: "pointer" }}
                  >
                    <Link to={link2}>{icon2}</Link>
                    <Link to={link2}>
                      <span>{subTitle2}</span>
                    </Link>
                  </li>
                  {subTitle3 && icon3 ? (
                    <li
                      className="breadcrumb__content--menu__items"
                      style={{ cursor: "pointer" }}
                    >
                      <Link to={link3}> {icon3}</Link>
                      <Link to={link3}>
                        <span>{subTitle3}</span>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Breadcrumb;