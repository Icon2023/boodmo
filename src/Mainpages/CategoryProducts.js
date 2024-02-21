import React, { useEffect, useState } from "react";
import { CategoryProduct } from "../Services/apiServices";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSingleCategory } from "../store/reducers/ProductSlice";
import Drawer from "react-modern-drawer";
import coming from "../images/comingsoon-removebg-preview.png";
import { BiCategory } from "react-icons/bi";
import { motion } from "framer-motion";

//matrial ui
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShippingAddress from "../Subpages/ShippingAddress";
import Placeholder_view from "../images/Placeholder_view_vector.svg";
import Breadcrumb from "../Utils/breadcrumb";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const { single_category, category_list } = useSelector((state) => ({ ...state.products }));
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    CategoryProduct(id).then((res) => {
      if (res.success) {
        setIsLoadingImage(false);
        dispatch(addSingleCategory(res?.data));
      }
    }).catch((e) => {
      console.log(e);
      setIsLoadingImage(true);

    })
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <main className="margin_top_all">
        <Breadcrumb
          subTitle2="Category"
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
        />
        {/* Start shop section */}
        <div className="shop__section section--padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 shop-col-width-lg-4">
                <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Categories</h2>
                    <ul
                      className="widget__categories--menu"
                      style={{ height: "80vh", overflowY: "scroll" }}
                    >
                      {category_list?.map((e, index) => {
                        return (
                          <div key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
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
                            </motion.div>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 shop-col-width-lg-8">
                <div className="shop__right--sidebar">
                  {/* Start categories section */}
                  <div className="categories__shop mb-50">
                    <div className="section__heading border-bottom mb-30 d-flex align-items-center">
                      <h2 className="section__heading--maintitle">
                        Shop By <span>Categories</span>
                      </h2>
                      <button className="filter_btn" onClick={toggleDrawer}>
                        Filter
                      </button>
                    </div>
                    <ul className="categories__shop--inner">
                      {single_category.length > 0 ? (
                        <>
                          {single_category?.map((e, index) => {
                            return (
                              <li
                                className="categories__shop--card"
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
                                  <a
                                    className="categories__shop--card__link"
                                    href={`/shop/${id}/${e?.id}`}
                                  >
                                    <div className="categories__thumbnail new_img_height">
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
                                            className="categories__thumbnail--img"
                                            src={e?.image}
                                            alt="categories-img"
                                          />
                                        </>
                                      )}
                                    </div>
                                    <div className="categories__content">
                                      <h2 className="categories__content--title">
                                        {e?.name}
                                      </h2>
                                    </div>
                                  </a>
                                </motion.div>
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <div
                            style={{ marginTop: "100px", textAlign: "center" }}
                          >
                            <img
                              src={coming}
                              alt=""
                              srcset=""
                              style={{ width: "50%", borderRadius: "10px" }}
                            />
                          </div>
                        </>
                      )}
                    </ul>
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
        >
          <ul
            className="widget__categories--menu"
            style={{ height: "100vh", overflowY: "scroll" }}
          >
            {category_list.map((e, index) => {
              return (
                <div key={index}>
                  <Accordion
                    expanded={expanded === e?.id}
                    onChange={handleChange(e?.id)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon style={{ fontSize: "28px" }} />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
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
        </Drawer>
        <ShippingAddress />
      </main>
    </>
  );
};

export default CategoryProducts;