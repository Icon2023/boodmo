import React, { useEffect, useState } from "react";
import { CarCompanies } from "../../Services/apiServices";
import "../../Subpages/car_makers.css";
import HeadingSection from "../../Utils/HeadingSection";
import popular from '../../images/2562193.png'


const PopularCarMakers = () => {
  const [carCompany, setCarCompany] = useState([]);

  useEffect(() => {
    CarCompanies()
      .then((res) => {
        setCarCompany(res?.data);
        // console.log("pop", res?.data);
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
                    {
                      e?.is_popular === 1 ?
                        <div className="popular_tag" style={{ position: "absolute", left:"50%" ,top:"-15%" }}>
                          <img src={popular} alt="" srcset="" />
                        </div>
                        :
                        ""
                    }
                    <img
                      src={e?.logo}
                      alt="car-logo"
                      width={50}
                      height={50}
                    />
                    <div className="pt-2">{e?.name.toUpperCase()}</div>
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
