import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchProduct } from '../Services/apiServices';

const SearchBar = () => {
    const { pn } = useParams();
    const navigate = useNavigate();
    const [searchpart, setSearchPart] = useState('');

    useEffect(() => {
        SearchProduct(pn).then((res) => {
            setSearchPart(res?.data)
            // if (res?.status) {
            //     console.log(res?.data);
            // }else{
            //     navigate('*')
            // }
        })
    }, [])
    return (
        <div className='container' style={{ paddingTop: "200px" }}>
            <div className='row search_model'>
                <div className="col-md-4">
                    <div className="">
                        <img src="https://boodmo.com/media/cache/catalog_part/images/parts/d83f6e7a7da290b1aa8a50c5699d9d16.webp" alt="" width={350} />
                    </div>
                </div>
                <div className="col-md-6">
                    <p style={{ fontSize: "24px", color: "#12477a" }}>{searchpart?.part_name}</p>
                    <p>Part Name:- {searchpart?.pn}</p>
                    <p>₹ {searchpart?.price}/-</p>
                    <button>View Details</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar