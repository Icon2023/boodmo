import React from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
// import img1 from '../images/icons8-back-94.png'

function PrevArrow({ onClick }) {
  return (
    <div className="arrow_click_prev">
      <div className="prev_arrow" onClick={onClick}>
        <RxDoubleArrowLeft
          className="mb-1 arrow_click_svg"
        />
        {/* <img src={img1} alt="" /> */}
      </div>
    </div>
  );
}

export default PrevArrow;
