import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CarModel } from '../Services/apiServices';

const CarMakerListAllProducts = () => {
    const { id, name } = useParams();

    const [makeList, setMakeList] = useState([]);

    useEffect(() => {
        CarModel(id).then((res) => {
            // console.log(res?.data);
            setMakeList(res?.data);
        });
    }, [])

    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <div className="container">
                    <h2 style={{ fontSize: "42px", color: "#12477a" }}>
                        {name}
                    </h2>
                    <div>
                        <h2 className='mt-5' style={{ fontSize: "30px", color: "#12477a" }}>Choose Your <span style={{ fontSize: "36px", color: "#59d8fd" }}>Model</span></h2>
                    </div>

                    <div className="row mt-5 mb-3">
                        {
                            makeList.map((e, index) => {
                                return (
                                    <>
                                        <div className="col-lg-3 col-md-4 col-6 mb-5" key={index}>
                                            <div className="car_box">
                                                <img src={e?.images} alt="" />
                                            </div>
                                            <div>
                                                <span style={{ color: "#12477a", fontWeight: "bold" }}>{name} {e?.name}</span>
                                                <p className='text-dark'>10.1990 - 05.2000</p>
                                                <p>
                                                    <select name="Select Your Car" className='car_select_model'>
                                                        <option value="Select Your Car">Select Your Car</option>
                                                        <option value="saab">Saab</option>
                                                        <option value="opel">Opel</option>
                                                        <option value="audi">Audi</option>
                                                    </select>
                                                </p>
                                            </div>

                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarMakerListAllProducts