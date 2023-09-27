import React from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
// import img1 from '../images/icons8-back-94.png'

function PrevArrow({ onClick }) {
  return (
    <div className="arrow_click_prev" style={{position: "absolute",
      right: "77%",
      top: "-32%",
      transform: "translate(-50%, -50%)" , cursor:"pointer"}}>
      <h2 className="prev_arrow" onClick={onClick}>
        <RxDoubleArrowLeft
          className="mb-1 arrow_click_svg"
        />
        {/* <img src={img1} alt="" /> */}
      </h2>
    </div>
  );
}

export default PrevArrow;
