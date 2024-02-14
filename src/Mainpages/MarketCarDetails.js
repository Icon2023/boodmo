import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Products from '../Products.json';
import { IoIosContact } from "react-icons/io";
import { AiFillMessage } from 'react-icons/ai';
import { IoChevronBackSharp } from "react-icons/io5";


const MarketCarDetails = () => {
    const { id } = useParams();
    const [pro, setPro] = useState('');

    useEffect(() => {
        const product = Products?.car?.find((p) => p.id === id);
        setPro(product);
    }, [])
    return (
        <>
            <div className='row'>
                <div className='col-md-9'>
                    <div className='mt-5 market_side_img'>
                        <img src={pro?.image} />
                        <div className='back_icon'>
                            <a href="/market-place" rel="noopener noreferrer">
                                <IoChevronBackSharp  style={{color:"#363062" , marginTop:"1px"}}/>
                            </a>
                        </div>

                        <div className="center_mainimg">
                            <img src={pro?.image} alt="" />
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='prodetails_sidebar'>
                        <div className='mt-3'>
                            <h2>{pro?.title}</h2>
                            <p>₹ 6,50,000/-</p>
                            <p className="categories__content--subtitle">{pro.desc}</p>
                            <p>Listed 6 days ago in Surat, GJ</p>
                        </div>
                        <hr />
                        <div>
                            <iframe width="100%" height="120" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                            <h4>Surat, GJ</h4>
                            <p>Location is approximate</p>
                        </div>
                        <hr />
                        <h4>Seller Information</h4>
                        <div className='d-flex gap-2 mt-2'>
                            <IoIosContact style={{ fontSize: "30px" }} />
                            <p>Nitesh Dobariya</p>
                        </div>
                        <p>Joined autoholic in the year 2023</p>
                        <hr />
                        <div className='d-flex gap-2'>
                            <AiFillMessage style={{ fontSize: "28px" }} />
                            <p>Send a message to the seller</p>
                        </div>
                        <div className='mt-3 send_meg'>
                            <input type="text" style={{ width: "100%", borderRadius: "5px" }} placeholder='Hi , Is this available ?' disabled />
                            <button className='mt-3'>Send Whatsapp</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketCarDetails