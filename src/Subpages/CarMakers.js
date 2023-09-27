import React, { useEffect, useState } from "react";
import "./car_makers.css";
import { CarCompanies } from "../Services/apiServices";
import PopularCarMakers from "./HomeSubpages/PopularCarMakers";
import { useLocation } from "react-router-dom";
import HeadingSection from "../Utils/HeadingSection";

const CarMakers = () => {

  const location = useLocation();
  let pathName = location.pathname;

  const [carCompany, setCarCompany] = useState([]);
  // State to track the filter letter
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    CarCompanies()
      .then((res) => {
        setCarCompany(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilterClick = (letter) => {
    setFilterLetter(letter);
  };

  // Function to filter elements based on the first letter
  const filterElements = () => {
    // Filter the elements based on the selected letter
    const filteredElements = carCompany.filter((element) =>
      element.name.startsWith(filterLetter)
    );
    return filteredElements;
  };

  // Function to update the filter letter when the user types
  const handleInputChange = (event) => {
    const inputLetter = event.target.value.toUpperCase();
    setFilterLetter(inputLetter);
  };

  // Group filtered elements by their first letter
  const groupedElements = {};
  filterElements().forEach((element) => {
    const firstLetter = element.name.charAt(0).toUpperCase();
    if (!groupedElements[firstLetter]) {
      groupedElements[firstLetter] = [];
    }
    groupedElements[firstLetter].push(element.name);
  });

  // Get unique first letters from the elements array
  const uniqueFirstLetters = [
    ...new Set(
      carCompany.map((element) => element.name.charAt(0).toUpperCase())
    ),
  ];
  return (
    <div>
      <div className="container mt-5">
        {/* <div className="section__heading border-bottom mb-30 d-flex flex-wrap justify-content-between">
          <h2 className="section__heading--maintitle">
            Search Parts by <span>VEHICLE MAKERS</span>
          </h2>
          <input
            type="text"
            placeholder="Search Car Makes"
            value={filterLetter}
            onChange={handleInputChange}
          />
        </div> */}
        {
          pathName == "/vehicles" ? <HeadingSection isInput title="Search Parts by VEHICLE MAKERS" value={filterLetter} onChange={handleInputChange} />
            : null
        }
        {/* filter */}
        <section>
          <ul className="makers-nav">
            <li
              onClick={() => setFilterLetter("")}
              className={`makers-nav__item ${filterLetter === "" ? "makers-nav-active" : ""
                }`}
            >
              All
            </li>
            {uniqueFirstLetters.map((letter, index) => (
              <li
                key={index}
                className={`makers-nav__item ${filterLetter === letter ? "makers-nav-active" : ""
                  }`}
                onClick={() => setFilterLetter(letter)}
                style={{ marginRight: "10px" }}
              >
                {letter}
              </li>
            ))}
          </ul>
          <ul className="makers-list">
            {Object.keys(groupedElements).map((letter) => {
              return (
                <li className="makers-list__group">
                  <p className="makers-list__group__name">{letter}</p>
                  <ul className="makers-list__group__list">
                    {groupedElements[letter].map((element, index) => (
                      <div className="makers-list__group__list__item">
                        <a href="#" className="car-maker-item" key={index}>
                          {element.toUpperCase()}
                        </a>
                      </div>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CarMakers;
