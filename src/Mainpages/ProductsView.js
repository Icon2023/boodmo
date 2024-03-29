import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Brands,
  CarCompanies,
  CarModel,
  Product,
} from "../Services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, removeFilter } from "../store/reducers/ProductSlice";
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillStar, AiOutlineFilter, AiOutlineStar } from "react-icons/ai";
import Drawer from 'react-modern-drawer';
import Placeholder_view from "../images/Placeholder_view_vector.svg";

//matrial ui
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Pagination, PaginationItem } from "@mui/material";
import { IoGridSharp } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import Breadcrumb from "../Utils/breadcrumb";
import { motion } from "framer-motion";
import NoData from "../images/no-data2.svg";

const ProductsView = () => {
  const dispatch = useDispatch();
  const { add_product, category_list, filter_multi } = useSelector((state) => ({ ...state.products }));
  const { cate_id, subcategory } = useParams();
  const [gridOpen, setGridOpen] = useState(true);
  const [trifOpen, setTrifOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Set the number of items to show per page here.
  const [Stprice, setStPrice] = useState('')
  const [endPrice, setEndPrice] = useState('')
  const [isOpen, setIsOpen] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const [carName, setCarName] = useState([]);
  const [carValName, setCarValName] = useState("");

  const [carModel, setCarModel] = useState([]);
  const [carValModel, setCarValModel] = useState("");

  // const [carYear, setCarYear] = useState([]);
  // const [carValYear, setCarValYear] = useState("");

  // const [carModefication, setCarModefication] = useState([]);
  const [carValModefication, setValModefication] = useState("");

  const [displayedBrands, setDisplayedBrands] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);


  useEffect(() => {
    CarCompanies().then((res) => {
      setCarName(res?.data);
    });

    Brands().then((res) => {
      setBrands(res?.data);
      setDisplayedBrands(res?.data.slice(0, visibleItemCount));
    });

    dispatch(removeFilter());
  }, []);

  useEffect(() => {
    const lists = localStorage.getItem("list");
    const grids = localStorage.getItem("grid");

    const storedSelectedValues = JSON.parse(
      localStorage.getItem("selectedValues")
    );
    if (storedSelectedValues) {
      setSelectedValues(storedSelectedValues);
    }
    if (lists) {
      setGridOpen(false);
      setTrifOpen(true);
    }
    if (grids) {
      setGridOpen(true);
      setTrifOpen(false);
    }

    if (filter_multi.length < 1) {
      const data = {
        category: cate_id,
        sub_category: subcategory,
      };
      Product(data)
        .then((res) => {
          if (res.success) {
            setIsLoadingImage(false);
            dispatch(addProducts(res?.data));
          }
        })
        .catch(() => {
          setIsLoadingImage(true);
        });
    } else {
      const filter = {
        category: filter_multi?.category,
        sub_category: filter_multi?.sub_category,
        car_company_id: filter_multi?.car_company_id,
        car_company_model_id: filter_multi?.car_company_model_id,
        car_company_year_id: filter_multi?.car_company_year_id,
        car_company_year_modi_id: filter_multi?.car_company_year_modi_id,
      };
      Product(filter).then((res) => {
        if (res.success) {
          dispatch(addProducts(res?.data));
        }
      });
    }
    // const data = {
    //     category: cate_id,
    //     sub_category: subcategory
    // }
    // Product(data).then((res) => {
    //     if (res.success) {
    //         setIsLoadingImage(false)
    //         dispatch(addProducts(res?.data))
    //     }
    // }).catch(() => {
    //     setIsLoadingImage(true)
    // })
  }, []);

  // Calculate the indexes of the items to show on the current page.
  const totalPages = Math?.ceil(add_product?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = add_product?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  const handleGridClick = () => {
    gridOpen ? setTrifOpen(false) : setGridOpen(true);
    localStorage.setItem("grid", gridOpen);
    localStorage.removeItem("list", trifOpen);
  };

  const handleTfiClick = () => {
    gridOpen ? setGridOpen(false) : setTrifOpen(true);
    localStorage.setItem("list", trifOpen);
    localStorage.removeItem("grid", gridOpen);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleReset = () => {
    window.location.reload();
    dispatch(removeFilter());
  };

  const sortClick = (val1) => {
    console.log(val1);
    let data = {
      category: cate_id,
      sub_category: subcategory,
      sort_by: val1.split(",")[0],
      sort_action: val1.split(",")[1],
      // brand: selectedValues.join(',')
    };

    Product(data).then((res) => {
      if (res.success) {
        dispatch(addProducts(res?.data));
      }
    });
  };

  const handlecarNameChange = (e) => {
    setCarValName(e.target.value);
    CarModel(e.target.value).then((res) => {
      if (res?.success) {
        setCarModel(res?.data);
      }
    });
  };

  // const handleModelNameChange = (e) => {
  //     setCarValModel(e.target.value);
  //     let val = e.target.value;
  //     setCarValYear(val)
  //     CarYear({ carValName, val }).then((res) => {
  //         setCarYear(res?.data);
  //     });
  // };

  // const handleModificationChange = (e) => {
  //     let val = e.target.value;
  //     setValModefication(e.target.value);
  //     CarModefication({ carValName, carValYear, val }).then((res) => {
  //         setCarModefication(res?.data);
  //     });
  // };

  const handleChecked = (e) => {
    const value = e.target.value;
    // if (selectedValues.includes(value)) {
    //     setSelectedValues(selectedValues.filter((item) => item !== value));
    // } else {
    //     setSelectedValues([...selectedValues, ...value]);
    //     console.log([...selectedValues, ...value]);
    // }
    setSelectedValues(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterdata = {
      category: cate_id,
      sub_category: subcategory,
      price_start: Stprice,
      price_end: endPrice,
      brand: selectedValues,
      car_company_id: carValName,
      car_company_model_id: carValModel,
      // car_company_year_id: carValYear,
      car_company_year_modi_id: carValModefication,
    };
    Product(filterdata).then((res) => {
      if (res.success) {
        dispatch(addProducts(res?.data));
      } else {
        console.log("error");
      }

    });
  };

  const handleLoadMore = () => {
    // setVisibleItemCount(prevCount => prevCount + 10);
    setVisibleItemCount(brands.length);
    // setDisplayedBrands(brands.slice(0, visibleItemCount + 10));
    setDisplayedBrands(brands);
  };
  // const allDataDisplayed = visibleItemCount >= brands.length;
  const remainingItemCount = brands.length - visibleItemCount;

  return (
    <div>
      <main className="margin_top_all">
        <Breadcrumb
          link2={`/shop/${cate_id}`}
          subTitle2="Category"
          subTitle3="Product"
          icon2={
            <BiCategory
              color="#363062"
              style={{
                fontSize: "22px",
                marginRight: "4px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          }
          icon3={
            <IoGridSharp
              color="#363062"
              style={{
                fontSize: "22px",
                marginRight: "4px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          }
        />

        {/* Start shop section */}
        <div className="shop__section section--padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 shop-col-width-lg-4">
                <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                  <div className="single__widget price__filter widget__bg">
                    <div className="d-flex justify-content-between">
                      <h2>Filters</h2>
                      <a
                        onClick={handleReset}
                        className="mt-1"
                        style={{ textDecoration: "underline", color: "red" }}
                      >
                        Reset
                      </a>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                      <div>
                        <h3 className="mt-4">Origin</h3>
                        <div className="d-flex align-items-center">
                          <input type="radio" value="" />
                          &nbsp;&nbsp;
                          <p className="mt-1">Aftermarket &nbsp;(18700)</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <input type="radio" value="" />
                          &nbsp;&nbsp;
                          <p className="mt-1">OEM &nbsp;(180)</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        {/* <div className="d-flex justify-content-between">
                          <h3 className="mt-1">Vehicle</h3>
                          <a onClick={handleReset} style={{ color: "#12477a" }}>
                            Reset
                          </a>
                        </div> */}
                        <div className="mt-3 mb-3">
                          <select
                            className="vehicle_select_model"
                            onChange={handlecarNameChange}
                          >
                            <option selected value={""}>
                              Choose Car Maker
                            </option>
                            {carName.map((e, index) => {
                              return (
                                <option value={e?.id} key={index}>
                                  {e?.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3>Brand</h3>
                        {displayedBrands?.map((e, index) => {
                          return (
                            <div
                              key={index}
                              style={{ maxHeight: "100px", overflowY: "auto" }}
                            >
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  name="brand"
                                  value={e?.id}
                                  onChange={handleChecked}
                                />
                                &nbsp;&nbsp;
                                <p className="mt-1">
                                  {e?.name}&nbsp;({e?.product_count})
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        {remainingItemCount > 0 && (
                          <span
                            onClick={handleLoadMore}
                            style={{
                              marginTop: "10px",
                              backgroundColor: "#f1696d",
                              color: "white",
                              border: 0,
                              cursor: "pointer",
                              borderRadius: "5px",
                              padding: "5px",
                            }}
                          >
                            +{remainingItemCount} More
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <h3>Price</h3>
                        <div className="form_filter">
                          <label>
                            From
                            <input
                              type="number"
                              placeholder="0"
                              value={Stprice}
                              onChange={(e) => setStPrice(e.target.value)}
                            />
                          </label>
                          <label>
                            To
                            <input
                              type="number"
                              placeholder="250"
                              value={endPrice}
                              onChange={(e) => setEndPrice(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="form_filter_btn">
                          <button>Filter</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Categories</h2>
                    <ul
                      className="widget__categories--menu"
                      style={{ height: "70vh", overflowY: "scroll" }}
                    >
                      {category_list?.map((e, index) => {
                        return (
                          <div key={index}>
                            <Accordion
                              expanded={expanded === e?.id}
                              onChange={handleChange(e?.id)}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{ fontSize: "28px" }}
                                  />
                                }
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <a href={`/shop/${e?.id}`}>
                                  <label className="widget__categories--menu__label d-flex align-items-center">
                                    <img
                                      className="widget__categories--menu__img"
                                      src={e?.image}
                                      alt="categories-img"
                                    />
                                    <span className="widget__categories--menu__text">
                                      {e?.name}
                                    </span>
                                  </label>
                                </a>
                              </AccordionSummary>
                              <AccordionDetails>
                                {e?.sub_category?.map((i, index) => {
                                  return (
                                    <li
                                      className="widget__categories--menu__list"
                                      key={index}
                                    >
                                      <a href={`/shop/${e?.id}/${i?.id}`}>
                                        <label
                                          label
                                          className="widget__categories--menu__label d-flex align-items-center"
                                        >
                                          <img
                                            className="widget__categories--menu__img"
                                            src={i?.image}
                                            alt="categories-img"
                                          />
                                          <span className="widget__categories--menu__text">
                                            {i?.name}
                                          </span>
                                        </label>
                                      </a>
                                    </li>
                                  );
                                })}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-9 col-lg-8 shop-col-width-lg-8">
                <div className="shop__right--sidebar">
                  <div className="shop__product--wrapper">
                    <div className="shop__header d-flex align-items-center justify-content-between mb-30">
                      <div className="product__view--mode d-flex align-items-center">
                        <button
                          className="widget__filter--btn d-flex d-lg-none align-items-center"
                          onClick={toggleDrawer}
                        >
                          <AiOutlineFilter />
                          <span className="widget__filter--btn__text">
                            Filter
                          </span>
                        </button>
                        <div className="product__view--mode__list product__short--by align-items-center d-flex">
                          <label className="product__view--label">
                            Sort By :
                          </label>
                          <div className="select shop__header--select">
                            <select
                              className="product__view--select m-0 p-0 ps-3"
                              style={{ width: "minContent" }}
                              onChange={(e) => sortClick(e.target.value)}
                            >
                              <option selected="" value={"price, ASC"}>
                                Sort by Populity
                              </option>
                              <option value={"price, ASC"}>LOW TO HIGH</option>
                              <option value={"price, DESC"}>HIGH TO LOW</option>
                              <option value={"latest, ASC"}>OLD TO NEW</option>
                              <option value={"latest, DESC"}>NEW TO OLD</option>
                            </select>
                          </div>
                        </div>
                        <div className="product__view--mode__list">
                          <div className="product__tab--one product__grid--column__buttons d-flex justify-content-center">
                            <button
                              className={`product__grid--column__buttons--icons ${gridOpen == true ? "active" : ""
                                } `}
                              aria-label="grid btn"
                              data-toggle="tab"
                              data-target="#product_grid"
                              onClick={handleGridClick}
                              title="Grid"
                            >
                              <CgMenuGridR />
                            </button>
                            <button
                              className={`product__grid--column__buttons--icons ${gridOpen == true ? "" : "active"
                                }`}
                              aria-label="list btn"
                              data-toggle="tab"
                              data-target="#product_list"
                              onClick={handleTfiClick}
                              title="List"

                            >
                              <TfiMenuAlt />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="product__showing--count">
                        Showing 1 of {add_product?.length} results
                      </p>
                    </div>
                    <div className="tab_content">
                      {gridOpen ? (
                        <>
                          <div className="tab_pane active">
                            <div className="product__section--inner">
                              <div className="row mb--n30">
                                {currentItems &&
                                  currentItems?.map((e, index) => {
                                    return (
                                      <div
                                        className="col-lg-4 col-md-4 col-sm-6 col-6 custom-col mb-30"
                                        key={index}
                                      >
                                        <motion.div
                                          className="box"
                                          initial={{ opacity: 0, scale: 0.5 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{
                                            duration: 0.8,
                                            delay: 0.5,
                                            ease: [0, 0.71, 0.2, 1.01],
                                          }}
                                        >
                                          <article className="product__card">
                                            <div className="product__card--thumbnail">
                                              <a
                                                className="product__card--thumbnail__link display-block"
                                                href={`/productsdetail/${e?.part_no}`}
                                              >
                                                {isLoadingImage ? (
                                                  <>
                                                    <img
                                                      // src={"https://via.placeholder.com/300x200/f0f0f0"}
                                                      src={Placeholder_view}
                                                      width={300}
                                                      height={200}
                                                      alt="categories-img-placeholder"
                                                    />
                                                  </>
                                                ) : (
                                                  <>
                                                    <img
                                                      className="product__card--thumbnail__img product__primary--img"
                                                      src={e?.images[0]?.image}
                                                      alt="product-img"
                                                    />
                                                    <img
                                                      className="product__card--thumbnail__img product__secondary--img"
                                                      src={e?.images[1]?.image}
                                                      alt="product-img"
                                                    />
                                                  </>
                                                )}
                                              </a>
                                              {e?.discount && (
                                                <span className="product__badge">
                                                  {e?.discount}%
                                                </span>
                                              )}
                                              {e?.is_tranding === 1 && (
                                                <span className="product__badge_tranding">
                                                  Tranding
                                                </span>
                                              )}

                                            </div>
                                            <div className="product__card--content">
                                              <ul className="rating product__card--rating d-flex">
                                                <li className="rating__list">
                                                  <span className="rating__icon mt-2">
                                                    {e?.average_rating ===
                                                      0 && (
                                                        <>
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                        </>
                                                      )}
                                                    {e?.average_rating ===
                                                      1 && (
                                                        <>
                                                          <AiFillStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                        </>
                                                      )}
                                                    {e?.average_rating ===
                                                      2 && (
                                                        <>
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                        </>
                                                      )}
                                                    {e?.average_rating ===
                                                      3 && (
                                                        <>
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiOutlineStar />
                                                          <AiOutlineStar />
                                                        </>
                                                      )}
                                                    {e?.average_rating ===
                                                      4 && (
                                                        <>
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiOutlineStar />
                                                        </>
                                                      )}
                                                    {e?.average_rating ===
                                                      5 && (
                                                        <>
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                          <AiFillStar />
                                                        </>
                                                      )}
                                                  </span>
                                                </li>
                                                <span>({e?.review_count})</span>
                                              </ul>
                                              <h3 className="product_name">
                                                <a
                                                  href={`/productsdetail/${e?.id}`}
                                                  title={e?.name}
                                                >
                                                  {e?.name}
                                                </a>
                                              </h3>
                                              <div className="product__card--price">
                                                {e?.selling_price && (
                                                  <span className="current__price">
                                                    ₹{e?.selling_price}/-
                                                  </span>
                                                )}
                                                <span className="old__price">
                                                  ₹{e?.original_price}/-
                                                </span>
                                                {e?.discount && (
                                                  <span className="product-discount">
                                                    ({e?.discount}% OFF)
                                                  </span>
                                                )}
                                              </div>
                                              <div className="product__card--footer">
                                                {e?.out_of_stock === 1 ? (
                                                  <a
                                                    className="product__card--btn primary__btn"
                                                    href={`/productsdetail/${e?.id}`}
                                                  >
                                                    Out Of Stock
                                                  </a>
                                                ) : (
                                                  <a
                                                    className="product__card--btn primary__btn"
                                                    href={`/productsdetail/${e?.part_no}`}
                                                  >
                                                    View to Details
                                                  </a>
                                                )}
                                              </div>
                                            </div>
                                          </article>
                                        </motion.div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="tab_pane active">
                            <div className="product__section--inner product__section--style3__inner">
                              <div className="row row-cols-1 mb--n30">
                                {currentItems &&
                                  currentItems?.map((e, index) => {
                                    return (
                                      <motion.div
                                        className="box col mb-30" key={index}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          duration: 0.8,
                                          delay: 0.5,
                                          ease: [0, 0.71, 0.2, 1.01],
                                        }}
                                      >
                                        <div className="product__card product__list d-flex align-items-center">
                                          <div className="product__card--thumbnail product__list--thumbnail">
                                            <a
                                              className="product__card--thumbnail__link display-block"
                                              href={`/productsdetail/${e?.part_no}`}
                                            >
                                              {isLoadingImage ? (
                                                <>
                                                  <img
                                                    src={Placeholder_view}
                                                    width={300}
                                                    height={200}
                                                    alt="categories-img-placeholder"
                                                  />
                                                </>
                                              ) : (
                                                <>
                                                  <img
                                                    className="product__card--thumbnail__img product__primary--img"
                                                    src={e?.images[0]?.image}
                                                    alt="product-img"
                                                  />
                                                </>
                                              )}
                                              <img
                                                className="product__card--thumbnail__img product__secondary--img"
                                                src={e?.images[1]?.image}
                                                alt="product-img"
                                              />
                                            </a>
                                            {e?.discount && (
                                              <span className="product__badge">
                                                {e?.discount}%
                                              </span>
                                            )}
                                            {e?.is_tranding === 1 && (
                                              <span className="product__badge_tranding">
                                                Tranding
                                              </span>
                                            )}

                                          </div>
                                          <div className="product__card--content product__list--content">
                                            <h3 className="product__card--title">
                                              {e?.name}
                                            </h3>
                                            <ul className="rating product__card--rating d-flex">
                                              <li className="rating__list">
                                                <span className="rating__icon">
                                                  {e?.average_rating === 0 && (
                                                    <>
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                    </>
                                                  )}
                                                  {e?.average_rating === 1 && (
                                                    <>
                                                      <AiFillStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                    </>
                                                  )}
                                                  {e?.average_rating === 2 && (
                                                    <>
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                    </>
                                                  )}
                                                  {e?.average_rating === 3 && (
                                                    <>
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiOutlineStar />
                                                      <AiOutlineStar />
                                                    </>
                                                  )}
                                                  {e?.average_rating === 4 && (
                                                    <>
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiOutlineStar />
                                                    </>
                                                  )}
                                                  {e?.average_rating === 5 && (
                                                    <>
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                      <AiFillStar />
                                                    </>
                                                  )}
                                                </span>
                                              </li>

                                              <li>
                                                <span className="rating__review--text">
                                                  ({e?.review_count})Review
                                                </span>
                                              </li>
                                            </ul>
                                            <div className="product__list--price">
                                              {e?.selling_price && (
                                                <span
                                                  className="current__price"
                                                  style={{
                                                    paddingRight: "5px",
                                                  }}
                                                >
                                                  {e?.selling_price}/-
                                                </span>
                                              )}
                                              <span className=" old__price">
                                                {e?.original_price}/-
                                              </span>
                                              {e?.discount && (
                                                <span className="product-discount">
                                                  ({e?.discount}% OFF)
                                                </span>
                                              )}
                                            </div>
                                            {e?.out_of_stock === 1 ? (
                                              <a
                                                className="product__card--btn primary__btn"
                                                href={`/productsdetail/${e?.id}`}
                                              >
                                                Out Of Stock
                                              </a>
                                            ) : (
                                              <a
                                                className="product__card--btn primary__btn"
                                                href={`/productsdetail/${e?.part_no}`}
                                              >
                                                View to Details
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {
                      add_product?.length <= 0 &&
                      // <p className="mt-5 text-center">No data Found</p>
                      <div className="">
                        <img
                          src={NoData}
                          alt=""
                          className="d-block mx-auto align-bottom"
                          style={{ marginTop: "30px", width: "50%" }}
                        />
                        <p
                          className="mt-5 text-center text-danger"
                          style={{ fontWeight: "700", fontSize: "24px" }}
                        >
                          Data Not Found!
                        </p>
                      </div>
                    }
                    {
                      add_product?.length > 0 &&
                      <div className="pagination__area">
                        <ul className="pagination__wrapper d-flex align-items-center justify-content-center">
                          <li className="pagination__list">
                            <Pagination
                              count={totalPages}
                              page={currentPage}
                              onChange={handlePageChange}
                              renderItem={(item) => (
                                <PaginationItem
                                  component="button"
                                  onClick={() =>
                                    handlePageChange(null, item.page)
                                  }
                                  {...item}
                                />
                              )}
                            />
                          </li>
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bla bla bla"
          style={{ overflowY: "scroll" }}
        >
          <div className="single__widget price__filter widget__bg ">
            <div className="d-flex justify-content-between">
              <h2>Filters</h2>
              <a
                onClick={handleReset}
                className="ms-5 mt-1"
                style={{ textDecoration: "underline", color: "red" }}
              >
                Reset
              </a>
            </div>
            <hr />
            <div>
              <h3>Brand</h3>
              {displayedBrands?.map((e, index) => {
                return (
                  <div
                    key={index}
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={e?.id}
                        onChange={handleChecked}
                      />
                      &nbsp;&nbsp;
                      <p className="mt-1">
                        {e?.name}&nbsp;({e?.product_count})
                      </p>
                    </div>
                  </div>
                );
              })}
              {remainingItemCount > 0 && (
                <span
                  onClick={handleLoadMore}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#f1696d",
                    color: "white",
                    border: 0,
                    cursor: "pointer",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  +{remainingItemCount} More
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <h3 className="mt-1">Vehicle</h3>
                {/* <a onClick={handleReset} style={{ color: "#12477a" }}>
                  Reset
                </a> */}
              </div>
              <div className="mt-3 mb-3">
                <select
                  className="vehicle_select_model"
                  onChange={handlecarNameChange}
                >
                  <option selected value={""}>
                    Choose Car Maker
                  </option>
                  {carName.map((e, index) => {
                    return (
                      <option value={e?.id} key={index}>
                        {e?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ marginBottom: "100px" }}>
              <h3 className="mt-4">Price</h3>
              <div className="form_filter">
                <label>
                  From
                  <input
                    type="number"
                    placeholder="0"
                    value={Stprice}
                    onChange={(e) => setStPrice(e.target.value)}
                  />
                </label>
                <label>
                  To
                  <input
                    type="number"
                    placeholder="250"
                    value={endPrice}
                    onChange={(e) => setEndPrice(e.target.value)}
                  />
                </label>
              </div>
              <div className="form_filter_btn">
                <button>Filter</button>
              </div>
            </form>
          </div>
        </Drawer>
      </main>
    </div>
  );
};

export default ProductsView;
