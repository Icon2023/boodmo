import React from 'react'
import HomeSilder from '../Subpages/HomeSilder'
import ShopCategory from '../Subpages/ShopCategory'
import PopularProducts from '../Subpages/PopularProducts'
import Banner from '../Subpages/Banner'

const Home = () => {
    return (
        <>
            {/* Start slider section */}
            <HomeSilder />

            {/* Start categories section */}
            <ShopCategory />

            {/* Start product section */}
            <PopularProducts />

            {/* Start banner section */}
            <Banner />
        </>
    )
}

export default Home