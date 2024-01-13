import React from "react";
import { Link } from "react-router-dom";

const HeadingSection = ({ isInput, title, link, onChange, value }) => {
  return (
    <div className="container">
      <div className="section__heading border-bottom mb-30 d-flex flex-wrap justify-content-between">
        <h2 className="section__heading--maintitle">
          {/* Search Parts by <span>VEHICLE MAKERS</span> */}
          {title}
        </h2>
        {isInput ? <input type="text" style={{
          border: "1px solid #E5E5E5", borderRadius: "0.5rem",
          padding: "0.5rem 1.5rem",
          marginBottom: "0",
          marginTop:"20px"
        }} placeholder="Search Car Makes" value={value} onChange={onChange} /> :
          <Link to={link}>VIEW ALL</Link>
        }
        {/* {isInput ? <input type="text" placeholder="Search Car Makes" value={value} onChange={onChange} defaultValue="" /> :
        <Link to={link}>VIEW ALL</Link>
        } */}
      </div>
    </div>
  );
};

export default HeadingSection;
