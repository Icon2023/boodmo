import React from "react";
import "../Mainpages/car_makers.css";

const HeadingSection = () => {
  return (
    <div>
      <div className="section__heading border-bottom mb-30 d-flex flex-wrap justify-content-between">
        <h2 className="section__heading--maintitle">
          Search Parts by <span>VEHICLE MAKERS</span>
        </h2>
        <input type="text" placeholder="Search Car Makes" defaultValue="" />
      </div>
    </div>
  );
};

export default HeadingSection;

// work in progress
