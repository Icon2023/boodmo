import React, { useEffect, useState } from "react";
import Products from '../Products.json';
import { BsShop } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { MdAutoMode, MdElectricBike } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";



const MarketPlace = () => {
    const [scroll, setScroll] = useState(false);
    const [gridOpen, setGridOpen] = useState(true);
    const [trifOpen, setTrifOpen] = useState(true);

    useEffect(() => {
        const changeNavbarBg = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", changeNavbarBg);

        return () => {
            window.removeEventListener("scroll", changeNavbarBg);
        };
    }, []);

    useEffect(() => {
        const lists = localStorage.getItem('AUTO');
        const grids = localStorage.getItem('CAR');
        if (lists) {
            setGridOpen(true)
            setTrifOpen(false)
        }
        if (grids) {
            setGridOpen(false)
            setTrifOpen(true)
        }
        window.scrollTo(0, 0);

    }, [])

    const handleClick = () => {
        gridOpen ? setTrifOpen(false) : setGridOpen(true)
        localStorage.setItem('AUTO', gridOpen);
        localStorage.removeItem('CAR', trifOpen);
    }

    const handleClick1 = () => {
        gridOpen ? setGridOpen(false) : setTrifOpen(true)
        localStorage.setItem('CAR', trifOpen);
        localStorage.removeItem('AUTO', gridOpen);
    }

    return (
        <>
            <div className="wrapper">
                <div className={`${scroll ? "header__sidebar " : "sidebar_marketplace"}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Market Place</h2>
                        <IoSettingsSharp style={{ fontSize: "24px" }} />
                    </div>
                    <hr />
                    <div className={` ${gridOpen === true ? 'auto_part_btn_selected' : 'auto_part_btn'}`} onClick={handleClick}>
                        <BsShop style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Auto Parts</p>
                    </div>
                    <div className={` ${gridOpen === true ? 'auto_part_btn' : 'auto_part_btn_selected'}`} onClick={handleClick1}>
                        <FaCarSide style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Cars</p>
                    </div>
                    <div className="auto_part_btn">
                        <MdAutoMode style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Coming Soon</p>
                    </div>
                    <div className="auto_part_btn">
                        <MdElectricBike style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Coming Soon</p>
                    </div>
                    <div className="new_add_products">
                        <p style={{ textAlign: "center", color: "#363062", fontWeight: "bold" }}>+ Create a new listing</p>
                    </div>
                    <hr />
                    <h3>Filter</h3>
                    <p>Surat within 65 kms</p>
                    <hr />
                    <h3>Sub Category</h3>
                    <div className="auto_part_btn">
                        <MdAutoMode style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Coming Soon</p>
                    </div>
                    <div className="auto_part_btn">
                        <MdElectricBike style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Coming Soon</p>
                    </div>
                    <div className="auto_part_btn">
                        <MdElectricBike style={{ fontSize: "28px" }} />
                        <p style={{ fontSize: "20px", paddingLeft: "8px" }}>Coming Soon</p>
                    </div>
                </div>
                <div className="main_market">
                    <aside className="mobile_sidebar">
                        <div className=" d-flex gap-5">
                            <div className={` ${gridOpen === true ? 'auto_part_btn_selected' : 'auto_part_btn'}`} onClick={handleClick}>
                                <BsShop style={{ fontSize: "20px" }} />
                                <p style={{ fontSize: "18px", paddingLeft: "8px" }}>Auto Parts</p>
                            </div>
                            <div className={` ${gridOpen === true ? ' auto_part_btn' : 'auto_part_btn_selected'}`} onClick={handleClick1}>
                                <FaCarSide style={{ fontSize: "20px" }} />
                                <p style={{ fontSize: "18px", paddingLeft: "8px" }}>Cars</p>
                            </div>

                        </div>
                    </aside>
                    <h2 style={{ color: "#363062" }} className="mt-3">Our Products</h2>
                    {
                        gridOpen ?
                            <div className="row card_hover" >
                                {
                                    Products?.autopart?.map((e, index) => {
                                        return (
                                            <a href={`market-places/auto/${e?.id}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 px-2" key={index}>
                                                <div className="pro_card">
                                                    <a href={`market-places/auto/${e?.id}`}>
                                                        <img src={e.image} />
                                                    </a>
                                                    <hr />
                                                    <h2 className="ps-3 categories__content--title" >
                                                        {e.title}
                                                    </h2>
                                                    <p className="ps-3 categories__content--subtitle">
                                                        {e.desc}
                                                    </p>
                                                    <button>
                                                        <a href={`market-places/auto/${e?.id}`} style={{ color: "white" }}>
                                                            View Product
                                                        </a>
                                                    </button>
                                                </div>
                                            </a>
                                        );
                                    })
                                }
                            </div> :
                            <div className="row card_hover">
                                {
                                    Products?.car?.map((e, index) => {
                                        return (
                                            <a href={`market-places/car/${e?.id}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 px-2" key={index}>
                                                <div className="pro_card">
                                                    <img src={e.image} />
                                                    <hr />
                                                    <h2 className="ps-3 categories__content--title" >{e.title}</h2>
                                                    <p className="ps-3 categories__content--subtitle"> {e.desc}</p>
                                                    <button>
                                                        <a href={`market-places/car/${e?.id}`} style={{ color: "white" }}>
                                                            Buy Now
                                                        </a>
                                                    </button>
                                                </div>
                                            </a>
                                        );
                                    })
                                }

                            </div>
                    }
                </div>
            </div >
        </>
    );
};

export default MarketPlace;
