import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Products from '../Products.json';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { FaBell } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import { AiFillMessage } from 'react-icons/ai'; 



const MarketAutoDetails = () => {
    const { id } = useParams();
    const [pro, setPro] = useState('');

    useEffect(() => {
        const product = Products?.autopart?.find((p) => p.id === id);
        setPro(product);
    }, [])


    return (
        <div>
            <div className='row'>
                <div className='col-md-9'>
                    <div className='mt-5 market_side_img'>
                        <img src={pro?.image} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='prodetails_sidebar'>
                        <div className="d-flex justify-content-end align-items-center sidebar_icon">
                            <AiFillMessage style={{ fontSize: "28px", marginLeft: "10px" }} />
                            <IoSettingsSharp style={{ fontSize: "28px", marginLeft: "10px" }} />
                            <CgMenuGridO style={{ fontSize: "28px", marginLeft: "10px" }} />
                            <FaBell style={{ fontSize: "28px", marginLeft: "10px" }} />
                            <IoIosContact style={{ fontSize: "30px", marginLeft: "10px" }} />
                        </div>
                        <hr />
                        <div>
                            <h2>{pro?.title}</h2>
                            <p>₹ 6,50,000/-</p>
                            <p className="categories__content--subtitle">{pro.desc}</p>
                            <p>Listed 6 days ago in Surat, GJ</p>
                        </div>
                        <hr />
                        <div>
                            <img src="https://external.famd1-1.fna.fbcdn.net/static_map.php?region=IN&v=2049&theme=default&ccb=4-4&size=328x120&language=gu_IN&scale=1&zoom=11&center=21.167907714844%2C72.833862304688&circle=weight%3A2%7Ccolor%3A0x4D6AA47f%7Cfillcolor%3A0x4D6AA41c%7C21.167907714844%2C72.833862304688%7C2k&_nc_client_id=marketplace_post_permalink&_nc_client_caller=MarketplaceStaticMap.react" style={{ borderRadius: "10px", width: "100%" }} alt="" srcset="" />
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
                            <button className='mt-3'>Send Message</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MarketAutoDetails