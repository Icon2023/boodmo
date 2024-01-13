import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchProduct } from '../Services/apiServices';

const SearchBar = () => {
    const { pn } = useParams();
    const navigate = useNavigate();
    const [searchpart, setSearchPart] = useState('');

    useEffect(() => {
        SearchProduct(pn).then((res) => {
            if (res?.success) {
                setSearchPart(res?.data)
            } else {
                navigate('*')
            }
        })
    }, [])

    const handleClick = (part_no) => {
        navigate(`/productsdetail/${part_no}`)
    }

    return (
        <div className='container' style={{ paddingTop: "200px" }}>
            <div className='row search_model'>
                <div className="col-md-4">
                    {
                        searchpart?.images &&
                        <img src={searchpart?.images[0].image} alt="" width={350} />
                    }
                </div>
                <div className="col-md-6">
                    <p style={{ fontSize: "24px", color: "#12477a" }}>{searchpart?.name}</p>
                    <p>Part Name:- {searchpart?.part_no}</p>
                    <p>₹ {searchpart?.original_price}/-</p>
                    <button onClick={() => handleClick(searchpart?.part_no)}>View Details</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar