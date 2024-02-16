import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchProduct } from '../Services/apiServices';
import Breadcrumb from '../Utils/breadcrumb';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    const { pn } = useParams();
    const navigate = useNavigate();
    const [searchpart, setSearchPart] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        SearchProduct(pn).then((res) => {
            if (res?.success) {
                setSearchPart(res?.data)

            } else {
                setError(res?.message)
            }
        })
    }, [])

    const handleClick = (part_no) => {
        navigate(`/productsdetail/${part_no}`)
    }

    return (
        <main className="margin_top_all">
            <section className="breadcrumb__section">
                <div className="container">
                    <Breadcrumb
                        subTitle2="Search"
                        icon2={
                            <CiSearch
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
                    <div className='mt-4 mb-4'>
                        {/* {
                            searchpart?.map((e, index) => {
                                return (
                                    <div className='search_model'>
                                        <div>
                                            <img src="https://avatars.mds.yandex.net/get-altay/2776652/2a00000172e6dcd69e9339e08da164431209/XXL" alt="" />
                                        </div>
                                        <div className='mt-1' key={index}>
                                            <p style={{ fontSize: "24px", color: "#12477a" }}>{e?.part_name}</p>
                                            <p>Part Number:- {e?.pn}</p>
                                            <p>₹ {e?.price}/-</p>
                                            <button onClick={() => handleClick(e?.pn)}>View Details</button>
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                        <div className="row card_hover" >
                            {
                                searchpart?.map((e, index) => {
                                    return (
                                        <a href={`/productsdetail/${e?.pn}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 px-2" key={index}>
                                            <div className="pro_card">
                                                <img src="https://avatars.mds.yandex.net/get-altay/2776652/2a00000172e6dcd69e9339e08da164431209/XXL" alt="" />
                                                <hr />
                                                <h2 className="ps-3 categories__content--title" >
                                                    {e?.part_name}
                                                </h2>
                                                <p className="ps-3 categories__content--subtitle">
                                                    Part Number:- {e?.pn}
                                                </p>
                                                <button onClick={() => handleClick(e?.pn)}>
                                                    Buy Now
                                                </button>
                                            </div>
                                        </a>
                                    );
                                })
                            }
                        </div>
                        <p>{error}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SearchBar