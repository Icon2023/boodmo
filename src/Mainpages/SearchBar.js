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
                console.log(res?.data);

            } else {
                setError(res?.message)
            }
        })
        window.scrollTo(0, 0);
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
                        <div className="row card_hover" >
                            {
                                searchpart?.map((e, index) => {
                                    return (
                                        <a href={`/productsdetail/${e?.pn}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 px-2" key={index}>
                                            <div className="pro_card">
                                                {
                                                    e?.image ?
                                                        <img src={e?.image} alt="" />
                                                        :
                                                        <img src="https://pngimg.com/uploads/gear/gear_PNG56.png" alt="" />
                                                }
                                                <hr />
                                                <h2 className="ps-3 categories__content--title" >
                                                    {e?.part_name}
                                                </h2>
                                                <p className="ps-3 categories__content--subtitle">
                                                    Part Number:- {e?.pn}
                                                </p>
                                                <button onClick={() => handleClick(e?.pn)}>
                                                    View Details
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