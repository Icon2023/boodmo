import React, { useEffect, useState } from "react";
import {
  CarCompanies,
  CarModel,
  CarModelModification,
  CategoryProduct,
} from "../../Services/apiServices";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilterDetail,
  addSingleCategory,
} from "../../store/reducers/ProductSlice";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import Select from "react-select";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { sliderData } from "../../Utils/sliderData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

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

const styleOripart = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: '10px',
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

  const [selectedCarCompany, setSelectedCarCompany] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [selectedCarModification, setSelectedCarModification] = useState(null);

  const [carCompanies, setCarCompanies] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carModifications, setCarModifications] = useState([]);

  const [open, setOpen] = useState(false);
  const [number, setnumber] = useState("");
  const [openWindow, setopenWindow] = useState(false);

  var iframe = document.getElementsByClassName('redirect_link')
  // var iframeWindow = iframe.contentWindow;
  // var iframeUrl = iframeWindow.location.href;
  // console.log('URL of the iframe', iframeUrl);
  if (iframe) {
    // Get the contentWindow of the iframe
    var iframeWindow = iframe.contentWindow;

    // Check if the iframeWindow is not null
    if (iframeWindow) {
      // Get the URL from the iframe
      var iframeUrl = iframeWindow.location.href;

      console.log('URL of the iframe:', iframeUrl);
    } else {
      console.error('ContentWindow is null');
    }
  } else {
    console.error('Iframe not found');
  }


  useEffect(() => {
    CarCompanies().then((res) => {
      setCarCompanies(res?.data);
    });
  }, []);

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      border: "none",
      boxShadow: "none",
      borderRadius: "10px",

    }),
    placeholder: (provided) => ({
      ...provided,
      whiteSpace: "nowrap", // Prevent line breaks
      overflow: "hidden", // Hide overflow
      textOverflow: "ellipsis", // Add ellipsis (...) for long text
    }),
  };

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


  const handleCarCompanyChange = async (selectedOption) => {
    if (!selectedCarCompany || selectedOption.value !== selectedCarCompany.value){
      setSelectedCarCompany(selectedOption);
      try {
        // Fetch car models based on the selected car company
        const response = await CarModel(selectedOption.id);
        if (response.success && response.data) {
          // Assuming the data property contains the array of models
          setCarModels(response.data);
        } else {
          console.error("Invalid response format for car models:", response);
        }
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
      setSelectedCarModel(null); // Reset selected car model
      setSelectedCarModification(null); // Reset selected car modification
    }
  };

  const handleCarModelChange = async (selectedOption) => {
    if (!selectedCarModel || selectedOption.value !== selectedCarModel.value) {
      setSelectedCarModel(selectedOption);
      try {
        // Fetch car modifications based on the selected car model
        const response = await CarModelModification({
          carValName: selectedCarCompany.id,
          val: selectedOption.id,
        });

        console.log("CarModelModification Response:", response);

        if (response.success && response.data) {
          console.log("Modifications Data:", response.data);
          // Assuming the data property contains the array of modifications
          setCarModifications(response.data);
        } else {
          console.error(
            "Invalid response format for car modifications:",
            response
          );
        }
      } catch (error) {
        console.error("Error fetching car modifications:", error);
      }

      setSelectedCarModification(null); // Reset selected car modification
    }
  };

  const handleCarModificationChange = (selectedOption) => {
    setSelectedCarModification(selectedOption);
  };


  // const handleClickOpen = (e) => {
  //   e.preventDefault();
  //   if (!carValModei) {
  //   } else {
  //     setOpen(true);
  //     console.log(cateId);
  //   }
  // };

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

  const openBrowser = () => {
    setopenWindow(true)
  };

  const handleCloses = () => setopenWindow(false);

  return (
    <>
      <section className="hero__slider--section" style={{ marginTop: "85px" }}>
        <div className="hero__slider--inner hero__slider--activation swiper">
          <div className="hero__slider--wrapper swiper-wrapper">
            <Swiper
              className="mySwiper"
              spaceBetween={30}
              centeredSlides={true}
              loopAddBlankSlides={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {sliderData?.map((e, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide ">
                      <div className="hero__slider--items style4 slider4__items--bg1">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-7 col-md-7">
                              <div className="slider__content style4">
                                <span className="slider__subtitle style4">
                                  {e?.subtitle}
                                </span>
                                <h2 className="slider__maintitle style4 h1">
                                  {e?.mainTitle}
                                  <span className="text__secondary">
                                    Auto Parts
                                  </span>
                                </h2>
                                <p className="slider__desc style4">
                                  {e?.description}
                                </p>
                                <Link
                                  className="primary__btn slider__btn"
                                  to="/shop/1"
                                >
                                  Shop now
                                  <svg
                                    width={12}
                                    height={8}
                                    viewBox="0 0 12 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.8335 3.6178L8.26381 0.157332C8.21395 0.107774 8.1532 0.0681771 8.08544 0.0410843C8.01768 0.0139915 7.94441 0 7.87032 0C7.79624 0 7.72297 0.0139915 7.65521 0.0410843C7.58745 0.0681771 7.5267 0.107774 7.47684 0.157332C7.37199 0.262044 7.31393 0.39827 7.31393 0.539537C7.31393 0.680805 7.37199 0.817024 7.47684 0.921736L10.0943 3.45837H0.55625C0.405122 3.46829 0.26375 3.52959 0.160556 3.62994C0.057363 3.73029 0 3.86225 0 3.99929C0 4.13633 0.057363 4.26829 0.160556 4.36864C0.26375 4.46899 0.405122 4.53029 0.55625 4.54021H10.0927L7.47527 7.07826C7.37042 7.18298 7.31235 7.3192 7.31235 7.46047C7.31235 7.60174 7.37042 7.73796 7.47527 7.84267C7.52513 7.89223 7.58588 7.93182 7.65364 7.95892C7.7214 7.98601 7.79467 8 7.86875 8C7.94284 8 8.0161 7.98601 8.08386 7.95892C8.15162 7.93182 8.21238 7.89223 8.26223 7.84267L11.8335 4.38932C11.9406 4.28419 12 4.14649 12 4.00356C12 3.86063 11.9406 3.72293 11.8335 3.6178V3.6178Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hero__slider--layer__style4">
                          <img
                            className="slider__layer--img "
                            src={e?.bgImage}
                            alt="slider-img"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
      <div className="search__filter--section mt-5">
        <div className="container">
          <div className="section__heading style2 text-center mb-30">
            <h2 className="section__heading--maintitle">Search by Vehicle</h2>
            <p className="section__heading--desc">
              Filter your results by entering your vehicle to ensure you find
              the parts that fit.
            </p>
            <div className="number_plate">
              <div>
                <div className="vehicle_btn">
                  <div className="name_plateicon">
                    <div
                      className="d-flex"
                      style={{ flexDirection: "column", paddingTop: "10px" }}
                    >
                      <img
                        src="https://boodmo.com/assets/images/number-plate-icon.png"
                        className="ms-1"
                        alt=""
                        srcset=""
                      />
                      <span style={{ fontSize: "10px" }}>IND</span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="MH05HK1789"
                      value={number}
                      maxLength={10}
                      onChange={(e) => setnumber(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button>
                  <AiOutlineSearch style={{ fontSize: "24px" }} />
                </button>
              </div>
            </div>
          </div>
          <div className="search__filter--inner style5">
            <div className="testimonial-grid">
              <div className="testimonial" >
                <Select
                  value={selectedCarCompany}
                  styles={customStyles}
                  placeholder="Select Car Maker"
                  onChange={handleCarCompanyChange}
                  isSearchable={false}
                  autoFocus={true}
                  options={carCompanies.map((company) => ({
                    value: company.id,
                    label: company.name,
                    id: company.id,
                  }))}
                />
              </div>
              <div className="testimonial">
                <Select
                  value={selectedCarModel}
                  onChange={handleCarModelChange}
                  options={carModels.map((model) => ({
                    value: model.id,
                    label: model.name,
                    id: model.id,
                  }))}
                  isSearchable={false}
                  styles={customStyles}
                  autoFocus={true}
                  placeholder="Select Car Model"
                  isDisabled={!selectedCarCompany}
                />
              </div>
              <div className="testimonial">
                <Select
                  value={selectedCarModification}
                  onChange={handleCarModificationChange}
                  options={carModifications.map((modification) => ({
                    value: modification.id,
                    label: modification.modification,
                  }))}
                  placeholder="Select Car Modification"
                  autoFocus={true}
                  isSearchable={false}
                  styles={customStyles}
                  isDisabled={!selectedCarModel}
                />
              </div>
              <div className="testimonial">
                {/* <div className="d-flex flex-row"> */}
                {/* <button
                  className="search__filter--btn primary__btn w-100 mb-2"
                  onClick={handleClickOpen}
                >
                  SEARCH PARTS
                </button> */}
                {/* <a
                  href={`https://oriparts.com/${carValName}/${carValModel}/${carValModei}/?back_url_pn=https://mechx.hypehy.com/search/{pn}`}
                  target="_blank"
                  className="w-100"
                >
                </a> */}
                <button className="search__filter--btn primary__btn w-100" onClick={openBrowser}>
                  OEM CATALOG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="search_modal_box">
          <div className="model_box">
            <div className="d-flex justify-content-between mb-4">
              <h2>Search</h2>
              <div onClick={handleClose} style={{ cursor: "pointer" }}>
                <AiOutlineClose size={"24px"} />
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

      <Modal
        open={openWindow}
        onClose={handleCloses}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOripart}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <iframe
              id="ori_part"
              // src={`https://oriparts.com/${carValName}/${carValModel}/${carValModei}/?back_url_pn=https://boodmo.com/search/{pn}`}
              title="External Page"
              width="100%"
              height="800px"
              className="redirect_link"
            ></iframe>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default HomeSilder;
