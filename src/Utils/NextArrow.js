import React from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
// import img1 from '../images/icons8-forward-94.png'

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow_click_next">
      <div className="next_arrow" onClick={onClick}>    
        <RxDoubleArrowRight
          className="mb-1 arrow_click_svg"
        />
        {/* <img src={img1} alt="" /> */}
      </div>
    </div>
  );
};

export default NextArrow;
