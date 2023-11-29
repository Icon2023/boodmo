import React, { useState, useEffect } from "react";
import { Brands } from "../Services/apiServices";
import "./brands.css";
import { Link, useLocation } from "react-router-dom";
import HeadingSection from "../Utils/HeadingSection";

const BrandsAll = () => {
  const location = useLocation();
  let pathName = location.pathname;

  const [brands, setBrands] = useState([]);
  // State to track the filter letter
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    Brands()
      .then((res) => {
        setBrands(res?.data);
        // console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to filter elements based on the first letter
  const filterElements = () => {
    // Filter the elements based on the selected letter
    const filteredElements = brands.filter((element) =>
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
    groupedElements[firstLetter].push({
      name: element.name,
      product_count: element.product_count,
      id:element.id,
    });
  });

  //   Get unique first letters from the elements array
  const uniqueFirstLetters = [
    ...new Set(brands.map((element) => element.name.charAt(0).toUpperCase())),
  ];
  return (
    <>
      <section className="container margin_top_all">
        {
          pathName == "/brands" ? <HeadingSection isInput title="Shop by Brand" value={filterLetter} onChange={handleInputChange} />
            : null
        }
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

        {/* filter */}
        <ul className="brands-list">
          {Object.keys(groupedElements).map((letter) => {
            // console.log("ll",letter);
            return (
              <li className="brands-list__group">
                <p className="brands-list__group__name">{letter}</p>
                <ul className="brands-list__group__list">
                  {
                    groupedElements[letter]?.map((subData, index) => {
                      console.log("ll",subData);
                      return (
                        <>
                          <li className="brands-list__group__list__item" key={index}>
                          <Link to={`/brands/${subData?.id}`}>
                              {subData?.name}({subData?.product_count})
                            </Link>
                          </li>
                        </>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default BrandsAll;
