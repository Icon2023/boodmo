import React, { useEffect, useState } from "react";
import { BrandProduct, BrandWiseFilter, Brands, Product } from "../Services/apiServices";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillStar, AiOutlineFilter, AiOutlineStar } from "react-icons/ai";
import { addProducts, removeFilter } from "../store/reducers/ProductSlice";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pagination, PaginationItem } from '@mui/material';
import Placeholder_view from "../images/Placeholder_view_vector.svg";

const BrandProductsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [seletedBand, setSeletedBand] = useState([]);
  const [BandWise, setBandWise] = useState(null);

  const [brands, setBrands] = useState([]);

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

  // const [brands, setBrands] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);



  // Calculate the indexes of the items to show on the current page.
  const totalPages = Math.ceil(add_product.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = add_product.slice(
      indexOfFirstItem,
      indexOfLastItem
  );

  const handlePageChange = (event, pageNumber) => {
      window.scrollTo(0, 0);
      setCurrentPage(pageNumber);
  };
  const handleGridClick = () => {
      gridOpen ? setTrifOpen(false) : setGridOpen(true)
      localStorage.setItem('grid', gridOpen);
      localStorage.removeItem('list', trifOpen);
  }
  const handleTfiClick = () => {
      gridOpen ? setGridOpen(false) : setTrifOpen(true)
      localStorage.setItem('list', trifOpen);
      localStorage.removeItem('grid', gridOpen);
  }
  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }
  const handleLoad = () => {
      isMore === true ? setIsMore(false) : setIsMore(true)
  }
  const handleReset = () => {
      window.location.reload();
      dispatch(removeFilter())
  }

  const sortClick = (val1) => {
      let data = {
          category: cate_id,
          sub_category: subcategory,
          sort_by: val1.split(",")[0],
          sort_action: val1.split(",")[1],
          brand: selectedValues.join(',')
      }
      Product(data).then((res) => {
          if (res.success) {
              dispatch(addProducts(res?.data))
          }
      })
  }

  const handleChecked = (e) => {
      const value = e.target.value;
      if (selectedValues.includes(value)) {
          setSelectedValues(selectedValues.filter((item) => item !== value));
      } else {
          setSelectedValues([...selectedValues, value]);
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      const price = {
          category: cate_id,
          sub_category: subcategory,
          price_start: Stprice,
          price_end: endPrice,
          brand: selectedValues.join(',')
      }
      Product(price).then((res) => {
          if (res.success) {
              dispatch(addProducts(res?.data))
              console.log(res?.data);
          }
      })
  }

  useEffect(() => {
    BrandWiseFilter(id).then((res) => {
        console.log(";;;;;;;",res?.data);
        setBandWise(res?.data)
        
    });
}, [])



  useEffect(() => {
    const lists = localStorage.getItem('list');
    const grids = localStorage.getItem('grid');

    const storedSelectedValues = JSON.parse(localStorage.getItem('selectedValues'));
    if (storedSelectedValues) {
        setSelectedValues(storedSelectedValues);
    }
    console.log('Selected Values:', storedSelectedValues); // Add this line for debugging
    console.log("ss",selectedValues );

    if (lists) {
        setGridOpen(false)
        setTrifOpen(true)
    }
    if (grids) {
        setGridOpen(true)
        setTrifOpen(false)
    }
    if (filter_multi.length < 1) {
        const data = {
            category: cate_id,
            sub_category: subcategory
        }
        Product(data).then((res) => {
            if (res.success) {
                setIsLoadingImage(false)
                dispatch(addProducts(res?.data))
            }
        }).catch(()=>{
            setIsLoadingImage(true)
        })

    } else {
        const filter = {
            category: filter_multi?.category,
            sub_category: filter_multi?.sub_category,
            car_company_id: filter_multi?.car_company_id,
            car_company_model_id: filter_multi?.car_company_model_id,
            car_company_year_id: filter_multi?.car_company_year_id,
            car_company_year_modi_id: filter_multi?.car_company_year_modi_id
        }
        Product(filter).then((res) => {
            if (res.success) {
                dispatch(addProducts(res?.data))
            }
        })
    }
    Brands()
        .then((res) => {
            setBrands(res?.data);
        })
        .catch((err) => {
            console.log(err);
        });

}, [])


  useEffect(() => {
    BrandProduct(id)
      .then((res) => {
        console.log(res);
        // if (res.success) {
         setIsLoadingImage(false);
        //  dispatch(addSingleCategory(res?.data));
        console.log("brand", res);
        setSeletedBand(res?.data);
        // }
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingImage(true);
      });
  }, []);
  return (
    <div style={{ marginTop: "200px" }}>
      {seletedBand?.map((e, index) => {
        return (
          <>
            <p>{e?.brand_id}</p>
            <p>{e?.desc}</p>
            <p>{e?.brand?.name}</p>
            
          </>
        );
      })}



<div className="shop__section section--padding">
              <div className="container">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 shop-col-width-lg-4">
                    <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                      {/* <div className="single__widget price__filter widget__bg">
                        <div className="d-flex">
                          <h2 className="">Filters</h2>
                          <a
                            onClick={handleReset}
                            className="ms-5 mt-1"
                            style={{
                              textDecoration: "underline",
                              color: "red",
                            }}
                          >
                            Reset
                          </a>
                        </div>
                        <hr />
                        <form onSubmit={handleSubmit}>
                          <div>
                            <h3>Brand</h3>
                            {isMore ? (
                              <>
                                {brands?.map((e, index) => {
                                  return (
                                    <div className="d-flex" key={index}>
                                      <input
                                        type="checkbox"
                                        value={e?.id}
                                        onChange={handleChecked}
                                      />
                                      &nbsp;&nbsp;
                                      <p className="mt-1">
                                        {e?.name}&nbsp;({e?.product_count})
                                      </p>
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                <div className="d-flex">
                                  <input
                                    type="checkbox"
                                    value={brands[0]?.id}
                                    onChange={handleChecked}
                                  />
                                  &nbsp;&nbsp;
                                  <p className="mt-1">
                                    {brands[0]?.name}&nbsp;(
                                    {brands[0]?.product_count})
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <input
                                    type="checkbox"
                                    value={brands[1]?.id}
                                    onChange={handleChecked}
                                  />
                                  &nbsp;&nbsp;
                                  <p className="mt-1">
                                    {brands[1]?.name}&nbsp;(
                                    {brands[1]?.product_count})
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <input
                                    type="checkbox"
                                    value={brands[2]?.id}
                                    onChange={handleChecked}
                                  />
                                  &nbsp;&nbsp;
                                  <p className="mt-1">
                                    {brands[2]?.name}&nbsp;(
                                    {brands[2]?.product_count})
                                  </p>
                                </div>
                              </>
                            )}
                            {isMore == false ? (
                              <a
                                onClick={handleLoad}
                                style={{ fontWeight: "bold" }}
                              >
                                +{brands?.length} More
                              </a>
                            ) : (
                              <a
                                onClick={handleLoad}
                                style={{ fontWeight: "bold" }}
                              >
                                Less
                              </a>
                            )}
                          </div>
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
                      </div> */}
                      <div className="single__widget widget__bg">
                        <h2 className="widget__title h3">Categories</h2>
                        <ul
                          className="widget__categories--menu"
                          style={{ height: "70vh", overflowY: "scroll" }}
                        >
                          {category_list.map((e, index) => {
                            return (
                              <>
                                <Accordion
                                  expanded={expanded === e?.id}
                                  onChange={handleChange(e?.id)}
                                  key={index}
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
                              </>
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
                                  className="product__view--select"
                                  onChange={(e) => sortClick(e.target.value)}
                                >
                                  <option selected="" value={"price, ASC"}>
                                    Sort by Populity
                                  </option>
                                  <option value={"price, ASC"}>
                                    LOW TO HIGH
                                  </option>
                                  <option value={"price, DESC"}>
                                    HIGH TO LOW
                                  </option>
                                  <option value={"latest, ASC"}>
                                    OLD TO NEW
                                  </option>
                                  <option value={"latest, DESC"}>
                                    NEW TO OLD
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="product__view--mode__list">
                              <div className="product__tab--one product__grid--column__buttons d-flex justify-content-center">
                                <button
                                  className={`product__grid--column__buttons--icons ${
                                    gridOpen == true ? "active" : ""
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
                                  className={`product__grid--column__buttons--icons ${
                                    gridOpen == true ? "" : "active"
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
                            Showing 1 of {add_product.length} results
                          </p>
                        </div>
                        <div className="tab_content">
                              <div className="tab_pane active">
                                <div className="product__section--inner product__section--style3__inner">
                                  <div className="row row-cols-1 mb--n30">
                                    {/* {seletedBand?.map((e, index) => { */}
                                    {BandWise?.map((e, index) => {
                                      return (
                                        <>
                                          <div
                                            className="col mb-30"
                                            key={index}
                                          >
                                            <div className="product__card product__list d-flex align-items-center">
                                              <div className="product__card--thumbnail product__list--thumbnail">
                                                <a
                                                  className="product__card--thumbnail__link display-block"
                                                  href={`/productsdetail/${e?.id}`}
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
                                                        src={
                                                          e?.images[0]?.image
                                                        }
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
                                              <div className="product__card--content product__list--content">
                                                <h3 className="product__card--title">
                                                  <a href="/">{e?.name}</a>
                                                </h3>
                                                <ul className="rating product__card--rating d-flex">
                                                  <li className="rating__list">
                                                    <span className="rating__icon">
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
                                                    href={`/productsdetail/${e?.id}`}
                                                  >
                                                    View to Details
                                                  </a>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                           
                        </div>

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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default BrandProductsView;
