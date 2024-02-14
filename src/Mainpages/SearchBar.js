import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchProduct } from '../Services/apiServices';

const SearchBar = () => {
    const { pn } = useParams();
    const navigate = useNavigate();
    const [searchpart, setSearchPart] = useState([]);

    useEffect(() => {
        SearchProduct(pn).then((res) => {
            if (res?.success) {
                setSearchPart(res?.data)
                console.log(res);
            } else {
                navigate('*')
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
                    <div className="row">
                        <div className="col">
                            <div className="breadcrumb__content text-center">
                                <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                    <li className="breadcrumb__content--menu__items">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb__content--menu__items">
                                        <span>Search</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex mt-5 gap-3'>
                        {
                            searchpart?.map((e, index) => {
                                return (
                                    <div className='search_model' key={index}>
                                        <p style={{ fontSize: "24px", color: "#12477a" }}>{e?.name}</p>
                                        <p>Part Name:- {e?.pn}</p>
                                        <p>Dec:- {e?.part_name}</p>
                                        <p>₹ {e?.price}/-</p>
                                        <button onClick={() => handleClick(e?.pn)}>View Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SearchBar