import React, { useEffect } from 'react'
import coming from '../images/comingsoon-removebg-preview.png'

const CarExchange = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <img src={coming} alt="" srcset="" style={{ width: "50%", borderRadius: "10px" }} />
            </div>
        </>
    )
}

export default CarExchange