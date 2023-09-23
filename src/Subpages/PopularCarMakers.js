import React, { useEffect, useState } from "react";
import { CarCompanies } from "../Services/apiServices";
import { Link } from "react-router-dom";
import "../Subpages/car_makers.css";
import plceholderLogo from "../plceholder-logo.svg";

const PopularCarMakers = () => {
  const [carCompany, setCarCompany] = useState([]);

  useEffect(() => {
    CarCompanies()
      .then((res) => {
        setCarCompany(res?.data);
        console.log("pop", res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <section style={{ marginBottom: "40px" }} className="container">
        {/* <h3>Popular Vehicle Makers</h3> */}
        <div className="section__heading border-bottom mb-30 d-flex flex-wrap justify-content-between">
          <h2 className="section__heading--maintitle">
            Popular <span> Car Makers</span>
          </h2>
          <div>
            <Link to="/vehicles">VIEW ALL</Link>
          </div>
        </div>

        <div className="popular-brand-list">
          {carCompany.map((car) =>
            car.is_popular === 1 ? (
              <div
                className="popular-brand-list__item cls-loading--done"
                key={car?.id + 2}
              >
                <a href="#" className="car-maker-item">
                  <img
                    src={car?.logo}
                    onError={(e) => e.target.src = plceholderLogo
                    }
                    alt="car-logo"
                    width={50}  
                    height={50}
                  />
                  <div className="pt-2"> {car?.name.toUpperCase()}</div>
                </a>
              </div>
            ) : null
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularCarMakers;
