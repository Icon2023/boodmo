import React, { useEffect, useState } from "react";
import { CarCompanies } from "../../Services/apiServices";
import HeadingSection from "../../Utils/HeadingSection";
import "../../Subpages/car_makers.css";
import { Link } from "react-router-dom";

const PopularCarMakers = () => {
  const [carCompany, setCarCompany] = useState([]);

  useEffect(() => {
    CarCompanies()
      .then((res) => {
        setCarCompany(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      <section style={{ marginBottom: "40px" }} className="container">
        <HeadingSection title="Car Makers" link="vehicles" />
        <div className="popular-brand-list">
          {
            carCompany.map((e, index) => {
              return (
                <div
                  className="popular-brand-list__item cls-loading--done"
                  key={index}
                  style={{ position: "relative" }}
                >
                  <div className="car-maker-item">
                    {/* <Link to={`/vehicles/${e?.name}/${e?.id}`}> */}
                    <img
                      src={e?.logo}
                      alt="car-logo"
                      width={50}
                      height={50}
                    />
                    <div className="pt-2">{e?.name.toUpperCase()}</div>
                    {/* </Link> */}
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  );
};

export default PopularCarMakers;
