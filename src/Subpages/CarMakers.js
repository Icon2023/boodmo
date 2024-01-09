import React, { useEffect, useState } from "react";
import { CarCompanies } from "../Services/apiServices";
import { Link, useLocation } from "react-router-dom";
import HeadingSection from "../Utils/HeadingSection";
import "./car_makers.css";
import { ScrollToTop } from "../Utils/ScrollToTop";

const CarMakers = () => {

  const location = useLocation();
  let pathName = location.pathname;

  const [carCompany, setCarCompany] = useState([]);
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    ScrollToTop();
    CarCompanies()
      .then((res) => {
        setCarCompany(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
      ScrollToTop();
  }, []);

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
    <div className="margin_top_all">
      <div className="container">

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
                        <Link to={`/vehicles/${element?.name}/${element?.id}`} className="car-maker-item">
                          
                        {/* <a href="#" className="car-maker-item" key={index}> */}
                          {element.toUpperCase()}
                        </Link>
                        {/* </a> */}
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
