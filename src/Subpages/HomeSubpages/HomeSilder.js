import React, { useEffect, useState } from "react";
import {
  CarCompines,
  CarModefication,
  CarModel,
  CarYear,
  CategoryProduct,
} from "../../Services/apiServices";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilterDetail,
  addSingleCategory,
} from "../../store/reducers/ProductSlice";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HomeSilder = () => {
  const { category_list, single_category } = useSelector((state) => ({
    ...state.products,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cateId, setCateId] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const [carName, setCarName] = useState([]);
  const [carValName, setCarValName] = useState("");

  const [carModel, setCarModel] = useState([]);
  const [carValModel, setCarValModel] = useState("");

  const [carYear, setCarYear] = useState([]);
  const [carValYear, setCarValYear] = useState("");

  const [carModei, setCarModei] = useState([]);
  const [carValModei, setValModei] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    CarCompines().then((res) => {
      setCarName(res?.data);
    });
  }, []);

  useEffect(() => {
    if (cateId) {
      CategoryProduct(cateId)
        .then((res) => {
          if (res.success) {
            dispatch(addSingleCategory(res?.data));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [cateId]);

  const handleChange = (e) => {
    setCarValName(e.target.value);
    CarModel(e.target.value).then((res) => {
      setCarModel(res?.data);
    });
  };

  const handleChange1 = (e) => {
    setCarValModel(e.target.value);
    let val = e.target.value;
    setCarValYear(val);
    CarYear({ carValName, val }).then((res) => {
      setCarYear(res?.data);
    });
  };

  const handleChange2 = (e) => {
    setValModei(e.target.value);
    let val = e.target.value;
    CarModefication({ carValName, carValYear, val }).then((res) => {
      setCarModei(res?.data);
    });
  };

  const handleClickOpen = (e) => {
    e.preventDefault();
    if (!carValModei) {
    } else {
      setOpen(true);
      console.log(cateId);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCateId("");
    window.location.reload();
  };

  const handleCateId = (id) => {
    setCateId(id);
    setIsOpen(false);
  };

  const handleMultiFilter = (subId) => {
    // let data = {
    //     category: cateId,
    //     sub_category: subId,
    //     car_company_id: carValName,
    //     car_company_model_id: carValModel,
    //     car_company_year_id: carValYear,
    //     car_company_year_modi_id: carValModei
    // }
    let data = {
      category: 1,
      sub_category: 3,
      car_company_id: 1,
      car_company_model_id: 6,
      car_company_year_id: 8,
      car_company_year_modi_id: 17,
    };
    dispatch(addFilterDetail(data));
    navigate(`/shop/${cateId}/${subId}`);
    window.location.reload();
  };

  return (
    <>
      <section className="hero__slider--section">
        <div className="slider__thumbnail--style5 position-relative">
          <img
            className="slider__thumbnail--img__style5"
            src="assets/img/slider/home5-slider-thumb.webp"
            alt="slider-img"
          />
          <div className="hero__content--style5 text-center">
            <h2 className="hero__content--style5__title h1">
              Comes Width The <br />
              <span className="text__secondary">Ultimate Protection</span>
            </h2>
          </div>
          {/* Start search filter area */}
          <div className="search__filter--section search__filter--style5">
            <div className="container">
              <div className="section__heading style2 text-center mb-30">
                <h2 className="section__heading--maintitle">
                  Search by Vehicle
                </h2>
                <p className="section__heading--desc">
                  Filter your results by entering your Vehicle to ensure you
                  find the parts that fit.
                </p>
                {/* <div className='vehicle_btn'>
                  <input type="text" placeholder='MH05HK1789' value={number} maxLength={10} onChange={(e) => setNumber(e.target.value.toUpperCase())} />
                  <button><AiOutlineSearch /></button>
                </div> */}
              </div>
              <div className="search__filter--inner style5">
                <div className="search__filter--form__style2 d-flex">
                  <div className="search__filter--select select search__filter--width">
                    <select
                      className="search__filter--select__field"
                      onChange={handleChange}
                    >
                      <option selected="" value={0}>
                        Select Car Maker
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
                  <div className="search__filter--select select search__filter--width">
                    <select
                      className="search__filter--select__field"
                      disabled={carValName.length <= 0 ? true : false}
                      onChange={handleChange1}
                    >
                      <option selected="" value={0}>
                        Select Model
                      </option>
                      {carModel.map((e, index) => {
                        return (
                          <option value={e?.id} key={index}>
                            {e?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="search__filter--select select search__filter--width">
                    <select
                      className="search__filter--select__field"
                      disabled={carValModel.length <= 0 ? true : false}
                      onChange={handleChange2}
                    >
                      <option selected="" value={0}>
                        Choose Year
                      </option>
                      {carYear.map((e, index) => {
                        return (
                          <option value={e?.id} key={index}>
                            {e?.year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="search__filter--select select search__filter--width">
                    <select
                      className="search__filter--select__field"
                      disabled={carValModei.length <= 0 ? true : false}
                    >
                      <option selected="" value={0}>
                        Select className
                      </option>
                      {
                        carModei.map((e, index) => {
                          return (
                            <option value={e?.id} key={index}>
                              {e?.modification}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                  <div className="search__filter--width">
                    <button className="search__filter--btn primary__btn" onClick={handleClickOpen}>
                      Search Parts
                    </button>
                  </div>
                  {/* {
                    carModei.length > 0 ?
                      <div className="cat_top">
                        <a href="https://oriparts.com/?back_url_pn=https://bood.hypehy.com/" target="_blank">
                          <button className="catalog_btn">
                            OEM CATALOG
                          </button>
                        </a>
                      </div> : null
                  } */}
                  <div className="search__filter--width">
                    <a href="https://oriparts.com/?back_url_pn=https://autoholic.hypehy.com/" target="_blank">
                      <button className="search__filter--btn primary__btn">
                        OEM CATALOG
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="search_modal_box">
          <div className='model_box'>
            <div className='d-flex justify-content-between mb-4'>
              <h2>Search</h2>
              <div onClick={handleClose} style={{ cursor: "pointer" }}>
                <AiOutlineClose
                  size={"24px"}
                />
              </div>
            </div>
          </div>
          {isOpen ? (
            <>
              <div className="searchster-categories-grid">
                {category_list?.map((e, index) => {
                  return (
                    <div
                      className="searchster-categories-grid__item"
                      key={index}
                    >
                      <a
                        className="categories__card--link"
                        onClick={() => handleCateId(e?.id)}
                      >
                        <div className="mx-auto">
                          <img
                            className="searchster-categories-grid__item__images"
                            src={e?.image}
                            alt=""
                          />
                        </div>
                        <span className="searchster-categories-grid__item__name">
                          {e?.name}
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="searchster-categories-grid ">
                {single_category?.map((e, index) => {
                  return (
                    <>
                      <div
                        className="searchster-categories-grid__item ng-star-inserted"
                        key={index + 1}
                      >
                        <a
                          className="categories__card--link"
                          onClick={() => handleMultiFilter(e?.id)}
                        // href={`/shop/${cateId}/${e?.id}/${carValName}/${carValModel}/${carValYear}/${carValModei}`}
                        >
                          <div className="mx-auto">
                            <img
                              className="searchster-categories-grid__item__images"
                              src={e?.image}
                              alt=""
                            />
                          </div>
                          <span className="searchster-categories-grid__item__name">
                            {e?.name}
                          </span>
                        </a>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default HomeSilder;